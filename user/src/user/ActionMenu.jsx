import { useMemo, useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { GoKey, GoPencil } from "react-icons/go";
import { HiDotsVertical } from "react-icons/hi";
import { PiClockCountdownLight, PiPencilSimpleLineLight } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Button from "../components/ui/Button";
import DropdownMenu from "../components/ui/DropdownMenu";
import Modal from "../components/ui/Modal";

export default function ActionMenu({ user }) {
  const [openModal, setOpenModal] = useState(null);

  const [logSorting, setLogSorting] = useState({ id: "", dir: null });

  const items = [
    {
      label: "Edit Role",
      icon: <GoPencil />,
      onClick: () => setOpenModal("edit"),
    },
    {
      label: "Activity Log",
      icon: <PiClockCountdownLight />,
      onClick: () => setOpenModal("activity"),
    },
    {
      label: "Reset Password",
      icon: <GoKey />,
      onClick: () => setOpenModal("reset"),
    },
    {
      label: user?.status === "Active" ? "Mark as Inactive" : "Mark as Active",
      icon: <PiPencilSimpleLineLight />,
      onClick: () => alert("toggle status"),
    },
    {
      label: "Delete User",
      icon: <RiDeleteBin5Line />,
      onClick: () => setOpenModal("delete"),
    },
  ];

  const columns = useMemo(
    () => [
      { id: "time", label: "Date and Time" },
      { id: "authority", label: "Authority" },
      { id: "activity", label: "Activity" },
    ],
    []
  );

  const handleSort = (colId) => {
    setLogSorting((prev) => {
      if (prev.id !== colId) return { id: colId, dir: "asc" };
      if (prev.dir === "asc") return { id: colId, dir: "desc" };
      return { id: "", dir: null };
    });
  };

  const arrowUI = (colId) => (
    <span className="flex flex-col items-center ml-1 select-none leading-none">
      <span
        className={`text-[10px] ${
          logSorting.id === colId && logSorting.dir === "asc"
            ? "opacity-100"
            : "opacity-30"
        }`}
      >
        ▲
      </span>
      <span
        className={`text-[10px] ${
          logSorting.id === colId && logSorting.dir === "desc"
            ? "opacity-100"
            : "opacity-30"
        }`}
      >
        ▼
      </span>
    </span>
  );

  const logData = user?.activityLog ?? [
    {
      time: "2025/09, 09 Am",
      authority: "Admin Name",
      activity: "Password changed by user",
    },
    {
      time: "2025/09, 09 Am",
      authority: "Admin Name",
      activity: "Reset Password notification sent",
    },
    {
      time: "2025/09, 09 Am",
      authority: "Admin Name",
      activity: "User status changed to Active",
    },
  ];

  const sortedData = useMemo(() => {
    if (!logSorting.dir) return logData;
    const col = logSorting.id;
    return [...logData].sort((a, b) => {
      const va = (a[col] ?? "").toString();
      const vb = (b[col] ?? "").toString();

      const aNum = Date.parse(va);
      const bNum = Date.parse(vb);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return logSorting.dir === "asc" ? aNum - bNum : bNum - aNum;
      }

      return logSorting.dir === "asc"
        ? va.localeCompare(vb)
        : vb.localeCompare(va);
    });
  }, [logData, logSorting]);

  return (
    <>
      <DropdownMenu
        anchor={
          <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <HiDotsVertical />
          </div>
        }
        items={items}
        align="right"
      />

      <Modal
        open={openModal === "edit"}
        onClose={() => setOpenModal(null)}
        title="Edit Role"
        footer={
          <div className="flex items-center justify-center gap-2 ">
            <Button
              className="w-full"
              onClick={() => {
                alert("updated");
                setOpenModal(null);
              }}
            >
              Update Role
            </Button>
          </div>
        }
      >
        <select className="w-full border rounded-lg p-2">
          <option>Analyst</option>
          <option>Manager</option>
          <option>Engineer</option>
        </select>
      </Modal>

      <Modal
        open={openModal === "activity"}
        onClose={() => setOpenModal(null)}
        title="Activity Log"
      >
        <div className="w-full overflow-x-auto ">
          <div className="grid grid-cols-3 text-sm font-medium text-gray-700 border-b pb-2">
            {columns.map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => handleSort(col.id)}
                className="flex items-center gap-2 px-1 text-left cursor-pointer focus:outline-none"
                aria-label={`Sort by ${col.label}`}
              >
                <span>{col.label}</span>
                {arrowUI(col.id)}
              </button>
            ))}
          </div>

          <div className="divide-y mt-2 ">
            {sortedData.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                No activity yet.
              </div>
            ) : (
              sortedData.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 text-sm text-gray-600 py-3 w-full"
                >
                  <div className="">{item.time}</div>
                  <div className="">{item.authority}</div>
                  <div className="">{item.activity}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>

      <Modal
        open={openModal === "reset"}
        onClose={() => setOpenModal(null)}
        title="Reset Password"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpenModal(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                alert("reset");
                setOpenModal(null);
              }}
            >
              Update
            </Button>
          </div>
        }
      >
        <div className="flex items-center gap-2 border p-2 rounded-lg">
          <input
            className="w-full border-none outline-none"
            type="password"
            defaultValue="*************"
          />
          <BsEyeSlash />
        </div>
      </Modal>
      <Modal
        open={openModal === "delete"}
        onClose={() => setOpenModal(null)}
        title="Delete User"
        footer={
          <div className="w-full flex justify-center gap-2">
            <Button
              className="w-full"
              variant="danger"
              onClick={() => {
                alert("deleted");
                setOpenModal(null);
              }}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </>
  );
}
