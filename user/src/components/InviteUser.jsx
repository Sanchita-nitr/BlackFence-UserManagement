import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function InviteUser({ onClose }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [environment, setEnvironment] = useState("");
  const [requireMFA, setRequireMFA] = useState(true);

  const handleInvite = () => {
    const payload = {
      email,
      role,
      environment,
      requireMFA,
    };

    console.log("Invite Payload:", payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-2xl p-8 relative shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Invite New User
          </h2>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-gray-800" />
          </button>
        </div>
        <Field label="Email Address">
          <input
            type="email"
            placeholder="Enter the email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Field>
        <Field label="Role">
          <Select
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Select the role"
            options={["Admin", "Manager", "Analyst", "Viewer"]}
          />
        </Field>
        <div className="flex items-center justify-between my-6">
          <span className="text-sm font-medium text-gray-900">Require MFA</span>
          <Toggle checked={requireMFA} onChange={setRequireMFA} />
        </div>
        <Field label="Environment Access">
          <Select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            placeholder="Select the environment"
            options={["Production", "UAT", "Staging"]}
          />
        </Field>
        <button
          onClick={handleInvite}
          className="w-full mt-8 bg-[#3766C3] text-white py-3 rounded-xl text-lg font-medium hover:bg-[#2f56a5] transition"
        >
          Invite
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

function Select({ value, onChange, placeholder, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
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

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition ${
        checked ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${
          checked ? "translate-x-6" : ""
        }`}
      />
    </button>
  );
}
