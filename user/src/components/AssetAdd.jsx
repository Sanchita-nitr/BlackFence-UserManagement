import { Calendar, X } from "lucide-react";
import { useState } from "react";

export default function FiltersModal({ onClose, onApply }) {
  const [dates, setDates] = useState({
    detection: "",
    exfiltration: "",
  });

  const [types, setTypes] = useState({
    Domain: false,
    Social: false,
    App: false,
    Keywords: false,
  });

  const toggleType = (key) => {
    setTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectAll = () => {
    const allSelected = Object.values(types).every(Boolean);
    const updated = {};
    Object.keys(types).forEach((k) => (updated[k] = !allSelected));
    setTypes(updated);
  };

  const clearAll = () => {
    setTypes({
      Domain: false,
      Social: false,
      App: false,
      Keywords: false,
    });
  };

  const applyFilters = () => {
    onApply?.({ dates, types });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[760px] rounded-2xl p-8 shadow-xl relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        {/* Date Section */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-6">Date</h3>
          <div className="grid grid-cols-2 gap-6">
            <DateField
              label="Detection"
              value={dates.detection}
              onChange={(val) =>
                setDates((prev) => ({ ...prev, detection: val }))
              }
            />

            <DateField
              label="Exfiltration"
              value={dates.exfiltration}
              onChange={(val) =>
                setDates((prev) => ({ ...prev, exfiltration: val }))
              }
            />
          </div>
        </div>

        {/* Type Section */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Type</h3>
            <button
              onClick={selectAll}
              className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-medium hover:bg-blue-100"
            >
              Select all
            </button>
          </div>

          <div className="flex gap-4 flex-wrap">
            {Object.keys(types).map((type) => (
              <Checkbox
                key={type}
                label={type}
                checked={types[type]}
                onChange={() => toggleType(type)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-6 mt-10">
          <button
            onClick={clearAll}
            className="text-gray-500 font-medium hover:text-gray-700"
          >
            Clear All
          </button>
          <button
            onClick={applyFilters}
            className="px-8 py-3 rounded-xl border-2 border-blue-400 text-blue-600 font-semibold hover:bg-blue-50"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sub Components ---------- */

function DateField({ label, value, onChange }) {
  return (
    <div className="flex items-center gap-4 bg-white px-4 py-3 rounded-xl border">
      <Calendar className="text-gray-400" size={18} />
      <div className="flex flex-col w-full">
        <span className="text-sm text-gray-500">{label}</span>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-gray-900 font-medium outline-none bg-transparent cursor-pointer"
        />
      </div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border cursor-pointer hover:bg-gray-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-blue-600"
      />
      <span className="text-gray-900 font-medium">{label}</span>
    </label>
  );
}
