import { useState } from "react";
import UsersRBAC from "./Users&RBAC1st";

const TABS = [
  "Overview",
  "Onboarding",
  "Users & RBAC",
  "Modules",
  "Assets",
  "Integrations",
  "Reporting",
  "Activity",
  "Support",
  "Danger Zone",
];

export default function BriBankStateOverview() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="flex gap-10 border-b mb-6 text-sm">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 transition ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="grid grid-cols-[360px_1fr] gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Client Details</h2>

            <TwoColRow
              left={{ label: "Client Name", value: "BRI Bank State" }}
              right={{ label: "Tenants ID", value: "amca-corp-prod" }}
            />

            <TwoColRow
              left={{ label: "Industry", value: "Technology" }}
              right={{
                label: "Region",
                value: (
                  <span className="flex items-center gap-2">
                    🇮🇳 <span>India</span>
                  </span>
                ),
              }}
            />

            <TwoColRow
              left={{ label: "SLA Tier", value: "Enterprise" }}
              right={{ label: "Created Date", value: "December 20, 2023" }}
            />

            <div className="mt-6">
              <div className="text-sm text-gray-500 mb-2">Environment</div>
              <div className="flex gap-3">
                <EnvPill text="Production" />
                <EnvPill text="UAT" />
              </div>
            </div>

            <hr className="my-6" />

            <h3 className="text-lg font-semibold mb-4">Contact & Ownership</h3>

            <SingleCol label="Client SPOC" value="Product@sarvagaya.com" />
            <SingleCol label="Internal Owner" value="admin@blackfench.io" />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6">Module Summary</h2>

            <div className="grid grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <ModuleCard key={i} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Users & RBAC" && <UsersRBAC />}

      {activeTab !== "Overview" && activeTab !== "Users & RBAC" && (
        <div className="bg-white rounded-xl p-10 text-gray-500 text-sm">
          {activeTab} content goes here.
        </div>
      )}
    </div>
  );
}

function TwoColRow({ left, right }) {
  return (
    <div className="grid grid-cols-2 gap-8 mb-5 text-sm">
      <div>
        <div className="text-gray-500 mb-1">{left.label}</div>
        <div className="font-medium text-gray-900">{left.value}</div>
      </div>

      <div>
        <div className="text-gray-500 mb-1">{right.label}</div>
        <div className="font-medium text-gray-900">{right.value}</div>
      </div>
    </div>
  );
}

function SingleCol({ label, value }) {
  return (
    <div className="mb-4 text-sm">
      <div className="text-gray-500 mb-1">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );
}

function EnvPill({ text }) {
  return (
    <span className="px-4 py-1.5 text-sm rounded-lg border border-blue-300 bg-blue-50 text-blue-700 font-medium">
      {text}
    </span>
  );
}

function ModuleCard() {
  return (
    <div className="border rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">Brand Fench</h3>
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
          Enabled
        </span>
      </div>

      <Metric label="Data Volume" value="4625" />
      <Metric label="Active Rule" value="25" />
      <Metric label="Takedown Queue" value="03" />
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex justify-between items-center bg-[#FAF7F5] rounded-lg px-4 py-3 mb-3">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-lg font-semibold text-gray-900">{value}</span>
    </div>
  );
}
