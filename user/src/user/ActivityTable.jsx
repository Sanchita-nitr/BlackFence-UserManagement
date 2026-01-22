import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import Badge from "../components/ui/Badge";

const columnHelper = createColumnHelper();

export default function ActivityTable({ data = [] }) {
  const [sorting, setSorting] = useState([{ id: "timestamp", desc: true }]);

  const handleSortingChange = (updater) => {
    setSorting((prev) =>
      typeof updater === "function" ? updater(prev) : updater
    );
  };

  const columns = [
    columnHelper.accessor("selected", {
      id: "select",
      header: () => <input type="checkbox" className="h-4 w-4 rounded" />,
      cell: (info) => (
        <input
          type="checkbox"
          checked={info.getValue()}
          className="h-4 w-4 rounded accent-blue-600"
          readOnly
        />
      ),
      enableSorting: false,
    }),

    columnHelper.accessor("timestamp", {
      id: "timestamp",
      header: "Time Stamp",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      enableSorting: true,
    }),

    columnHelper.accessor("actor", {
      id: "actor",
      header: "Actors",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),

    columnHelper.accessor("action", {
      id: "actionName",
      header: "Action",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),

    columnHelper.accessor("severity", {
      id: "severity",
      header: "Severity",
      cell: (info) => {
        const val = info.getValue();
        const toneMap = {
          Critical: "critical",
          High: "high",
          Medium: "warning",
          Low: "success",
        };
        return <Badge value={val} tone={toneMap[val] || "muted"} />;
      },
      enableSorting: true,
    }),

    columnHelper.accessor("details", {
      id: "details",
      header: "Details",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),

    columnHelper.accessor("reason", {
      id: "reason",
      header: "Reason",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: handleSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const arrowCols = new Set([
    "timestamp",
    "actor",
    "severity",
    "details",
    "reason",
  ]);

  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="w-full min-w-[1200px]">
        <thead className="bg-gray-50 sticky top-0">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="border-b border-gray-200">
              {hg.headers.map((header) => {
                const col = header.column;
                const canSort = col.getCanSort();
                const isSorted = col.getIsSorted();
                const colId = col.id;

                return (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-sm font-medium text-slate-700"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        onClick={
                          canSort ? col.getToggleSortingHandler() : undefined
                        }
                        className={`w-full flex items-center justify-between gap-2 ${
                          canSort ? "cursor-pointer" : "cursor-default"
                        }`}
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>

                        {arrowCols.has(colId) && (
                          <span className="ml-2 flex flex-col text-[10px] leading-none">
                            <span
                              className={
                                isSorted === "asc"
                                  ? "opacity-100"
                                  : "opacity-30"
                              }
                            >
                              ▲
                            </span>
                            <span
                              className={
                                isSorted === "desc"
                                  ? "opacity-100"
                                  : "opacity-30"
                              }
                            >
                              ▼
                            </span>
                          </span>
                        )}
                      </button>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-gray-100">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 text-sm text-slate-700 align-middle"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
