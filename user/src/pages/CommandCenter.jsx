import { useState } from "react";
import { CiSliderHorizontal } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import CommandCard from "../components/cards/commandCard";
import DeepDive from "../components/dive/DeepDive";
import MainLayout from "../components/layout/MainLayout";
import ViewList from "../components/sidebar/ViewList";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import commandCenterCards from "../utils/commandCenterCards";

export default function BlackFenceOverview() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [activeView, setActiveView] = useState("Situation Board");

  const [selectedSort, setSelectedSort] = useState(["priority"]);
  const handleSortToggle = (key) => {
    setSelectedSort((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const getPriorityForView = (view) => {
    switch (view) {
      case "Situation Board":
        return "Critical";
      case "Priority Actions":
        return "High";
      case "Follow up Task":
        return "Medium";
      default:
        return null;
    }
  };

  const filteredByView = commandCenterCards.filter((c) => {
    if (!activeView) return true;
    const priorityForView = getPriorityForView(activeView);
    if (!priorityForView) return true;
    return c.priority === priorityForView;
  });

  const searched = filteredByView.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.summary.toLowerCase().includes(query.toLowerCase())
  );

  const priorityRank = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1,
  };

  const getPriorityRank = (item) => {
    const p = (item.priority || "").toString().toLowerCase();
    return priorityRank[p] ?? 0;
  };

  const getConfidence = (item) => {
    const v = item.confidence;
    return typeof v === "number" ? v : parseFloat(v) || 0;
  };

  const getFreshnessTime = (item) => {
    if (!item?.freshness) return 0;
    const t = Number(item.freshness);
    if (!Number.isNaN(t) && t > 0) return t;
    const d = new Date(item.freshness);
    return isNaN(d.getTime()) ? 0 : d.getTime();
  };
  const sortItems = (items, criteria) => {
    if (!criteria || criteria.length === 0) return items.slice();

    return items.slice().sort((a, b) => {
      for (const key of criteria) {
        let diff = 0;
        if (key === "priority") {
          diff = getPriorityRank(b) - getPriorityRank(a);
        } else if (key === "confidence") {
          diff = getConfidence(b) - getConfidence(a);
        } else if (key === "freshness") {
          diff = getFreshnessTime(b) - getFreshnessTime(a);
        }

        if (diff !== 0) return diff;
      }
      if (a.id && b.id) return String(a.id).localeCompare(String(b.id));
      return 0;
    });
  };

  const filtered = sortItems(searched, selectedSort);

  const top = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-slate-900">Command Center</h1>
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

        <FaAngleLeft className="cursor-pointer" />
        <FaAngleRight className="cursor-pointer" />
      </div>
    </div>
  );

  const center = (
    <div>
      <div className="mb-4 bg-[#FCFCFC] border border-slate-200 p-4 rounded-lg">
  <div className="flex items-center gap-6">
    <span className="text-sm font-medium text-slate-700">
      Sort by
    </span>

    <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
      <input
        type="checkbox"
        checked={selectedSort.includes("priority")}
        onChange={() => handleSortToggle("priority")}
        className="w-4 h-4 accent-indigo-600"
      />
      <span className="text-slate-800">Priority</span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
      <input
        type="checkbox"
        checked={selectedSort.includes("confidence")}
        onChange={() => handleSortToggle("confidence")}
        className="w-4 h-4 accent-indigo-600"
      />
      <span className="text-slate-800">Confidence</span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
      <input
        type="checkbox"
        checked={selectedSort.includes("freshness")}
        onChange={() => handleSortToggle("freshness")}
        className="w-4 h-4 accent-indigo-600"
      />
      <span className="text-slate-800">Freshness</span>
    </label>
  </div>
</div>

      <div className="p-5 bg-[#F86E871A] border border-white rounded-lg mb-4">
        <div className="font-bold">Critical work for today</div>
        <div>
          You have 3 critical tasks that need your attention today.Complete this
          within 8 hours to keep your brand protected.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 auto-rows-fr">
        {filtered.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelected(c)}
            className="cursor-pointer h-full"
          >
            <CommandCard item={c} selected={selected?.id === c.id} />
          </div>
        ))}
      </div>
    </div>
  );


  return (
    <MainLayout
      top={top}
      left={<ViewList activeView={activeView} setActiveView={setActiveView} />}
      center={center}
      right={<DeepDive selected={selected} />}
    />
  );
}
