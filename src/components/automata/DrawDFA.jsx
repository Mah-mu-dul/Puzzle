import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Handle,
  Position,
  getBezierPath,
} from "reactflow";
import "reactflow/dist/style.css";

const styles = {
  nodeContainer: {
    position: "relative",
  },
  node: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "white",
    border: "2px solid #ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  handle: {
    width: "8px",
    height: "8px",
    backgroundColor: "transparent",
    border: "2px solid #555",
    opacity: 0.5,
  },
  edgePath: {
    stroke: "#333",
    strokeWidth: 2,
    cursor: "pointer",
    fill: "none",
  },
  edgePathSelected: {
    stroke: "#555",
    strokeWidth: 3,
  },
  edgeText: {
    fontSize: "12px",
    fill: "#333",
    pointerEvents: "all",
    cursor: "pointer",
    userSelect: "none",
  },
};

// Custom Node Component
const CustomNode = ({ id, data }) => {
  const handleDoubleClick = (evt) => {
    evt.stopPropagation();
    const newLabel = prompt("Enter new state name:", data.label);
    if (newLabel && newLabel.trim()) {
      data.onLabelChange(id, newLabel.trim());
    }
  };

  return (
    <div style={styles.nodeContainer}>
      <Handle type="target" position={Position.Top} style={styles.handle} />
      <Handle type="target" position={Position.Right} style={styles.handle} />
      <Handle type="target" position={Position.Bottom} style={styles.handle} />
      <Handle type="target" position={Position.Left} style={styles.handle} />
      <Handle type="source" position={Position.Top} style={styles.handle} />
      <Handle type="source" position={Position.Right} style={styles.handle} />
      <Handle type="source" position={Position.Bottom} style={styles.handle} />
      <Handle type="source" position={Position.Left} style={styles.handle} />
      <div style={styles.node} onDoubleClick={handleDoubleClick}>
        <span>{data.label}</span>
      </div>
    </div>
  );
};

// Modified CustomEdge component
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  selected,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: data?.curvature || 0.25,
  });

  return (
    <>
      <path
        id={id}
        style={{
          ...styles.edgePath,
          ...(selected ? styles.edgePathSelected : {}),
        }}
        d={edgePath}
        markerEnd={markerEnd}
        className="react-flow__edge-path"
      />
      <text
        x={labelX}
        y={labelY}
        style={styles.edgeText}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {data?.symbol || ""}
      </text>
    </>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const DrawDFA = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [dfaData, setDfaData] = useState(null);
  const clickTimerRef = useRef(null);
  const clickCountRef = useRef(0);

  const handleNodeLabelChange = useCallback(
    (nodeId, newLabel) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node
        )
      );
    },
    [setNodes]
  );

  const addNewState = useCallback(() => {
    const nodeId = `q${nodes.length}`;
    const newNode = {
      id: nodeId,
      type: "custom",
      position: {
        x: Math.random() * 300 + 100,
        y: Math.random() * 300 + 100,
      },
      data: {
        label: nodeId,
        onLabelChange: handleNodeLabelChange,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes.length, setNodes, handleNodeLabelChange]);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: "custom",
        animated: true,
        data: {
          symbol: "0",
          curvature: 0.25,
        },
        markerEnd: {
          type: MarkerType.Arrow,
          width: 20,
          height: 20,
        },
        style: { stroke: "#333", strokeWidth: 2 },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      setEdges((els) =>
        els.map((el) => {
          if (el.id === oldEdge.id) {
            return {
              ...el,
              ...newConnection,
            };
          }
          return el;
        })
      );
    },
    [setEdges]
  );

  const onEdgeDoubleClick = useCallback(
    (event, edge) => {
      event.stopPropagation();
      const newSymbol = prompt(
        "Enter transition symbol:",
        edge.data?.symbol || "0"
      );
      if (newSymbol && newSymbol.trim()) {
        setEdges((eds) =>
          eds.map((e) =>
            e.id === edge.id
              ? {
                  ...e,
                  label: newSymbol.trim(),
                  data: { ...e.data, symbol: newSymbol.trim() },
                }
              : e
          )
        );
      }
    },
    [setEdges]
  );

  const handleElementClick = useCallback(
    (event, element) => {
      event.stopPropagation();
      clickCountRef.current += 1;

      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = setTimeout(() => {
        if (clickCountRef.current === 3) {
          if ("source" in element) {
            setEdges((eds) => eds.filter((e) => e.id !== element.id));
          } else {
            setNodes((nds) => nds.filter((n) => n.id !== element.id));
            setEdges((eds) =>
              eds.filter(
                (e) => e.source !== element.id && e.target !== element.id
              )
            );
          }
        }
        clickCountRef.current = 0;
      }, 200);
    },
    [setNodes, setEdges]
  );

  const generateDFATable = useCallback(() => {
    const states = nodes.map((node) => node.id);
    const alphabet = [...new Set(edges.map((edge) => edge.data?.symbol))];
    const initialState = nodes.find((node) => node.data.isInitial)?.id;
    const finalStates = nodes
      .filter((node) => node.data.isFinal)
      .map((node) => node.id);

    const transitionFunction = {};
    states.forEach((state) => {
      transitionFunction[state] = {};
      alphabet.forEach((symbol) => {
        const transition = edges.find(
          (edge) => edge.source === state && edge.data.symbol === symbol
        );
        if (transition) {
          transitionFunction[state][symbol] = transition.target;
        }
      });
    });

    setDfaData({
      states,
      alphabet,
      initialState,
      finalStates,
      transitionFunction,
    });
  }, [nodes, edges]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div style={{ height: "80vh", width: "100%", border: "1px solid #ccc" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onEdgeDoubleClick={onEdgeDoubleClick}
          onEdgeClick={handleElementClick}
          onNodeClick={handleElementClick}
          fitView
          defaultEdgeOptions={{
            type: "custom",
            animated: true,
          }}
          edgesUpdatable={true}
          edgesFocusable={true}
          selectNodesOnDrag={false}
          elementsSelectable={true}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div style={{ padding: "1rem", display: "flex", gap: "1rem" }}>
        <button className="btn btn-primary" onClick={addNewState}>
          Add State
        </button>
        <button className="btn btn-secondary" onClick={generateDFATable}>
          Generate DFA Table
        </button>
      </div>
      {dfaData && (
        <div style={{ padding: "1rem" }}>
          <pre
            style={{
              background: "#f0f0f0",
              padding: "1rem",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify(dfaData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DrawDFA;
