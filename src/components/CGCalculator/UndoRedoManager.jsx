import React, { useEffect, useCallback, useRef } from "react";
import { Undo2, Redo2 } from "lucide-react";
import { toast } from "react-hot-toast";

const UndoRedoManager = ({
  normalCourses,
  retakeCourses,
  previousCGPA,
  previousEarnedCredit,
  name,
  onStateChange,
}) => {
  const MAX_HISTORY = 50;
  const debounceTimer = useRef(null);
  const lastSavedState = useRef(null);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("calculatorHistory");
    if (savedHistory) {
      const { past, present, future } = JSON.parse(savedHistory);
      if (present) {
        onStateChange(present);
        lastSavedState.current = present;
      }
    }
  }, []);

  // Helper function to check if states are different
  const areStatesDifferent = (state1, state2) => {
    if (!state1 || !state2) return true;

    // Compare arrays using JSON stringify
    const compareArrays = (arr1, arr2) =>
      JSON.stringify(arr1) !== JSON.stringify(arr2);

    return (
      state1.name !== state2.name ||
      state1.previousCGPA !== state2.previousCGPA ||
      state1.previousEarnedCredit !== state2.previousEarnedCredit ||
      compareArrays(state1.normalCourses, state2.normalCourses) ||
      compareArrays(state1.retakeCourses, state2.retakeCourses)
    );
  };

  // Save current state to history with debouncing
  const saveToHistory = useCallback((newState) => {
    // Clear any existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set a new timer
    debounceTimer.current = setTimeout(() => {
      // Only save if the state has actually changed
      if (areStatesDifferent(newState, lastSavedState.current)) {
        const savedHistory = localStorage.getItem("calculatorHistory");
        let {
          past = [],
          present = null,
          future = [],
        } = savedHistory ? JSON.parse(savedHistory) : {};

        // If there's a present state and it's different from the new state, add it to past
        if (present && areStatesDifferent(present, newState)) {
          past = [...past, present].slice(-MAX_HISTORY);
        }

        // Update present and clear future
        present = newState;
        future = [];

        // Save to localStorage
        localStorage.setItem(
          "calculatorHistory",
          JSON.stringify({ past, present, future })
        );

        lastSavedState.current = newState;
      }
    }, 500); // 500ms debounce delay
  }, []);

  // Handle undo
  const handleUndo = useCallback(() => {
    const savedHistory = localStorage.getItem("calculatorHistory");
    if (!savedHistory) return;

    const { past, present, future } = JSON.parse(savedHistory);
    if (past.length === 0) {
      toast.error("Nothing to undo", {
        duration: 2000,
        position: "top-right",
        style: {
          cursor: "pointer",
        },
        onClick: () => toast.dismiss(),
      });
      return;
    }

    const previous = past[past.length - 1];
    const newPast = past.slice(0, -1);
    const newFuture = [present, ...future];

    localStorage.setItem(
      "calculatorHistory",
      JSON.stringify({
        past: newPast,
        present: previous,
        future: newFuture,
      })
    );

    lastSavedState.current = previous;
    onStateChange(previous);
    toast.success("Undo successful", {
      duration: 2000,
      position: "top-right",
      style: {
        cursor: "pointer",
      },
      onClick: () => toast.dismiss(),
    });
  }, [onStateChange]);

  // Handle redo
  const handleRedo = useCallback(() => {
    const savedHistory = localStorage.getItem("calculatorHistory");
    if (!savedHistory) return;

    const { past, present, future } = JSON.parse(savedHistory);
    if (future.length === 0) {
      toast.error("Nothing to redo", {
        duration: 2000,
        position: "top-right",
        style: {
          cursor: "pointer",
        },
        onClick: () => toast.dismiss(),
      });
      return;
    }

    const next = future[0];
    const newFuture = future.slice(1);
    const newPast = [...past, present];

    localStorage.setItem(
      "calculatorHistory",
      JSON.stringify({
        past: newPast,
        present: next,
        future: newFuture,
      })
    );

    lastSavedState.current = next;
    onStateChange(next);
    toast.success("Redo successful", {
      duration: 2000,
      position: "top-right",
      style: {
        cursor: "pointer",
      },
      onClick: () => toast.dismiss(),
    });
  }, [onStateChange]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if (
        (e.ctrlKey && e.key === "y") ||
        (e.ctrlKey && e.shiftKey && e.key === "Z")
      ) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Save state changes to history
  useEffect(() => {
    const currentState = {
      normalCourses,
      retakeCourses,
      previousCGPA,
      previousEarnedCredit,
      name,
    };

    saveToHistory(currentState);

    // Cleanup function
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [
    normalCourses,
    retakeCourses,
    previousCGPA,
    previousEarnedCredit,
    name,
    saveToHistory,
  ]);

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={handleUndo}
        className="p-2  rounded-full hover:bg-gray-100 transition-colors duration-200 flex gap-2 items-center border "
        title="Undo (Ctrl + Z)"
      >
        <Undo2 className="w-5 h-5 text-gray-600" /> Undo
      </button>
      <button
        onClick={handleRedo}
        className="p-2  rounded-full hover:bg-gray-100 transition-colors duration-200 flex gap-2 items-center border "
        title="Redo (Ctrl + Y or Ctrl + Shift + Z)"
      >
        <Redo2 className="w-5 h-5 text-gray-600" />
        Redo
      </button>
    </div>
  );
};

export default UndoRedoManager;
