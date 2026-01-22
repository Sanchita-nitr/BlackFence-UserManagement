import { X, ChevronDown, Calendar } from "lucide-react";
import { useState } from "react";

export default function AddWhitelistModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    entryType: "",
    value: "",
    scope: "",
    expiryDate: "",
    reason: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      entryType: form.entryType,
      value: form.value,
      scope: form.scope,
      expiryDate: form.expiryDate || null,
      reason: form.reason,
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
            Add Whitelist
          </h2>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        {/* Entry Type */}
        <Field label="Entry Type">
          <Select
            value={form.entryType}
            onChange={(e) => handleChange("entryType", e.target.value)}
            placeholder="Select the type"
            options={["Domain", "Social", "App", "Keyword"]}
          />
        </Field>

        {/* Value */}
        <Field label="Value">
          <input
            type="text"
            placeholder="Enter the value"
            value={form.value}
            onChange={(e) => handleChange("value", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </Field>

        {/* Scope */}
        <Field label="Scope">
          <Select
            value={form.scope}
            onChange={(e) => handleChange("scope", e.target.value)}
            placeholder="Select the scope"
            options={["Global", "Brandfench"]}
          />
        </Field>

        {/* Expiry Date */}
        <Field label="Expiry Date (Optional)">
          <div className="relative">
            <input
              type="date"
              value={form.expiryDate}
              onChange={(e) => handleChange("expiryDate", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </Field>

        {/* Reason */}
        <Field label="Reason">
          <textarea
            rows={4}
            placeholder="Enter the reason"
            value={form.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </Field>

        {/* CTA */}
        <button
          onClick={handleSubmit}
          className="w-full mt-10 bg-[#3766C3] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#2f56a5] transition"
        >
          Add Asset
        </button>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

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

function Select({ value, onChange, placeholder, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}
