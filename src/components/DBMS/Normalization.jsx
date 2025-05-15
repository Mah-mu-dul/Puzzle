import React, { useState } from "react";

function Normalization() {
  const [input, setInput] = useState("");
  const [allAttributes, setAllAttributes] = useState([]);
  const [keys, setKeys] = useState({
    candidateKeys: [],
    primaryKey: [],
    superKeys: [],
  });
  const [result, setResult] = useState({
    firstNF: [],
    secondNF: [],
    thirdNF: [],
    BCNF: [],
    decomposition: [],
  });
  const [explanation, setExplanation] = useState({
    firstNF: "",
    secondNF: "",
    thirdNF: "",
    BCNF: "",
  });

  // Helper function to parse input text into functional dependencies
  const parseInput = (text) => {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && line.includes("→"))
      .map((line) => {
        // Check for composite key notation like "BE, BF → (Composite Key)"
        if (line.includes("(Composite Key)")) {
          return {
            lhs: line
              .split("→")[0]
              .trim()
              .split(",")
              .map((attr) => attr.trim()),
            rhs: ["Composite Key"],
            isCompositeKey: true,
          };
        }

        const [lhs, rhs] = line.split("→").map((side) => side.trim());
        const rhsAttrs = rhs.split(",").map((attr) => attr.trim());
        return {
          lhs: lhs.split(",").map((attr) => attr.trim()),
          rhs: rhsAttrs,
        };
      });
  };

  // Find attribute closure given a set of attributes and functional dependencies
  const findClosure = (attrs, fds) => {
    let closure = new Set(attrs);
    let changed = true;

    while (changed) {
      changed = false;
      for (const fd of fds) {
        if (fd.lhs.every((attr) => closure.has(attr))) {
          for (const rhsAttr of fd.rhs) {
            if (!closure.has(rhsAttr) && rhsAttr !== "Composite Key") {
              closure.add(rhsAttr);
              changed = true;
            }
          }
        }
      }
    }
    return Array.from(closure);
  };

  // Collect all attributes from functional dependencies
  const findAllAttributes = (fds) => {
    const attributes = new Set();
    fds.forEach((fd) => {
      fd.lhs.forEach((attr) => attributes.add(attr));
      fd.rhs.forEach((attr) => {
        if (attr !== "Composite Key") {
          attributes.add(attr);
        }
      });
    });
    return Array.from(attributes).sort();
  };

  // Check if a set is a subset of another set
  const isSubset = (subset, superset) => {
    return subset.every((item) => superset.includes(item));
  };

  // Find minimal cover of functional dependencies
  const findMinimalCover = (fds) => {
    // Step 1: Split right-hand sides
    let minimalFDs = [];
    fds.forEach((fd) => {
      if (fd.isCompositeKey) {
        minimalFDs.push(fd);
      } else {
        fd.rhs.forEach((attr) => {
          minimalFDs.push({
            lhs: [...fd.lhs],
            rhs: [attr],
          });
        });
      }
    });

    // Step 2: Remove redundant attributes from left-hand sides
    let simplifiedFDs = [...minimalFDs];
    for (let i = 0; i < simplifiedFDs.length; i++) {
      const fd = simplifiedFDs[i];
      if (fd.lhs.length > 1 && !fd.isCompositeKey) {
        for (let j = 0; j < fd.lhs.length; j++) {
          const attrToRemove = fd.lhs[j];
          const newLhs = fd.lhs.filter((_, index) => index !== j);

          // Check if newLhs → fd.rhs still holds
          const newLhsClosure = findClosure(newLhs, simplifiedFDs);
          if (newLhsClosure.includes(fd.rhs[0])) {
            // We can simplify by removing this attribute
            fd.lhs = newLhs;
            j--; // Recheck this position
          }
        }
      }
    }

    // Step 3: Remove redundant FDs
    const nonRedundantFDs = [];
    for (let i = 0; i < simplifiedFDs.length; i++) {
      const fdToCheck = simplifiedFDs[i];
      const restFDs = simplifiedFDs.filter((_, index) => index !== i);

      // Check if fdToCheck is redundant
      const lhsClosure = findClosure(fdToCheck.lhs, restFDs);
      if (!lhsClosure.includes(fdToCheck.rhs[0]) || fdToCheck.isCompositeKey) {
        nonRedundantFDs.push(fdToCheck);
      }
    }

    return nonRedundantFDs;
  };

  // Find candidate keys
  const findCandidateKeys = (fds, allAttrs) => {
    // Find attributes that don't appear on the right side of any FD
    const rightSideAttrs = new Set();
    fds.forEach((fd) => {
      if (!fd.isCompositeKey) {
        fd.rhs.forEach((attr) => rightSideAttrs.add(attr));
      }
    });

    const leftOnly = allAttrs.filter((attr) => !rightSideAttrs.has(attr));

    // Start with attributes that don't appear on right side
    let candidateKeys = [];

    // Collect composite keys from input
    const compositeKeys = fds
      .filter((fd) => fd.isCompositeKey)
      .map((fd) => fd.lhs);
    if (compositeKeys.length > 0) {
      // Add all explicit composite keys
      candidateKeys = [...compositeKeys];
    } else if (leftOnly.length > 0) {
      // Check if leftOnly is a superkey
      const closure = findClosure(leftOnly, fds);
      if (closure.length === allAttrs.length) {
        // It's a candidate key
        candidateKeys.push(leftOnly);
      } else {
        // We need to find what attributes to add to make it a superkey
        const remainingAttrs = allAttrs.filter(
          (attr) => !leftOnly.includes(attr)
        );

        // Try adding one attribute at a time (simplified)
        for (const attr of remainingAttrs) {
          const testKey = [...leftOnly, attr];
          const closure = findClosure(testKey, fds);
          if (closure.length === allAttrs.length) {
            candidateKeys.push(testKey);
          }
        }
      }
    } else {
      // No left-only attributes, we need to try all possible attribute combinations
      // This is a simplified approach
      for (const attr of allAttrs) {
        const closure = findClosure([attr], fds);
        if (closure.length === allAttrs.length) {
          candidateKeys.push([attr]);
        }
      }

      if (candidateKeys.length === 0) {
        // Try pairs of attributes if no single attribute works
        for (let i = 0; i < allAttrs.length; i++) {
          for (let j = i + 1; j < allAttrs.length; j++) {
            const testKey = [allAttrs[i], allAttrs[j]];
            const closure = findClosure(testKey, fds);
            if (closure.length === allAttrs.length) {
              candidateKeys.push(testKey);
            }
          }
        }
      }
    }

    // If we still haven't found any candidate keys, try with the entire set
    if (candidateKeys.length === 0) {
      candidateKeys.push(allAttrs);
    }

    return candidateKeys;
  };

  // Find super keys
  const findSuperKeys = (candidateKeys, allAttrs) => {
    const superKeys = [];

    // Add all candidate keys as super keys
    candidateKeys.forEach((key) => {
      superKeys.push([...key]);
    });

    // Generate supersets of each candidate key
    candidateKeys.forEach((key) => {
      const nonKeyAttrs = allAttrs.filter((attr) => !key.includes(attr));

      // Generate all possible combinations (simplified approach)
      // Add one more attribute
      nonKeyAttrs.forEach((attr) => {
        superKeys.push([...key, attr]);
      });

      // Add two more attributes (if needed)
      if (nonKeyAttrs.length >= 2) {
        for (let i = 0; i < nonKeyAttrs.length; i++) {
          for (let j = i + 1; j < nonKeyAttrs.length; j++) {
            superKeys.push([...key, nonKeyAttrs[i], nonKeyAttrs[j]]);
          }
        }
      }
    });

    return superKeys;
  };

  // Find prime attributes (attributes that are part of any candidate key)
  const findPrimeAttributes = (candidateKeys) => {
    const primeAttrs = new Set();
    candidateKeys.forEach((key) => {
      key.forEach((attr) => primeAttrs.add(attr));
    });
    return Array.from(primeAttrs);
  };

  // BCNF decomposition
  const decomposeBCNF = (relation, fds, keys) => {
    // Initial relation with all attributes
    let relations = [{ attributes: relation, fds: fds }];
    let decomposed = [];

    const isInBCNF = (rel, functionalDeps, candidateKeys) => {
      for (const fd of functionalDeps) {
        // Check if this FD violates BCNF
        const isSuperKey = candidateKeys.some((key) => isSubset(key, fd.lhs));

        if (!isSuperKey) {
          return { inBCNF: false, violatingFD: fd };
        }
      }
      return { inBCNF: true };
    };

    while (relations.length > 0) {
      const relation = relations.pop();

      // Find candidate keys for this relation
      const relCandidateKeys = findCandidateKeys(
        relation.fds,
        relation.attributes
      );

      const bcnfCheck = isInBCNF(
        relation.attributes,
        relation.fds,
        relCandidateKeys
      );

      if (bcnfCheck.inBCNF) {
        decomposed.push(relation);
      } else {
        // Need to decompose based on the violating FD: X → Y
        const fd = bcnfCheck.violatingFD;

        // Create R1(X, Y)
        const r1Attrs = [...new Set([...fd.lhs, ...fd.rhs])];
        const r1Fds = relation.fds.filter(
          (f) => r1Attrs.includes(f.rhs[0]) && isSubset(f.lhs, r1Attrs)
        );

        // Create R2(X, Z) where Z = R - Y
        const r2Attrs = [
          ...new Set([
            ...fd.lhs,
            ...relation.attributes.filter((a) => !fd.rhs.includes(a)),
          ]),
        ];
        const r2Fds = relation.fds.filter(
          (f) => r2Attrs.includes(f.rhs[0]) && isSubset(f.lhs, r2Attrs)
        );

        relations.push({ attributes: r1Attrs, fds: r1Fds });
        relations.push({ attributes: r2Attrs, fds: r2Fds });
      }
    }

    return decomposed;
  };

  // Perform normalization analysis
  const normalize = () => {
    const fds = parseInput(input);
    const allAttrs = findAllAttributes(fds);
    setAllAttributes(allAttrs);

    // Minimal cover
    const minimalCover = findMinimalCover(fds);

    // Find candidate keys
    const candidateKeys = findCandidateKeys(fds, allAttrs);

    // Choose primary key (first candidate key)
    const primaryKey = candidateKeys.length > 0 ? candidateKeys[0] : [];

    // Find super keys
    const superKeys = findSuperKeys(candidateKeys, allAttrs);

    // Find prime attributes
    const primeAttrs = findPrimeAttributes(candidateKeys);

    setKeys({
      candidateKeys,
      primaryKey,
      superKeys,
      primeAttrs,
    });

    // First Normal Form (1NF)
    // Assuming data is atomic as we're dealing with FDs
    const firstNF = fds;

    // Generate explanation for 1NF
    const firstNFExplanation =
      "First Normal Form (1NF) requires that all attributes contain atomic (indivisible) values. " +
      "Since we are working with functional dependencies, we assume the data is already in 1NF.";

    // Second Normal Form (2NF)
    const nonPrimeAttrs = allAttrs.filter((attr) => !primeAttrs.includes(attr));

    const partialDependencies = [];
    const secondNF = fds.filter((fd) => {
      // Check if this is a partial dependency
      if (fd.lhs.length === 1) return true; // Single attribute dependencies are always in 2NF

      const isPartialDep = candidateKeys.some((candidateKey) => {
        // If fd.lhs is a proper subset of candidate key
        return (
          isSubset(fd.lhs, candidateKey) &&
          fd.lhs.length < candidateKey.length &&
          nonPrimeAttrs.some((attr) => fd.rhs.includes(attr))
        );
      });

      if (isPartialDep) {
        partialDependencies.push(fd);
        return false;
      }
      return true;
    });

    // Generate explanation for 2NF
    const secondNFExplanation =
      partialDependencies.length === 0
        ? "The relation is in 2NF because there are no partial dependencies of non-prime attributes on any candidate key."
        : `The relation is not in 2NF because there are partial dependencies: ${partialDependencies
            .map(formatFD)
            .join(", ")}. ` +
          "A relation is in 2NF if it's in 1NF and no non-prime attribute is partially dependent on any candidate key.";

    // Third Normal Form (3NF)
    const transitiveDependencies = [];
    const thirdNF = secondNF.filter((fd) => {
      // Not relevant for composite keys
      if (fd.isCompositeKey) return true;

      // Check if the right side is non-prime
      const isRhsNonPrime = fd.rhs.some((attr) => !primeAttrs.includes(attr));

      // Check if the left side is a superkey
      const isLeftSuperKey = superKeys.some((superKey) =>
        isSubset(superKey, fd.lhs)
      );

      // Check for transitive dependency: A → B and B is not prime and A is not a superkey
      const isTransitive = isRhsNonPrime && !isLeftSuperKey;

      if (isTransitive) {
        transitiveDependencies.push(fd);
        return false;
      }

      return true;
    });

    // Generate explanation for 3NF
    const thirdNFExplanation =
      transitiveDependencies.length === 0
        ? "The relation is in 3NF because there are no transitive dependencies of non-prime attributes on any candidate key."
        : `The relation is not in 3NF because there are transitive dependencies: ${transitiveDependencies
            .map(formatFD)
            .join(", ")}. ` +
          "A relation is in 3NF if it's in 2NF and no non-prime attribute is transitively dependent on any candidate key.";

    // BCNF
    const bcnfViolations = [];
    const bcnf = thirdNF.filter((fd) => {
      // In BCNF, for each FD X → Y, X should be a superkey
      const isLeftSuperKey = superKeys.some((superKey) =>
        isSubset(superKey, fd.lhs)
      );

      if (!isLeftSuperKey && !fd.isCompositeKey) {
        bcnfViolations.push(fd);
        return false;
      }

      return true;
    });

    // Generate explanation for BCNF
    const bcnfExplanation =
      bcnfViolations.length === 0
        ? "The relation is in BCNF because for every functional dependency X → Y, X is a superkey."
        : `The relation is not in BCNF because there are violations: ${bcnfViolations
            .map(formatFD)
            .join(", ")}. ` +
          "A relation is in BCNF if for every non-trivial functional dependency X → Y, X is a superkey.";

    // BCNF Decomposition if needed
    const decomposition =
      bcnfViolations.length > 0
        ? decomposeBCNF(allAttrs, fds, candidateKeys)
        : [];

    setResult({
      firstNF: firstNF,
      secondNF: secondNF,
      thirdNF: thirdNF,
      BCNF: bcnf,
      decomposition: decomposition,
      minimalCover: minimalCover,
    });

    setExplanation({
      firstNF: firstNFExplanation,
      secondNF: secondNFExplanation,
      thirdNF: thirdNFExplanation,
      BCNF: bcnfExplanation,
    });
  };

  const formatFD = (fd) => {
    return `${fd.lhs.join(", ")} → ${fd.rhs.join(", ")}`;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Database Normalization Tool
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Functional Dependencies (Format: A → B, C, D)
        </label>
        <textarea
          className="textarea bg-white textarea-bordered w-full p-4 h-48 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="A → B, C, D&#10;E → F, G, H&#10;H → I, J&#10;BE, BF → (Composite Key)"
          rows={10}
        />
      </div>

      <button
        className="btn btn-primary mb-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 w-full md:w-auto"
        onClick={normalize}
      >
        Analyze & Normalize
      </button>

      {allAttributes.length > 0 && (
        <div className="bg-indigo-50 p-5 rounded-lg shadow mb-8 border border-indigo-100">
          <h3 className="font-bold text-xl mb-4 text-indigo-800">
            Analysis Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">
                  All Attributes:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allAttributes.map((attr) => (
                    <span
                      key={attr}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      {attr}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">
                  Primary Key:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {keys.primaryKey && keys.primaryKey.length ? (
                    keys.primaryKey.map((attr) => (
                      <span
                        key={attr}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {attr}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 italic">
                      None identified
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">
                  Candidate Keys:
                </h4>
                <div>
                  {keys.candidateKeys && keys.candidateKeys.length ? (
                    keys.candidateKeys.map((key, i) => (
                      <div key={i} className="flex flex-wrap gap-2 mb-1">
                        {key.map((attr) => (
                          <span
                            key={attr}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {attr}
                          </span>
                        ))}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-500 italic">
                      None identified
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">
                  Prime Attributes:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {keys.primeAttrs && keys.primeAttrs.length ? (
                    keys.primeAttrs.map((attr) => (
                      <span
                        key={attr}
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                      >
                        {attr}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 italic">
                      None identified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {result.firstNF.length > 0 && (
        <div className="space-y-8">
          <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-3 text-indigo-700">
              First Normal Form (1NF)
            </h3>
            <div className="mb-3">
              <p className="text-gray-700">{explanation.firstNF}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-2">
                Functional Dependencies:
              </h4>
              <pre className="whitespace-pre-wrap text-sm font-mono bg-white p-3 rounded border border-gray-200">
                {result.firstNF.map(formatFD).join("\n")}
              </pre>
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-3 text-indigo-700">
              Second Normal Form (2NF)
            </h3>
            <div className="mb-3">
              <p className="text-gray-700">{explanation.secondNF}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-2">
                Functional Dependencies:
              </h4>
              <pre className="whitespace-pre-wrap text-sm font-mono bg-white p-3 rounded border border-gray-200">
                {result.secondNF.map(formatFD).join("\n")}
              </pre>
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-3 text-indigo-700">
              Third Normal Form (3NF)
            </h3>
            <div className="mb-3">
              <p className="text-gray-700">{explanation.thirdNF}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-2">
                Functional Dependencies:
              </h4>
              <pre className="whitespace-pre-wrap text-sm font-mono bg-white p-3 rounded border border-gray-200">
                {result.thirdNF.map(formatFD).join("\n")}
              </pre>
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-3 text-indigo-700">
              Boyce-Codd Normal Form (BCNF)
            </h3>
            <div className="mb-3">
              <p className="text-gray-700">{explanation.BCNF}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-2">
                Functional Dependencies:
              </h4>
              <pre className="whitespace-pre-wrap text-sm font-mono bg-white p-3 rounded border border-gray-200">
                {result.BCNF.map(formatFD).join("\n")}
              </pre>
            </div>

            {result.decomposition.length > 0 && (
              <div className="mt-4 bg-yellow-50 p-4 rounded border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  BCNF Decomposition:
                </h4>
                <div className="space-y-2">
                  {result.decomposition.map((rel, i) => (
                    <div
                      key={i}
                      className="bg-white p-3 rounded border border-gray-200"
                    >
                      <p className="font-medium text-gray-800">
                        Relation {i + 1}: {rel.attributes.join(", ")}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        FDs: {rel.fds.map(formatFD).join("; ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-bold text-xl mb-3 text-indigo-700">
              Minimal Cover
            </h3>
            <div className="mb-3">
              <p className="text-gray-700">
                The minimal cover is a reduced set of functional dependencies
                that is equivalent to the original set.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm font-mono bg-white p-3 rounded border border-gray-200">
                {result.minimalCover &&
                  result.minimalCover.map(formatFD).join("\n")}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Normalization;
