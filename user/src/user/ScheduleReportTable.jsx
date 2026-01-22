import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

const columnHelper = createColumnHelper();

const SORTABLE_COLS = new Set([
  "reportName",
  "frequency",
  "format",
  "recipients",
  "lastSeen",
  "status",
]);

export default function ScheduleReportTable({ data = [] }) {
  const [sorting, setSorting] = useState([{ id: "reportName", desc: false }]);

  const handleSortingChange = (updater) => {
    setSorting((prev) =>
      typeof updater === "function" ? updater(prev) : updater
    );
  };

  const columns = [
    // Report Name
    columnHelper.accessor("reportName", {
      id: "reportName",
      header: "Report Name",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      enableSorting: true,
    }),

    // Frequency
    columnHelper.accessor("frequency", {
      id: "frequency",
      header: "Frequency",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),

    // Format
    columnHelper.accessor("format", {
      id: "format",
      header: "Format",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),

    // Recipients
    columnHelper.accessor("recipients", {
      id: "recipients",
      header: "Recipients",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),

    // Last Seen
    columnHelper.accessor("lastSeen", {
      id: "lastSeen",
      header: "Last Seen",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),

    // Status
    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      cell: (info) => {
        const val = info.getValue();
        const isActive = val === "Active";

        return (
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isActive ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            <span className="text-sm">{val}</span>
          </div>
        );
      },
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

  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="w-full min-w-[1100px]">
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

                        {SORTABLE_COLS.has(colId) && (
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
