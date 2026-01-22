import { useMemo, useState } from "react";
import { PiPlus } from "react-icons/pi";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import TableWrapper from "../components/ui/TableWrapper";

import { AiOutlineDelete } from "react-icons/ai";
import { CiSliderHorizontal } from "react-icons/ci";

import WhitelistsTable from "../user/WhiteListTable";
import whitelistsData from "../utils/whitelistsData";
import AddWhitelistModal from "../components/AddWhitelistModal";

export default function WhiteList() {
  const [search, setSearch] = useState("");
  const [isAddWhiteListModalOpen, setIsAddWhiteListModalOpen] = useState(false);

  const data = useMemo(() => {
    if (!search.trim()) return whitelistsData;
    const q = search.toLowerCase();
    return whitelistsData.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.username.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1500px] mx-auto">
        <TableWrapper
          title=" "
          actions={
            <>
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search by Keywords"
              />
              <CiSliderHorizontal className=" w-8 h-8 p-1 border border-blue-300 rounded-md text-blue-500 " />
              < AiOutlineDelete size={35} className="text-red-500 border border-red-300 p-1 rounded-lg" />

              <Button
                onClick={() => setIsAddWhiteListModalOpen(true)}
                className="whitespace-nowrap gap-2 flex items-center"
              >
                <PiPlus size={25} /> Add WhiteList{" "}
              </Button>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                1-50 of 1,137
                <span className="text-lg cursor-pointer">‹</span>
                <span className="text-lg cursor-pointer">›</span>
              </div>
            </>
          }
        >
         <WhitelistsTable
  data={whitelistsData}
  onDelete={(row) => {
    console.log("Delete clicked for:", row);

  }}
/>

        </TableWrapper>
      </div>
      {isAddWhiteListModalOpen && (
        
        <AddWhitelistModal onClose={() => setIsAddWhiteListModalOpen(false)} />
      )}
    </div>
  );
}
