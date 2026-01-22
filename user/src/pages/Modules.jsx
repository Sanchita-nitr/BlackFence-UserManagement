import { useState } from "react";

export default function Modules() {
  const [activeTab, setActiveTab] = useState("BrandFench");

  const [moduleStatus, setModuleStatus] = useState({
    BrandFench: true,
    BreachFench: true,
    BotFench: true,
    PerimeterFench: true,
  });

  const [featureStatus, setFeatureStatus] = useState({
    "AI Insights": true,
    "Auto Clustering": true,
    "Auto Dedup": true,
  });

  const products = Object.keys(moduleStatus);
  const features = Object.keys(featureStatus);

  const toggleModule = (name) =>
    setModuleStatus((prev) => ({ ...prev, [name]: !prev[name] }));

  const toggleFeature = (name) =>
    setFeatureStatus((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {products.map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item}</h3>
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                  moduleStatus[item]
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {moduleStatus[item] ? "Enabled" : "Disabled"}
              </span>
            </div>

            <Toggle
              enabled={moduleStatus[item]}
              onClick={() => toggleModule(item)}
            />
          </div>
        ))}
      </div>


      <div className="bg-white rounded-xl shadow-sm p-6">
   
        <div className="flex border rounded-lg w-fit overflow-hidden mb-6">
          {products.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div>
            <h4 className="font-semibold mb-4">Data Management</h4>

            <label className="block text-sm text-gray-600 mb-1">
              Data Retention (Days)
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-sm mb-4"
              placeholder="Enter the days"
            />

            <label className="block text-sm text-gray-600 mb-1">
              Ingestion Frequency
            </label>
            <select className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-sm">
              <option>Every 15 minutes</option>
              <option>Every 30 minutes</option>
              <option>Hourly</option>
            </select>
          </div>

  
          <div>
            <h4 className="font-semibold mb-4">Limits</h4>

            {[
              "Max Assets",
              "Max User",
              "Max Exports Per Day",
              "Max API Calls Per Day",
            ].map((label) => (
              <div key={label} className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">
                  {label}
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-sm"
                  placeholder={`Number of ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>

       
        <div className="mt-8">
          <h4 className="font-semibold mb-4">Feature Flags</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h5 className="font-medium">{feature}</h5>
                  <p className="text-sm text-gray-500">
                    Enable AI-powered Threat Analysis
                  </p>
                </div>

                <Toggle
                  enabled={featureStatus[feature]}
                  onClick={() => toggleFeature(feature)}
                />
              </div>
            ))}
          </div>
        </div>


        <div className="flex justify-end mt-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}


function Toggle({ enabled, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
