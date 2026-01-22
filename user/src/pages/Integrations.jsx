import {
  Lock,
  Mail,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Shield,
  X,
} from "lucide-react";
import { useState } from "react";
import { CiSliderHorizontal } from "react-icons/ci";
import { GrRotateRight } from "react-icons/gr";

export default function Integrations() {
  const [showModal, setShowModal] = useState(false);

  const integrations = [
    {
      name: "Mail Notifications",
      type: "Mail",
      lastSync: "2025/09/14, 09 Am",
      tags: ["critical_threat", "weekly_report", "takedown_request"],
      icon: <Mail className="text-blue-600" />,
    },
    {
      name: "SAML SSO",
      type: "SSO",
      lastSync: "2025/09/14, 09 Am",
      tags: ["user_login", "user_logout"],
      icon: <Lock className="text-blue-600" />,
    },
    {
      name: "Splunk SIEM",
      type: "SEIM",
      lastSync: "2025/09/14, 09 Am",
      tags: ["critical_threat", "high_severity_alert"],
      icon: <Shield className="text-blue-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <GrRotateRight className="text-gray-500 cursor-pointer w-4 h-4" />

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              placeholder="Search by Keywords"
              className="pl-9 pr-4 py-2 rounded-lg bg-gray-100 text-sm outline-none"
            />
          </div>

          <button className="border p-2 rounded-lg text-blue-600">
            <CiSliderHorizontal className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Integration
          </button>

          <div className="text-sm text-gray-500 flex items-center gap-2">
            1-50 of 1,137
            <span className="text-lg cursor-pointer">‹</span>
            <span className="text-lg cursor-pointer">›</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {integrations.map((item) => (
          <div
            key={item.name}
            className="bg-blue-50/40 border border-blue-200 shadow-sm shadow-blue-200 rounded-xl p-5 flex justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                {item.icon}
                <h3 className="font-semibold">{item.name}</h3>
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                  Active
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  <span className="font-medium">Type</span> : {item.type}
                </div>
                <div>
                  <span className="font-medium">Last Sync</span> :{" "}
                  {item.lastSync}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full border border-blue-300 text-blue-600 bg-blue-50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2">
              <button className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg text-sm">
                Test
              </button>
              <button className="p-2 border border-blue-300 rounded-lg text-blue-600">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button className="p-2 border border-blue-300 rounded-lg text-blue-600">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add New Integration</h2>
              <X
                className="cursor-pointer"
                onClick={() => setShowModal(false)}
              />
            </div>

            <div className="space-y-4">
              <div>
                <div className="font-medium mb-2">Integration Type</div>
                <select className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50">
                  <option>Select the type</option>
                  <option>Mail</option>
                  <option>SSO</option>
                  <option>SIEM</option>
                </select>
              </div>

              <div>
                <div className="font-medium mb-2">Integration Name</div>
                <input
                  placeholder="Enter the Name"
                  className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>

              <div>
                <div className="font-medium mb-2">
                  Configuration URL / Endpoint
                </div>
                <input
                  placeholder="Enter the URL/endpoint"
                  className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>

              <div>
                <div className="font-medium mb-2">API Key / Secret</div>
                <input
                  placeholder="Enter the API key / Secret"
                  className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>

              <div>
                <label className="font-medium block mb-2">
                  Event Types to Send
                </label>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Critical Threats",
                    "Takedown Status",
                    "Weekly Reports",
                    "Ingestion Failures",
                  ].map((label) => (
                    <ToggleRow key={label} label={label} />
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl text-lg">
                  Save Integration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToggleRow({ label }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-12 h-6 rounded-full transition ${
          enabled ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 bg-white rounded-full transition ${
            enabled ? "right-1" : "left-1"
          }`}
        />
      </button>
      <span className="font-medium">{label}</span>
    </div>
  );
}
