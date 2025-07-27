import React, { useMemo } from "react";
import {
  useTable,
  useFilters,
  usePagination,
  useGlobalFilter,
} from "react-table";

function similarity(a, b) {
  if (!a || !b) return 0;
  a = a.toLowerCase();
  b = b.toLowerCase();
  if (a === b) return 1;
  // Simple similarity: percent of b found in a
  let matches = 0;
  for (let i = 0; i < b.length; i++) {
    if (a.includes(b[i])) matches++;
  }
  return matches / b.length;
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Unique options, case-insensitive
  const options = useMemo(() => {
    const opts = new Map();
    preFilteredRows.forEach((row) => {
      const val = row.values[id];
      if (val && typeof val === "string") {
        opts.set(val.toLowerCase(), val);
      } else if (val !== undefined && val !== null) {
        opts.set(String(val).toLowerCase(), String(val));
      }
    });
    return [...opts.values()].filter(Boolean);
  }, [id, preFilteredRows]);
  return (
    <select
      className="border rounded px-2 py-1 text-sm bg-white"
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value || undefined)}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <input
      className="border rounded px-3 py-2 text-sm mb-3 w-full max-w-xs bg-white"
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
      placeholder="Search all fields..."
    />
  );
}

function getContributor(row) {
  if (row.anonymous) return "Anonymous";
  if (row.contributor) return row.contributor;
  if (row.contributorName) return row.contributorName;
  if (row.contributorEmail) return row.contributorEmail;
  if (row.email) return row.email;
  if (row.userName) return row.userName;
  if (row.userEmail) return row.userEmail;
  return "Unknown";
}

