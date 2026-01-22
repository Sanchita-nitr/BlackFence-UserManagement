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
  "type",
  "value",
  "scope",
  "reason",
  "expiryAt",
  "addedAt",
]);

export default function WhitelistsTable({ data = [], onDelete }) {

  const [sorting, setSorting] = useState([{ id: "type", desc: false }]);

  const handleSortingChange = (updater) => {
    setSorting((prev) =>
      typeof updater === "function" ? updater(prev) : updater
    );
  };
const columns = [
  columnHelper.accessor("type", {
    id: "type",
    header: "Type",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    enableSorting: true,
  }),

  columnHelper.accessor("value", {
    id: "value",
    header: "Value",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor("scope", {
    id: "scope",
    header: "Scope",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor("reason", {
    id: "reason",
    header: "Reason",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor("expiryAt", {
    id: "expiryAt",
    header: "Expiry",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor("addedAt", {
    id: "addedAt",
    header: "Added Date",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),

  // ✅ ACTION COLUMN (THIS IS THE ONLY CORRECT PLACE)
  columnHelper.display({
    id: "action",
    header: "Action",
    enableSorting: false,
    cell: ({ row }) => (
      <button
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this whitelist?")) {
            onDelete?.(row.original);
          }
        }}
        className="text-red-600 hover:text-red-800 font-medium text-sm"
      >
        Delete
      </button>
    ),
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
