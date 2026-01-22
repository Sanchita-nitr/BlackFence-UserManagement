export default function ReportSettings() {
  const Toggle = ({ enabled = true }) => (
    <div
      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transition ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </div>
  );

  const TemplateCard = ({ title, count, items }) => (
    <div className="bg-gray-50 border rounded-xl space-y-3 p-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold ">{title}</h4>
        <span className="text-xs px-3 py-1 rounded-full border text-blue-600 bg-blue-50">
          {count} Templates
        </span>
      </div>

      {items.map((item) => (
        <div key={item} className="flex justify-between items-center text-sm">
          <span className="text-gray-600">{item}</span>
          <button className="text-black font-medium hover:underline">
            Configure
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          <div className="space-y-4">
            <h3 className="font-semibold">Global Settings</h3>

            {[
              {
                title: "Weekly Client Deck",
                desc: "Auto generate weekly summary reports",
              },
              {
                title: "Watermark Exports",
                desc: "Add client watermark to all reports",
              },
              {
                title: "Export Restrictions",
                desc: "Limit exports to authorized roles only",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <Toggle enabled />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Rate Limits</h3>

            <div>
              <label className="text-sm font-medium">
                Max Exports Per Day (per user)
              </label>
              <input
                placeholder="Number of exports"
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Report Retention (days)
              </label>
              <input
                placeholder="Number of days"
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Default Export Format
              </label>
              <select className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50">
                <option>Select format type</option>
                <option>PDF</option>
                <option>CSV</option>
                <option>XLSX</option>
              </select>
            </div>
          </div>
        </div>

        {/* Templates */}
        <div>
          <h3 className="font-semibold mb-4">Report Templates by Module</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TemplateCard
              title="BrandFence Reports"
              count={4}
              items={[
                "Executive Summary",
                "Threat Intelligence",
                "Takedown Report",
                "AI Insights",
              ]}
            />

            <TemplateCard
              title="BreachFence Reports"
              count={3}
              items={[
                "Breach Summary",
                "Credential Exposure",
                "Dark Web Monitoring",
              ]}
            />

            <TemplateCard
              title="BotFence Reports"
              count={2}
              items={["Bot Activity", "Attack Patterns"]}
            />

            <TemplateCard
              title="PerimeterFence Reports"
              count={3}
              items={[
                "Attack Surface",
                "Vulnerability Scan",
                "Security Posture",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
