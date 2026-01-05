import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";

const ROLES = [
  {
    id: "admin",
    name: "Client Admin",
    desc: "Full administration access to all modules and Settings",
    permissions: 5,
  },
  {
    id: "analyst",
    name: "Analyst",
    desc: "Can view, analyze and export data",
    permissions: 3,
  },
  {
    id: "viewer",
    name: "Viewer",
    desc: "Read-only access to reports and dashboards",
    permissions: 1,
  },
  {
    id: "approver",
    name: "Approver",
    desc: "Can view and approve takedown Request",
    permissions: 2,
  },
];

const PERMISSIONS = ["View", "Export", "Create/Modify", "Approve", "Admin"];

const MODULES = [
  "BrandFench",
  "BreachFench",
  "PerimeterFench",
  "BotFench",
  "NetFench",
];
export default function RBACManagement() {
  const [activeRole, setActiveRole] = useState(ROLES[0]);
  const [enabledPermissions, setEnabledPermissions] = useState(
    new Set(PERMISSIONS)
  );
  const [selectedModules, setSelectedModules] = useState(new Set());

  const togglePermission = (p) => {
    const next = new Set(enabledPermissions);
    next.has(p) ? next.delete(p) : next.add(p);
    setEnabledPermissions(next);
  };

  const toggleModule = (m) => {
    const next = new Set(selectedModules);
    next.has(m) ? next.delete(m) : next.add(m);
    setSelectedModules(next);
  };

  return (
    <div className="p-6 bg-[#F8F9FC] min-h-screen">
      <div className="flex items-center  mb-6">
        <button className="mr-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <Plus size={16} /> Custom Role
        </button>
      </div>

      <div className="grid grid-cols-[420px_1fr] gap-6">
        <div className="space-y-4">
          {ROLES.map((role) => (
            <div
              key={role.id}
              onClick={() => setActiveRole(role)}
              className={`p-5 rounded-xl border cursor-pointer bg-blue-50/30 shadow-sm shadow-blue-300 transition
                ${
                  activeRole.id === role.id
                    ? "border-blue-500 shadow-md"
                    : "border-gray-200"
                }`}
            >
              <h3 className="font-semibold mb-1">{role.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{role.desc}</p>

              <span className="inline-block px-3 py-1 text-sm rounded-lg border border-blue-300 bg-blue-50 text-blue-600">
                {role.permissions} Permissions
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Permissions</h2>

          <div className="space-y-4 mb-8">
            {PERMISSIONS.map((p) => (
              <ToggleRow
                key={p}
                label={p}
                checked={enabledPermissions.has(p)}
                onChange={() => togglePermission(p)}
              />
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4">Restrictions</h3>

          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">
              Data Visibility Scope
            </label>
            <div className="relative">
              <select className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-300">
                <option>Select the visibility scope</option>
                <option>All Data</option>
                <option>Assigned Only</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="mb-10">
            <label className="block text-sm text-gray-600 mb-3">Modules</label>
            <div className="flex flex-wrap gap-3">
              {MODULES.map((m) => (
                <label
                  key={m}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedModules.has(m)}
                    onChange={() => toggleModule(m)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm">{m}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button className="text-gray-500">Clear All</button>
            <button className="px-4 py-2 rounded-lg border border-blue-400 text-blue-600">
              Clone Role
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between border rounded-xl px-4 py-3">
      <span className="text-sm font-medium">{label}</span>
      <button
        onClick={onChange}
        className={`w-12 h-6 rounded-full relative transition ${
          checked ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${
            checked ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}
