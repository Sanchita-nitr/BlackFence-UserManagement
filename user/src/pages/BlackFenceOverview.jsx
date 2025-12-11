import { useState } from "react";
import { CiSliderHorizontal } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import StatusCard from "../components/cards/StatusCard";
import MainLayout from "../components/layout/MainLayout";
import MetaDetail from "../components/meta/MetaDetail";
import RoleList from "../components/sidebar/RoleList";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import sampleCards from "../utils/sampleCards";
export default function BlackFenceOverview() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = sampleCards.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.summary.toLowerCase().includes(query.toLowerCase())
  );

  const top = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-slate-900">
          BlackFence Overview
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-2 justify-end">
          <button
            className="w-7 h-7 flex items-center justify-center rounded-md bg-[#FF718B] text-white"
            title="Critical"
          >
            <TiTick size={16} />
          </button>

          <button
            className="w-7 h-7 flex items-center justify-center rounded-md bg-[#FCB5C3] text-white"
            title="High"
          >
            <TiTick size={16} />
          </button>

          <button
            className="w-7 h-7 flex items-center justify-center rounded-md bg-[#F5C710] text-white"
            title="Medium"
          >
            <TiTick size={16} />
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-md bg-[#7FE47E] text-white"
            title="Low"
          >
            <TiTick size={16} />
          </button>
        </div>

        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search by Keywords"
        />

        <Button variant="ghost" className="px-3 border border-blue-500">
          <CiSliderHorizontal className="text-blue-600" />
        </Button>

        <div className="text-sm text-slate-600">1-50 of 1,137</div>

        <FaAngleLeft />
        <FaAngleRight />
      </div>
    </div>
  );

  const center = (
    <div>
      <div className="grid grid-cols-2 gap-4 auto-rows-fr">
        {filtered.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelected(c)}
            className="cursor-pointer h-full"
          >
            <StatusCard item={c} selected={selected?.id === c.id} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <MainLayout
      top={top}
      left={<RoleList />}
      center={center}
      right={<MetaDetail selected={selected} />}
    />
  );
}