export default function AdminDashboardQuestionsTable({ questions, loading }) {
  // For global search: flatten all fields into a string for each row
  const data = useMemo(
    () =>
      questions.map((q) => ({
        ...q,
        yearSemester: [q.year, q.semester].filter(Boolean).join("/") || "",
        contributorDisplay: getContributor(q) || "",
        uploadTimeDisplay: q.uploadTime?.seconds
          ? new Date(q.uploadTime.seconds * 1000).toLocaleString()
          : q.uploadTime
          ? new Date(q.uploadTime).toLocaleString()
          : "",
        updateTimeDisplay: q.updateTime
          ? new Date(q.updateTime).toLocaleString()
          : "",
        imagesCount: Array.isArray(q.images) ? q.images.length : 0,
        anonymousDisplay: q.anonymous ? "Yes" : "No",
        approvedDisplay: q.approved ? "Yes" : "No",
        likes: typeof q.likes === "number" ? q.likes : 0,
        views: typeof q.views === "number" ? q.views : 0,
        status: q.status || "",
        _search: JSON.stringify({
          ...q,
          yearSemester: [q.year, q.semester].filter(Boolean).join("/") || "",
          contributorDisplay: getContributor(q) || "",
          uploadTimeDisplay: q.uploadTime?.seconds
            ? new Date(q.uploadTime.seconds * 1000).toLocaleString()
            : q.uploadTime
            ? new Date(q.uploadTime).toLocaleString()
            : "",
          updateTimeDisplay: q.updateTime
            ? new Date(q.updateTime).toLocaleString()
            : "",
          imagesCount: Array.isArray(q.images) ? q.images.length : 0,
          anonymousDisplay: q.anonymous ? "Yes" : "No",
          approvedDisplay: q.approved ? "Yes" : "No",
          likes: typeof q.likes === "number" ? q.likes : 0,
          views: typeof q.views === "number" ? q.views : 0,
          status: q.status || "",
        }),
      })),
    [questions]
  );

  // Custom filter for react-table columns (case-insensitive, 80% match)
  function fuzzyTextFilterFn(rows, id, filterValue) {
    if (!filterValue) return rows;
    const lower = filterValue.toLowerCase();
    return rows.filter((row) => {
      const val = row.values[id];
      if (!val) return false;
      const valStr = String(val).toLowerCase();
      return (
        valStr === lower ||
        valStr.includes(lower) ||
        similarity(valStr, lower) >= 0.8
      );
    });
  }
  fuzzyTextFilterFn.autoRemove = (val) => !val;

  const columns = useMemo(
    () => [
      {
        Header: "Course Name",
        accessor: "courseName",
        Filter: SelectColumnFilter,
        filter: fuzzyTextFilterFn,
      },
      {
        Header: "Course Code",
        accessor: "courseCode",
        Filter: SelectColumnFilter,
        filter: fuzzyTextFilterFn,
      },
      {
        Header: "Faculty",
        accessor: "facultyName",
        Filter: SelectColumnFilter,
        filter: fuzzyTextFilterFn,
      },
      {
        Header: "Year/Semester",
        accessor: "yearSemester",
        Filter: SelectColumnFilter,
        filter: fuzzyTextFilterFn,
      },
      {
        Header: "Type",
        accessor: "type",
        Filter: SelectColumnFilter,
        filter: fuzzyTextFilterFn,
      },
      {
        Header: "Images",
        accessor: "imagesCount",
        id: "imagesCount",
        disableFilters: true,
      },
      {
        Header: "Upload Time",
        accessor: "uploadTimeDisplay",
        id: "uploadTime",
        disableFilters: true,
      },
      {
        Header: "Update Time",
        accessor: "updateTimeDisplay",
        id: "updateTime",
        disableFilters: true,
      },
      {
        Header: "Contributor",
        accessor: "contributorDisplay",
        id: "contributorDisplay",
        disableFilters: true,
      },
      {
        Header: "Anonymous",
        accessor: "anonymousDisplay",
        id: "anonymous",
        disableFilters: true,
      },
      {
        Header: "Approved",
        accessor: "approvedDisplay",
        id: "approved",
        disableFilters: true,
      },
      {
        Header: "Status",
        accessor: "status",
        id: "status",
        disableFilters: true,
      },
      {
        Header: "Likes",
        accessor: "likes",
        id: "likes",
        disableFilters: true,
      },
      {
        Header: "Views",
        accessor: "views",
        id: "views",
        disableFilters: true,
      },
    ],
    []
  );

  // Custom global filter for searching all fields
  function globalTextFilter(rows, ids, filterValue) {
    if (!filterValue) return rows;
    const lower = filterValue.toLowerCase();
    return rows.filter((row) =>
      row.original._search.toLowerCase().includes(lower)
    );
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      globalFilter: globalTextFilter,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
      <div className="font-semibold mb-4 text-blue-700">Questions Table</div>
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="flex flex-wrap gap-2 mb-2">
        {headerGroups[0].headers.map((column) =>
          column.canFilter ? (
            <div key={column.id} className="mr-2">
              <label className="text-xs text-gray-600 mr-1">
                {column.render("Header")}
              </label>
              {column.render("Filter")}
            </div>
          ) : null
        )}
      </div>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-blue-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {loading ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="animate-pulse h-8 bg-blue-100 rounded my-2" />
              </td>
            </tr>
          ) : (
            page.map((row, idx) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={idx % 2 === 0 ? "bg-white" : "bg-blue-50/60"}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 whitespace-nowrap text-sm text-gray-700"
                    >
                      {(() => {
                        try {
                          const val = cell.render("Cell");
                          return val === undefined || val === null ? "" : val;
                        } catch (e) {
                          return <span className="text-red-500">Error</span>;
                        }
                      })()}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-2 py-1 rounded bg-blue-100 disabled:opacity-50"
          >
            First
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-2 py-1 rounded bg-blue-100 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm mx-2">
            Page <strong>{pageIndex + 1}</strong> of{" "}
            <strong>{pageOptions.length}</strong>
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-2 py-1 rounded bg-blue-100 disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="px-2 py-1 rounded bg-blue-100 disabled:opacity-50"
          >
            Last
          </button>
        </div>
        <div>
          <select
            className="border rounded px-2 py-1 text-sm bg-white"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
