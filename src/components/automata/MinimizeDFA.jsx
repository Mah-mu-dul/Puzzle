import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import DrawDFA from "./DrawDFA";
import bgColors from "./bgColors.json";

function MinimizeDFA() {
  const [numStates, setNumStates] = useState("6");
  const [inputSymbols, setInputSymbols] = useState("0,1");
  const [transitionMatrix, setTransitionMatrix] = useState([
    ["q3", "q1"], // q0's transitions
    ["q2", "q0"], // q1's transitions
    ["q1", "q2"], // q2's transitions
    ["q0", "q4"], // q3's transitions
    ["q1", "q2"], // q4's transitions
    ["q2", "q4"], // q5's transitions
  ]);
  const [showMatrix, setShowMatrix] = useState(true);
  const [acceptingStates, setAcceptingStates] = useState(
    new Set(["q1", "q2", "q4"])
  );
  const [initialState, setInitialState] = useState("q0");
  const [minimizedDFA, setMinimizedDFA] = useState(null);
  const [error, setError] = useState("");

  // New state variables for step-by-step visualization
  const [currentStep, setCurrentStep] = useState(0);
  const [phases, setPhases] = useState([]);

  // Add this to your state variables at the top
  const [invalidTransitions, setInvalidTransitions] = useState([]);

  // Add new state for custom state names
  const [stateNames, setStateNames] = useState(
    Array.from({ length: 6 }, (_, i) => `q${i}`)
  );

  // Update the getCategoryColor function
  const getCategoryColor = (category) => {
    return bgColors[category] || "bg-slate-150";
  };

  const handleInitialSetup = (e) => {
    e.preventDefault();
    const states = parseInt(numStates);
    const symbols = inputSymbols.split(",").map((s) => s.trim());

    // Validate inputs
    if (states < 1) {
      setError("Number of states must be at least 1");
      return;
    }
    if (symbols.length === 0) {
      setError("At least one input symbol is required");
      return;
    }
    if (symbols.some((s) => !s)) {
      setError("Empty input symbols are not allowed");
      return;
    }
    if (new Set(symbols).size !== symbols.length) {
      setError("Duplicate input symbols are not allowed");
      return;
    }

    // Initialize with custom state names
    const names = Array.from({ length: states }, (_, i) => `q${i}`);
    const matrix = Array(states)
      .fill()
      .map(() => Array(symbols.length).fill(""));

    setStateNames(names);
    setTransitionMatrix(matrix);
    setShowMatrix(true);
    setError("");
    setInitialState(names[0]); // Set first state as initial state
    setAcceptingStates(new Set()); // Reset accepting states
  };

  // Add this new helper function to validate state names
  const isValidStateName = (name, validStates) => {
    return validStates.includes(name);
  };

  // Modify handleMatrixInput to validate transitions
  const handleMatrixInput = (stateIndex, symbolIndex, value) => {
    const newMatrix = [...transitionMatrix];
    newMatrix[stateIndex][symbolIndex] = value;

    // Validate the transition immediately
    const isValid = value === "" || isValidStateName(value, stateNames);

    // Update invalid transitions
    const newInvalidTransitions = invalidTransitions.filter(
      (t) => t.stateIndex !== stateIndex || t.symbolIndex !== symbolIndex
    );

    if (!isValid) {
      newInvalidTransitions.push({ stateIndex, symbolIndex });
    }

    setInvalidTransitions(newInvalidTransitions);
    setTransitionMatrix(newMatrix);
  };

  // Add this helper function to check if all required fields are filled
  const hasEmptyFields = () => {
    // Check transition matrix
    const hasEmptyTransitions = transitionMatrix.some((row) =>
      row.some((cell) => !cell.trim())
    );

    // Check initial state
    const hasEmptyInitialState = !initialState.trim();

    // Check if there are any accepting states
    const hasNoAcceptingStates = acceptingStates.size === 0;

    return hasEmptyTransitions || hasEmptyInitialState || hasNoAcceptingStates;
  };

  const removeUnreachableStates = (transitions, initial, states) => {
    const reachable = new Set([initial]);
    let changed = true;

    while (changed) {
      changed = false;
      const currentSize = reachable.size;

      [...reachable].forEach((state) => {
        Object.values(transitions[state] || {}).forEach((nextState) => {
          if (nextState && !reachable.has(nextState)) {
            reachable.add(nextState);
          }
        });
      });

      changed = currentSize !== reachable.size;
    }

    return {
      reachableStates: reachable,
      unreachableStates: new Set([...states].filter((s) => !reachable.has(s))),
    };
  };

  const getStateLabel = (state, transitions, symbols) => {
    return symbols
      .map((symbol) => {
        const nextState = transitions[state]?.[symbol];
        return nextState || "-";
      })
      .join("");
  };

  const refinePartitions = (partitions, transitions, symbols) => {
    let changed = true;
    let currentPartitions = partitions;
    const phases = [currentPartitions];

    while (changed) {
      changed = false;
      const stateLabels = new Map();

      // Label each state based on transitions and their target partitions
      for (const partition of currentPartitions) {
        for (const state of partition) {
          const transitionPattern = symbols
            .map((symbol) => {
              const nextState = transitions[state]?.[symbol];
              // Find which partition contains the next state
              const targetPartitionIndex = currentPartitions.findIndex((p) =>
                p.has(nextState)
              );
              return `P${targetPartitionIndex}`;
            })
            .join(",");

          // Include accepting/non-accepting status in the key to maintain distinction
          const isAccepting = acceptingStates.has(state);
          const key = `${isAccepting}-${transitionPattern}`;

          if (!stateLabels.has(key)) {
            stateLabels.set(key, new Set());
          }
          stateLabels.get(key).add(state);
        }
      }

      const newPartitions = [...stateLabels.values()];

      // Check if partitions have actually changed
      if (!arePartitionsEqual(currentPartitions, newPartitions)) {
        changed = true;
        currentPartitions = newPartitions;
        phases.push(newPartitions);
      }
    }

    return { finalPartitions: currentPartitions, phases };
  };

  // Add this helper function to compare partitions
  const arePartitionsEqual = (partitions1, partitions2) => {
    if (partitions1.length !== partitions2.length) return false;

    const normalize = (partitions) =>
      partitions
        .map((partition) => JSON.stringify([...partition].sort()))
        .sort();

    const normalized1 = normalize(partitions1);
    const normalized2 = normalize(partitions2);

    return normalized1.every((p, i) => p === normalized2[i]);
  };

  const sortStates = (states) => {
    return [...states].sort((a, b) => {
      const aNum = parseInt(a.substring(1));
      const bNum = parseInt(b.substring(1));
      return aNum - bNum;
    });
  };

  const validateDFA = (
    transitions,
    states,
    symbols,
    initialState,
    acceptingStates
  ) => {
    const errors = [];

    // Check initial state
    if (!initialState.trim()) {
      errors.push("Initial state must be specified");
    } else if (!states.includes(initialState)) {
      errors.push(`Initial state "${initialState}" is not a valid state`);
    }

    // Check accepting states
    if (acceptingStates.size === 0) {
      errors.push("At least one accepting state must be specified");
    }
    for (const state of acceptingStates) {
      if (!states.includes(state)) {
        errors.push(`Accepting state "${state}" is not a valid state`);
      }
    }

    // Check transitions
    for (const state of states) {
      for (const symbol of symbols) {
        const nextState = transitions[state]?.[symbol];
        if (!nextState) {
          errors.push(
            `Missing transition for state "${state}" with input "${symbol}"`
          );
        } else if (!states.includes(nextState)) {
          errors.push(
            `Invalid transition: "${state}" with "${symbol}" goes to invalid state "${nextState}"`
          );
        }
      }
    }

    return errors;
  };

  const minimizeDFA = () => {
    try {
      const symbols = inputSymbols.split(",").map((s) => s.trim());
      const states = stateNames;

      // Input validation
      if (symbols.length === 0) {
        throw new Error("At least one input symbol is required");
      }
      if (symbols.some((s) => !s)) {
        throw new Error("Empty input symbols are not allowed");
      }
      if (new Set(symbols).size !== symbols.length) {
        throw new Error("Duplicate input symbols are not allowed");
      }
      if (parseInt(numStates) < 1) {
        throw new Error("Number of states must be at least 1");
      }

      // Convert matrix to transitions object using stateNames
      const transitions = {};
      transitionMatrix.forEach((row, stateIdx) => {
        transitions[stateNames[stateIdx]] = {};
        row.forEach((nextState, symbolIdx) => {
          transitions[stateNames[stateIdx]][symbols[symbolIdx]] = nextState;
        });
      });

      // Reset invalid transitions before validation
      setInvalidTransitions([]);

      // Validate DFA
      const validationErrors = validateDFA(
        transitions,
        states,
        symbols,
        initialState,
        acceptingStates
      );

      if (validationErrors.length > 0) {
        // Find invalid transitions from the error messages
        const invalidOnes = validationErrors
          .filter((err) => err.startsWith("Invalid transition:"))
          .map((err) => {
            const matches = err.match(/\"([^\"]+)\" with \"([^\"]+)\"/);
            if (matches) {
              const [_, state, symbol] = matches;
              return {
                stateIndex: parseInt(state.substring(1)),
                symbolIndex: symbols.indexOf(symbol),
              };
            }
            return null;
          })
          .filter(Boolean);

        setInvalidTransitions(invalidOnes);
        throw new Error(validationErrors.join("\n"));
      }

      // Step 1: Remove unreachable states
      const { reachableStates, unreachableStates } = removeUnreachableStates(
        transitions,
        initialState,
        new Set(states)
      );

      // Step 2: Initial partitioning (accepting vs non-accepting)
      const accepting = new Set(
        [...reachableStates].filter((s) => acceptingStates.has(s))
      );
      const nonAccepting = new Set(
        [...reachableStates].filter((s) => !acceptingStates.has(s))
      );
      let initialPartitions = [accepting, nonAccepting].filter(
        (p) => p.size > 0
      );

      // Step 3: Refine partitions
      const { finalPartitions, phases } = refinePartitions(
        initialPartitions,
        transitions,
        symbols
      );

      // Step 4: Construct minimized DFA
      const minimized = {
        states: finalPartitions.map((partition) => sortStates([...partition])),
        transitions: {},
        initial: "",
        accepting: new Set(),
        stateComposition: finalPartitions.map((partition) => ({
          state: `{${sortStates([...partition]).join(", ")}}`,
          members: sortStates([...partition]),
        })),
      };

      // Set transitions for each partition
      finalPartitions.forEach((partition) => {
        const partitionState = `{${sortStates([...partition]).join(", ")}}`;
        minimized.transitions[partitionState] = {};

        // Use any state from the partition to determine transitions
        const representativeState = [...partition][0];

        symbols.forEach((symbol) => {
          const nextState = transitions[representativeState][symbol];
          // Find which partition contains the next state
          const targetPartition = finalPartitions.find((p) => p.has(nextState));
          minimized.transitions[partitionState][symbol] = `{${sortStates([
            ...targetPartition,
          ]).join(", ")}}`;
        });

        // Set initial state
        if (partition.has(initialState)) {
          minimized.initial = partitionState;
        }

        // Set accepting states
        if ([...partition].some((s) => acceptingStates.has(s))) {
          minimized.accepting.add(partitionState);
        }
      });

      // Sort state composition by the first state in each set
      minimized.stateComposition.sort((a, b) => {
        const aFirst = parseInt(a.members[0].substring(1));
        const bFirst = parseInt(b.members[0].substring(1));
        return aFirst - bFirst;
      });

      setMinimizedDFA(minimized);
      setPhases(phases);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // First, add a handler for checkbox changes
  const handleFinalStateChange = (stateIndex, checked) => {
    const stateName = stateNames[stateIndex];
    const newAcceptingStates = new Set(acceptingStates);

    if (checked) {
      newAcceptingStates.add(stateName);
    } else {
      newAcceptingStates.delete(stateName);
    }

    setAcceptingStates(newAcceptingStates);
  };

  // Add handler for state name changes
  const handleStateNameChange = (index, newName) => {
    const oldName = stateNames[index];
    const newStateNames = [...stateNames];
    newStateNames[index] = newName;

    // Update transitions that reference this state
    const newMatrix = transitionMatrix.map((row) =>
      row.map((cell) => (cell === oldName ? newName : cell))
    );

    // Update accepting states
    const newAccepting = new Set([...acceptingStates]);
    if (newAccepting.has(oldName)) {
      newAccepting.delete(oldName);
      newAccepting.add(newName);
    }

    // Update initial state
    if (initialState === oldName) {
      setInitialState(newName);
    }

    setStateNames(newStateNames);
    setTransitionMatrix(newMatrix);
    setAcceptingStates(newAccepting);
  };

  // Add handler for adding new row
  const handleAddRow = () => {
    const newIndex = stateNames.length;
    const newName = `q${newIndex}`; // Using 's' prefix instead of 'q'
    setStateNames([...stateNames, newName]);
    setTransitionMatrix([
      ...transitionMatrix,
      Array(inputSymbols.split(",").length).fill(""),
    ]);
    setNumStates((prev) => (parseInt(prev) + 1).toString());
  };

  // Add handler for deleting row
  const handleDeleteRow = (index) => {
    const newStateNames = stateNames.filter((_, i) => i !== index);
    const newMatrix = transitionMatrix.filter((_, i) => i !== index);

    // Update state names and transitions
    setStateNames(newStateNames);
    setTransitionMatrix(newMatrix);
    setNumStates((prev) => (parseInt(prev) - 1).toString());

    // Update accepting states
    const newAccepting = new Set([...acceptingStates]);
    newAccepting.delete(stateNames[index]);
    setAcceptingStates(newAccepting);

    // Update initial state if needed
    if (initialState === stateNames[index]) {
      setInitialState(newStateNames[0] || "");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-2 sm:p-1">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          DFA Minimization Tool
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Enter your DFA details to get the minimized version
        </p>
        {/* <div className="overflow-auto">
          <DrawDFA />
        </div> */}
        {/* Initial Setup Form */}
        <div className="bg-blue-50 rounded-xl p-3 sm:p-6 mb-4 sm:mb-8">
          <form onSubmit={handleInitialSetup} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text text-blue-600 font-semibold">
                  Number of States
                </span>
              </label>
              <input
                type="number"
                value={numStates}
                onChange={(e) => setNumStates(e.target.value)}
                className="input input-bordered w-full bg-white"
                placeholder="Enter number of states"
                min="1"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-blue-600 font-semibold">
                  Input Symbols
                </span>
              </label>
              <input
                type="text"
                value={inputSymbols}
                onChange={(e) => setInputSymbols(e.target.value)}
                className="input input-bordered w-full bg-white"
                placeholder="Enter symbols separated by commas (e.g., 0,1)"
                required
              />
            </div>

            <button
              type="submit"
              className="btn border-0 bg-blue-600 hover:bg-blue-700 text-white w-full"
            >
              Generate Transition Matrix
            </button>
          </form>
        </div>

        {/* Transition Matrix and Minimized DFA */}
        {showMatrix && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-50 rounded-xl p-3 sm:p-6 mb-4 sm:mb-8"
          >
            {/* Initial State Input */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="label">
                  <span className="label-text text-green-600 font-semibold">
                    Initial State
                  </span>
                </label>
                <input
                  type="text"
                  value={initialState}
                  onChange={(e) => setInitialState(e.target.value)}
                  className={`input input-bordered w-full bg-white ${
                    !initialState.trim() ? "border-red-500" : ""
                  }`}
                  placeholder="e.g., q0"
                  required
                />
              </div>
            </div>

            {/* Grid container that adapts based on minimizedDFA existence */}
            <div
              className={`grid gap-4 ${
                minimizedDFA ? "lg:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {/* Transition Matrix - takes full width initially */}
              <div className={minimizedDFA ? "" : "w-full"}>
                <h2 className="text-2xl font-semibold text-green-600 mb-4">
                  Transition Matrix
                </h2>
                <div className="overflow-x-auto -mx-3 sm:mx-0">
                  {/* Add warning message for empty fields */}
                  {hasEmptyFields() && (
                    <div className="alert alert-warning mb-4 flex flex-col justify-center  text-left h-fit">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        <span>Please fill in all required fields</span>
                      </div>
                      <ul className="list-disc list-inside  ">
                        {!initialState.trim() && (
                          <li>Initial state is required</li>
                        )}
                        {acceptingStates.size === 0 && (
                          <li>At least one accepting state is required</li>
                        )}
                        {transitionMatrix.some((row) =>
                          row.some((cell) => !cell.trim())
                        ) && <li>All transitions must be specified</li>}
                      </ul>
                    </div>
                  )}

                  <table className="table table-compact w-full text-center">
                    <thead>
                      <tr className="text-black text-sm ">
                        <th className="px-2 py-1">State</th>
                        {inputSymbols.split(",").map((symbol, index) => (
                          <th key={index} className="px-2 py-1">
                            {symbol.trim()}
                          </th>
                        ))}
                        <th className="px-2 py-1">Final</th>
                        <th className="px-2 py-1"></th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {transitionMatrix.map((row, stateIndex) => (
                        <tr key={stateIndex}>
                          <td className="px-2 py-1">
                            <input
                              type="text"
                              value={stateNames[stateIndex]}
                              onChange={(e) =>
                                handleStateNameChange(
                                  stateIndex,
                                  e.target.value
                                )
                              }
                              className="input input-bordered input-sm w-16 bg-white"
                            />
                          </td>
                          {row.map((cell, symbolIndex) => (
                            <td key={symbolIndex} className="px-2 py-1">
                              <input
                                type="text"
                                value={cell}
                                onChange={(e) =>
                                  handleMatrixInput(
                                    stateIndex,
                                    symbolIndex,
                                    e.target.value
                                  )
                                }
                                className={`input input-bordered input-sm w-16 bg-white ${
                                  !cell.trim()
                                    ? "border-red-500"
                                    : invalidTransitions.some(
                                        (t) =>
                                          t.stateIndex === stateIndex &&
                                          t.symbolIndex === symbolIndex
                                      )
                                    ? "border-red-500 bg-red-50"
                                    : ""
                                }`}
                                placeholder={`q?`}
                              />
                              {invalidTransitions.some(
                                (t) =>
                                  t.stateIndex === stateIndex &&
                                  t.symbolIndex === symbolIndex
                              ) && (
                                <div className="text-red-500 text-xs">
                                  Invalid
                                </div>
                              )}
                            </td>
                          ))}
                          <td className="px-2 py-1">
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary checkbox-sm"
                              checked={acceptingStates.has(
                                stateNames[stateIndex]
                              )}
                              onChange={(e) =>
                                handleFinalStateChange(
                                  stateIndex,
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-1">
                            <button
                              className="btn btn-error btn-xs"
                              onClick={() => handleDeleteRow(stateIndex)}
                              disabled={stateNames.length <= 1}
                            >
                              <FaTrash className="h-3 w-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-2">
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={handleAddRow}
                    >
                      <FaPlus className="h-3 w-3 mr-1" /> Add State
                    </button>
                  </div>
                </div>

                <div className="mt-4 text-sm">
                  <div className="text-red-500">
                    * Fields highlighted in red are either empty or contain
                    invalid state names
                  </div>
                  <div className="text-gray-600 mt-1">
                    Valid state names: {stateNames.join(", ")}
                  </div>
                </div>

                <button
                  className="btn border-0 bg-green-600 hover:bg-green-700 text-white mt-6 w-full"
                  onClick={minimizeDFA}
                >
                  Minimize DFA
                </button>

                {error && (
                  <div className="alert alert-error mt-4">
                    <div className="flex flex-col">
                      <span className="font-semibold">Errors:</span>
                      {error.split("\n").map((err, index) => (
                        <span key={index}>• {err}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Minimized DFA - appears in second column when available */}
              {minimizedDFA &&
                minimizedDFA.states &&
                minimizedDFA.stateComposition && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-lg p-4"
                  >
                    <h3 className="text-xl font-semibold text-green-600 mb-4">
                      Minimized DFA
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="table table-compact w-full">
                        <thead>
                          <tr className="text-black text-sm">
                            <th className="px-2 py-1">State</th>
                            {inputSymbols.split(",").map((symbol, index) => (
                              <th key={index} className="px-2 py-1">
                                {symbol.trim()}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {minimizedDFA.stateComposition.map(({ state }) => (
                            <tr key={state}>
                              <td className="px-2 py-1">
                                <div className="text-left">
                                  <div>{state}</div>
                                  <div className="text-xs text-gray-500">
                                    {state === minimizedDFA.initial &&
                                      "(initial)"}
                                    {minimizedDFA.accepting.has(state) &&
                                      "(accepting)"}
                                  </div>
                                </div>
                              </td>
                              {inputSymbols.split(",").map((symbol, index) => (
                                <td key={index} className="px-2 py-1">
                                  {minimizedDFA.transitions[state]?.[
                                    symbol.trim()
                                  ] || "-"}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
            </div>
          </motion.div>
        )}

        {/* Phase Visualization */}
        {phases.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 sm:mt-8 bg-amber-50 rounded-xl p-3 sm:p-6"
          >
            <h3 className="text-xl font-semibold text-amber-600 mb-4">
              Minimization Phases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[...phases, phases[phases.length - 1]].map((phase, phaseIdx) => (
                <div
                  key={phaseIdx}
                  className={`bg-white rounded-lg p-3 shadow-sm ${
                    phaseIdx === phases.length
                      ? "border-2 border-green-500"
                      : ""
                  }`}
                >
                  <h4 className="font-medium text-amber-700 mb-2">
                    Phase {phaseIdx === phases.length ? "Final" : phaseIdx + 1}
                  </h4>
                  {/* Current Partitions */}
                  <div className="flex flex-wrap gap-1 mb-3 text-xs">
                    {[...phase].map((partition, partIdx) => (
                      <div key={partIdx} className="badge badge-primary p-1">
                        {`${String.fromCharCode(65 + partIdx)}: {${sortStates([
                          ...partition,
                        ]).join(",")}}`}
                      </div>
                    ))}
                  </div>

                  {/* Transition Table */}
                  <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                      <thead>
                        <tr className="text-black text-xs">
                          <th className="px-2 py-1">Transitions</th>
                          <th className="px-2 py-1 w-12">Category</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs">
                        {stateNames.map((state) => {
                          const partitionIndex = [...phase].findIndex(
                            (partition) => partition.has(state)
                          );

                          if (partitionIndex === -1) return null; // Skip unreachable states

                          // Create transitions as separate lines
                          const transitions = inputSymbols
                            .split(",")
                            .map((symbol, symIdx) => {
                              const stateRow =
                                transitionMatrix[stateNames.indexOf(state)];
                              if (!stateRow)
                                return { text: `${symbol} → -`, category: "-" };

                              const nextState = stateRow[symIdx];
                              if (!nextState)
                                return { text: `${symbol} → -`, category: "-" };

                              const nextPartitionIndex = [...phase].findIndex(
                                (partition) => partition.has(nextState)
                              );
                              const nextCategory =
                                nextPartitionIndex >= 0
                                  ? String.fromCharCode(65 + nextPartitionIndex)
                                  : "-";

                              return {
                                text: `${symbol} → ${nextState}`,
                                category: nextCategory,
                              };
                            });

                          // Create category string
                          const category = transitions
                            .map((t) => t.category)
                            .join("");
                          const bgColor = getCategoryColor(category);

                          return (
                            <tr key={state} className={`border-b ${bgColor}`}>
                              <td className="px-2 py-1">
                                <div className="flex gap-2">
                                  <span className="font-medium min-w-[2rem]">
                                    {state}
                                  </span>
                                  <div className="flex flex-col">
                                    {transitions.map((transition, idx) => (
                                      <span
                                        key={idx}
                                        className="whitespace-nowrap"
                                      >
                                        {transition.text}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </td>
                              <td className="px-2 py-1 text-center font-medium">
                                {category}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {/* Add after the title and description, before the steps progress */}
        <div className="bg-white rounded-xl p-3 sm:p-6 mb-4 sm:mb-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                DFA Minimization Algorithm
              </h2>
              <p className="text-gray-600">
                The DFA minimization algorithm reduces a DFA to its smallest
                equivalent form by combining states that are indistinguishable
                from each other. Two states are considered equivalent if they
                have the same behavior for all possible input strings.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">
                  Phase 1: Preparation
                </h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      Remove unreachable states that cannot be accessed from the
                      initial state
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      Create initial partition P = {`{(F, Q - F)}`} where F is
                      the set of accepting states
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3">
                  Phase 2: Refinement
                </h3>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      For each partition, group states that transition to the
                      same partition for each input
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      Continue refining until no new partitions are created
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-3">
                  Phase 3: Construction
                </h3>
                <ul className="space-y-2 text-purple-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>Create new states from final partitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      Define transitions between new states based on original
                      transitions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      Mark accepting and initial states in the minimized DFA
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-amber-800 mb-3">
                  Complexity & Properties
                </h3>
                <ul className="space-y-2 text-amber-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      Time Complexity: O(kn²) where k is alphabet size, n is
                      number of states
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      Result is unique and minimal (fewest possible states)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      Preserves the language recognized by the original DFA
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">
                Example Walkthrough
              </h3>
              <ol className="space-y-2 text-gray-600 list-decimal list-inside">
                <li>
                  Start with initial partition {"{accepting, non-accepting}"}
                </li>
                <li>Group states based on transition destinations</li>
                <li>
                  Create new partitions for states with different behaviors
                </li>
                <li>Repeat until no new refinements are possible</li>
                <li>Construct minimized DFA using final partitions</li>
              </ol>
            </div>
          </div>
        </div>
        {/* Open Source Contribution Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-3 sm:p-6 mb-4 sm:mb-8 shadow-sm">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Open Source Contribution
            </h2>
            <p className="text-gray-700">
              This easypuzzle project is open source! <br /> Want to contribute
              or report issues?
            </p>
            <div className="text-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="font-medium text-gray-700"> Contact:</span>
              <br />
              <a
                href="mailto:work.mahmudulhasan@gmail.com"
                className="text-blue-600 hover:text-blue-700 transition-colors `"
              >
                work.mahmudulhasan@gmail.com
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MinimizeDFA;
