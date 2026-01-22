import { useMemo, useState } from "react";
import SearchInput from "../components/ui/SearchInput";
import TableWrapper from "../components/ui/TableWrapper";
import ActivityTable from "../user/ActivityTable";
import activityData  from "../utils/activityData";
import { CiSliderHorizontal } from "react-icons/ci";
import { AiOutlineUpload } from "react-icons/ai";

export default function Activity() {
  const [search, setSearch] = useState("");

  const data = useMemo(() => {
    if (!search.trim()) return activityData;
    const q = search.toLowerCase();
    return activityData.filter(
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
          title="Activity"
          actions={
            <>
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search by Keywords"
              />
              <CiSliderHorizontal className=" w-8 h-8 p-1 border border-blue-300 rounded-md text-blue-500 " />
              <AiOutlineUpload className=" w-8 h-8 p-1 border border-blue-300 rounded-md text-blue-500 bg-gray-50 " />
              
          <div className="text-sm text-gray-500 flex items-center gap-2">
            1-50 of 1,137
            <span className="text-lg cursor-pointer">‹</span>
            <span className="text-lg cursor-pointer">›</span>
          </div>
            </>
          }
        >
          <ActivityTable data={data} />
        </TableWrapper>
      </div>
    </div>
  );
}
