import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "react-hot-toast";

function Schema() {
  const [tables, setTables] = useState([
    {
      id: "table1",
      name: "Table 1", // Added table name
      cells: ["Primary Key"], // First cell is primary key by default
      primaryKeyIndex: 0, // Track which column is the primary key
      foreignKeys: {}, // Format: {columnIndex: {tableId, tableName, primaryKeyValue}}
    },
  ]);

  const addColumn = (tableIndex) => {
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex] = {
        ...newTables[tableIndex],
        cells: [...newTables[tableIndex].cells, "newCell"],
      };
      return newTables;
    });
  };

  const addTable = () => {
    setTables((prev) => [
      ...prev,
      {
        id: `table${prev.length + 1}`,
        name: `Table ${prev.length + 1}`,
        cells: ["Primary Key"], // First cell is primary key by default
        primaryKeyIndex: 0,
        foreignKeys: {},
      },
    ]);
  };

  const removeTable = (tableIndex) => {
    if (window.confirm("Are you sure you want to remove this table?")) {
      setTables((prev) => prev.filter((_, index) => index !== tableIndex));
      toast.success("Table removed successfully");
    }
  };

  const deleteColumn = (tableIndex, columnIndex) => {
    if (columnIndex === 0) return; // Prevent deleting primary key
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex] = {
        ...newTables[tableIndex],
        cells: newTables[tableIndex].cells.filter(
          (_, index) => index !== columnIndex
        ),
      };
      return newTables;
    });
    toast.success("Column deleted successfully");
  };

  const makePrimaryKey = (tableIndex, columnIndex) => {
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex] = {
        ...newTables[tableIndex],
        primaryKeyIndex: columnIndex, // Update the primary key index
      };
      return newTables;
    });
    toast.success("Primary key updated successfully");
  };

  const makeForeignKey = (tableIndex, columnIndex, referenceTable) => {
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex] = {
        ...newTables[tableIndex],
        foreignKeys: {
          ...newTables[tableIndex].foreignKeys,
          [columnIndex]: {
            tableId: referenceTable.id,
            tableName: referenceTable.name,
            referencedTableIndex: prev.findIndex(
              (t) => t.id === referenceTable.id
            ),
            primaryKeyIndex: referenceTable.primaryKeyIndex,
          },
        },
      };
      return newTables;
    });
    toast.success("Foreign key created successfully");
  };

  const updateTableName = (tableIndex, newName) => {
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex] = {
        ...newTables[tableIndex],
        name: newName,
      };

      // Update all foreign key references to this table
      newTables.forEach((table) => {
        Object.entries(table.foreignKeys).forEach(([colIdx, ref]) => {
          if (ref.tableId === newTables[tableIndex].id) {
            table.foreignKeys[colIdx] = {
              ...ref,
              tableName: newName,
            };
          }
        });
      });

      return newTables;
    });
  };

  const updateCellContent = (tableIndex, cellIndex, newValue) => {
    setTables((prev) => {
      const newTables = [...prev];
      // Update the cell value
      newTables[tableIndex].cells[cellIndex] = newValue;

      // If this is a primary key, update all foreign keys that reference it
      if (cellIndex === newTables[tableIndex].primaryKeyIndex) {
        newTables.forEach((table) => {
          Object.entries(table.foreignKeys).forEach(([colIdx, ref]) => {
            if (ref.tableId === newTables[tableIndex].id) {
              table.foreignKeys[colIdx] = {
                ...ref,
                primaryKeyValue: newValue,
              };
            }
          });
        });
      }

      return newTables;
    });
  };

  // Function to get cell display value
  const getCellDisplay = (table, cellIndex, cell, allTables) => {
    const foreignKey = table.foreignKeys[cellIndex];
    if (foreignKey) {
      const referencedTable = allTables[foreignKey.referencedTableIndex];
      const primaryKeyValue = referencedTable.cells[foreignKey.primaryKeyIndex];
      return (
        <div>
          <span>{cell}</span>
          <span className="text-gray-500 text-sm ml-2">
            ({foreignKey.tableName} → {primaryKeyValue})
          </span>
        </div>
      );
    }
    return cell;
  };

  return (
    <div className="p-4 overflow-auto min-h-screen space-y-8">
      {tables.map((table, tableIndex) => (
        <div key={tableIndex} className="space-y-2">
          <div className="flex gap-4 items-center">
            <div
              contentEditable="true"
              suppressContentEditableWarning
              className="px-2 py-1 font-semibold text-lg outline-none border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500"
              onBlur={(e) =>
                updateTableName(tableIndex, e.currentTarget.textContent)
              }
            >
              {table.name}
            </div>
            <button
              onClick={() => removeTable(tableIndex)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove Table
            </button>
            <button
              onClick={() => addColumn(tableIndex)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 h-fit"
            >
              Add Column
            </button>
          </div>
          <div className="">
            <table className="border border-slate-400">
              <tbody>
                <tr>
                  {table.cells.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`border border-slate-400 p-2 w-fit relative group ${
                        cellIndex === table.primaryKeyIndex
                          ? "bg-yellow-200"
                          : table.foreignKeys[cellIndex]
                          ? "bg-green-200"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          contentEditable="true"
                          suppressContentEditableWarning
                          className="bg-transparent outline-none"
                          onBlur={(e) => {
                            updateCellContent(
                              tableIndex,
                              cellIndex,
                              e.currentTarget.textContent
                            );
                          }}
                        >
                          {cell}
                        </div>
                        {table.foreignKeys[cellIndex] && (
                          <span className="text-gray-500 text-sm whitespace-nowrap">
                            ({table.foreignKeys[cellIndex].tableName} →{" "}
                            {
                              tables[
                                table.foreignKeys[cellIndex]
                                  .referencedTableIndex
                              ].cells[
                                table.foreignKeys[cellIndex].primaryKeyIndex
                              ]
                            }
                            )
                          </span>
                        )}
                      </div>
                      {/* Dropdown content */}
                      <div className="hidden z-50 group-hover:block absolute top-full left-0 mt-1 w-64 z-10">
                        <div className="card card-sm bg-white shadow-md border border-gray-200 rounded-md">
                          <div className="card-body p-4">
                            <p className="text-sm">Options for this cell:</p>
                            <ul className="mt-2 space-y-2">
                              <li>
                                <button
                                  className={`text-left w-full px-2 py-1 rounded ${
                                    cellIndex === table.primaryKeyIndex
                                      ? "text-gray-400 cursor-not-allowed"
                                      : "hover:bg-gray-100"
                                  }`}
                                  onClick={() =>
                                    makePrimaryKey(tableIndex, cellIndex)
                                  }
                                  disabled={cellIndex === table.primaryKeyIndex}
                                >
                                  Make Primary Key
                                </button>
                              </li>
                              <li>
                                <div className="text-sm font-medium mb-1">
                                  Make Foreign Key:
                                </div>
                                {tables.map((refTable, refIndex) => (
                                  <button
                                    key={refTable.id}
                                    className="text-left w-full hover:bg-gray-100 px-2 py-1 rounded text-sm"
                                    onClick={() =>
                                      makeForeignKey(
                                        tableIndex,
                                        cellIndex,
                                        refTable
                                      )
                                    }
                                  >
                                    {refTable.name}{" "}
                                    {refIndex === tableIndex ? "(self)" : ""} →{" "}
                                    {refTable.cells[refTable.primaryKeyIndex]}
                                  </button>
                                ))}
                              </li>
                              <li>
                                <button
                                  className={`text-left w-full px-2 py-1 rounded ${
                                    cellIndex === table.primaryKeyIndex
                                      ? "text-gray-400 cursor-not-allowed"
                                      : "hover:bg-gray-100"
                                  }`}
                                  onClick={() =>
                                    deleteColumn(tableIndex, cellIndex)
                                  }
                                  disabled={cellIndex === table.primaryKeyIndex}
                                >
                                  Delete Column
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <div className="">
        <button
          onClick={addTable}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add Table
        </button>
      </div>
    </div>
  );
}

export default Schema;
