import { useMemo, useState } from "react";
import { PiPlus } from "react-icons/pi";
import FiltersModal from "../components/AssetAdd";
import UploadModal from "../components/UploadModal";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import TableWrapper from "../components/ui/TableWrapper";
import AssetsTable from "../user/AssetsTable";

import { AiOutlineUpload } from "react-icons/ai";
import { CiSliderHorizontal } from "react-icons/ci";
import assetData from "../utils/assetData";

export default function Assets() {
  const [search, setSearch] = useState("");
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const data = useMemo(() => {
    if (!search.trim()) return assetData;

    const q = search.toLowerCase();

    return assetData.filter(
      (r) =>
        r.value?.toLowerCase().includes(q) ||
        r.type?.toLowerCase().includes(q) ||
        r.tags?.some((tag) => tag.toLowerCase().includes(q))
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
              <Button
                onClick={() => setIsUploadModalOpen(true)}
                className="whitespace-nowrap gap-2 flex items-center"
              >
                {" "}
                <AiOutlineUpload size={25} />
              </Button>

              <Button
                onClick={() => setIsAddAssetModalOpen(true)}
                className="whitespace-nowrap gap-2 flex items-center"
              >
                <PiPlus size={25} /> Add Asset
              </Button>

              <div className="text-sm text-gray-500 flex items-center gap-2">
                1-50 of 1,137
                <span className="text-lg cursor-pointer">‹</span>
                <span className="text-lg cursor-pointer">›</span>
              </div>
            </>
          }
        >
          <AssetsTable data={data} />
        </TableWrapper>
      </div>
      {isAddAssetModalOpen && (
        <FiltersModal onClose={() => setIsAddAssetModalOpen(false)} />
      )}
      {isUploadModalOpen && (
        <UploadModal onClose={() => setIsUploadModalOpen(false)} />
      )}
    </div>
  );
}
