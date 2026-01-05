import { useMemo, useState } from "react";
import { CiSliderHorizontal } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { PiUserCirclePlusBold } from "react-icons/pi";
import InviteUser from "../components/InviteUser";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import TableWrapper from "../components/ui/TableWrapper";
import RBCATable from "../user/RBCATable";
import rbcaData from "../utils/rbcaData";
import RBACManagement from "./Users&RBAC2nd";

const SUB_TABS = [
  { id: "user-management", label: "User Management" },
  { id: "rbac-management", label: "RBAC Management" },
];

export default function UsersRBAC() {
  const [activeSubTab, setActiveSubTab] = useState("user-management");
  const [search, setSearch] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const data = useMemo(() => {
    if (!search.trim()) return rbcaData;
    const q = search.toLowerCase();
    return rbcaData.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex items-center gap-10 mb-6">
          {SUB_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`pb-1 ${
                activeSubTab === tab.id
                  ? "text-blue-600 font-medium border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeSubTab === "user-management" ? (
          <TableWrapper
            actions={
              <>
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Search by Keywords"
                />
                <Button variant="ghost" className="px-3 border border-blue-500">
                  <CiSliderHorizontal className="text-blue-600" />
                </Button>
                <Button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="whitespace-nowrap gap-2 flex items-center"
                >
                  <PiUserCirclePlusBold size={25} /> Invite User
                </Button>

                <div className="text-sm text-slate-600">1-50 of 1,137</div>

                <FaAngleLeft />
                <FaAngleRight />
              </>
            }
          >
            <RBCATable data={data} />
          </TableWrapper>
        ) : (
          <RBACManagement />
        )}

        {isInviteModalOpen && (
          <InviteUser onClose={() => setIsInviteModalOpen(false)} />
        )}
      </div>
    </div>
  );
}
