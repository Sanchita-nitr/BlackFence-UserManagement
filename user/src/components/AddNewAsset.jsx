import { X, ChevronDown, Info } from "lucide-react";
import { useState } from "react";

export default function AddNewAssetModal({ onClose, onAdd }) {
  const [assetType, setAssetType] = useState("");
  const [value, setValue] = useState("");
  const [keywords, setKeywords] = useState(["Primary", "Telegram"]);
  const [keywordInput, setKeywordInput] = useState("");

  const addKeyword = (e) => {
    if (e.key === "Enter" && keywordInput.trim()) {
      if (!keywords.includes(keywordInput.trim())) {
        setKeywords([...keywords, keywordInput.trim()]);
      }
      setKeywordInput("");
    }
  };

  const removeKeyword = (kw) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  const handleAddAsset = () => {
    const payload = {
      assetType,
      value,
      keywords,
    };
    onAdd?.(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[640px] rounded-2xl p-8 shadow-xl relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Add New Asset
          </h2>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        {/* Asset Type */}
        <Field label="Asset Type">
          <div className="relative">
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="" disabled>
                Select the type
              </option>
              <option value="Domain">Domain</option>
              <option value="Social">Social</option>
              <option value="App">App</option>
              <option value="Keyword">Keyword</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </Field>

        {/* Value */}
        <Field label="Value">
          <input
            type="text"
            placeholder="Enter the value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </Field>

        {/* Keywords */}
        <Field
          label={
            <span className="flex items-center gap-2">
              Keywords
              <Info size={16} className="text-blue-500" />
            </span>
          }
        >
          <div className="flex flex-wrap items-center gap-3 px-3 py-3 rounded-xl border border-gray-300">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium"
              >
                {kw}
                <button onClick={() => removeKeyword(kw)}>
                  <X size={14} />
                </button>
              </span>
            ))}

            <input
              type="text"
              placeholder="Add your keyword"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={addKeyword}
              className="flex-1 min-w-[160px] outline-none bg-transparent py-2"
            />
          </div>
        </Field>

        {/* CTA */}
        <button
          onClick={handleAddAsset}
          className="w-full mt-10 bg-[#3766C3] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#2f56a5] transition"
        >
          Add Asset
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      {children}
    </div>
  );
}
