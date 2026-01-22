import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import Badge from "../components/ui/Badge";
import ActionMenu from "./ActionMenu";

const columnHelper = createColumnHelper();

export default function RBCATable({ data = [] }) {
  const [sorting, setSorting] = useState([{ id: "createdDate", desc: true }]);

  const handleSortingChange = (updater) => {
    setSorting((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      console.log("Table sorting changed ->", next);
      return next;
    });
  };

  const handleToggleStatus = (user) => {
    alert(`Toggle status for ${user.name} (implement real handler)`);
  };

  const handleDelete = (user) => {
    alert(`Delete user ${user.name} (implement real handler)`);
  };

  const buildColumns = () => [
    columnHelper.accessor("name", {
      id: "name",
      header: "Name",
      cell: (info) => <div className="font-medium">{info.getValue()}</div>,
      enableSorting: true,
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: "Email",
      cell: (info) => <div className="text-sm">{info.getValue()}</div>,
      enableSorting: true,
    }),
    columnHelper.accessor("role", {
      id: "role",
      header: "Role",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor("lastLogin", {
      id: "lastLogin",
      header: "Last Login",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
columnHelper.accessor("status", {
  id: "status",
  header: "Status",
  cell: (info) => {
    const val = info.getValue();

    const toneMap = {
      Active: "success",
      Invited: "invited",

    };

    return (
      <Badge
        value={val}
        tone={toneMap[val] || "muted"}
      />
    );
  },
  enableSorting: true,
}),

   columnHelper.accessor("mfa", {
  id: "mfa",
  header: "MFA",
  cell: (info) => {
    const val = info.getValue();

    const isEnabled =
      val === true || val === "Enabled" || val === "enabled";

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
          ${
            isEnabled
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
      >
        {isEnabled ? "Enabled" : "Disabled"}
      </span>
    );
  },
  enableSorting: true,
}),

    columnHelper.accessor("createdDate", {
      id: "createdDate",
      header: "Created Date",
      cell: (info) => {
        const d = new Date(info.getValue());
        return <span className="text-sm">{d.toLocaleString()}</span>;
      },
      enableSorting: true,
    }),
    columnHelper.accessor("id", {
      id: "action",
      header: "Action",
      cell: (info) => (
        <ActionMenu
          user={info.row.original}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
      ),
      enableSorting: false,
    }),
  ];

  const columns = buildColumns();

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: handleSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const arrowCols = new Set([
    "name",
    "email",
    "role",
    "lastLogin",
    "status",
    "mfa",
    "createdDate",
  ]);

  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="w-full min-w-[900px]">
        <thead className="bg-gray-50 sticky top-0">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="border-b border-gray-100">
              {hg.headers.map((header) => {
                const col = header.column;
                const canSort = col.getCanSort();
                const colId = col.id;
                const isSorted = col.getIsSorted();

                const arrowUI = arrowCols.has(colId) ? (
                  <span className="flex flex-col items-center ml-2 select-none">
                    <span
                      className={`text-[10px] leading-none transition-opacity ${
                        isSorted === "asc" ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      ▲
                    </span>
                    <span
                      className={`text-[10px] leading-none transition-opacity ${
                        isSorted === "desc" ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      ▼
                    </span>
                  </span>
                ) : null;

                return (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-sm font-medium text-slate-700"
                    scope="col"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        onClick={
                          canSort ? col.getToggleSortingHandler() : undefined
                        }
                        className={`w-full text-left flex items-center justify-between gap-3 focus:outline-none ${
                          canSort ? "cursor-pointer" : "cursor-default"
                        }`}
                        aria-label={`Sort by ${String(
                          header.column.columnDef.header
                        )}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                        </div>

                        <div className="flex items-center">{arrowUI}</div>
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
