import Badge from "../ui/Badge";

export default function CommandCard({ item = {}, selected = false }) {
  const gradientMap = {
    Critical: "from-red-200/40 ",
    High: "from-orange-200/40 ",
    Medium: "from-yellow-200/40",
    Low: "from-green-50 ",
  };
  const bgGradient =
    gradientMap[item.priority] || "from-gray-50 to-gray-100/50";
  const borderColor ="border-gray-300";
  const actionColorMap = {
    "DMCA TakeDown":
      "bg-red-50 border-[#FB0036] text-[#FB0036] hover:bg-[#FB0036]/20",
    "Block DNS":
      "bg-[#FB0036]/10 border-[#FB0036] text-[#FB0036] hover:bg-[#FB0036]/20",
    "Notify PR":
      "bg-yellow-50 border-[#C49F0D] text-[#C49F0D] hover:bg-[#C49F0D]/20",
    "Escalate CS":
      "bg-[#1E64C8]/10 border-[#1E64C8] text-[#1E64C8] hover:bg-[#1E64C8]/20",
  };

  const defaultButton =
    "bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100";

  return (
    <div className="h-full">
      <div
        className={`rounded-2xl border w-full h-full p-4 flex flex-col justify-between transition-shadow bg-gradient-to-br ${bgGradient} ${borderColor} ${
          selected ? "shadow-lg ring-2 ring-blue-400" : ""
        }`}
      >
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3 gap-6">
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-base font-semibold text-slate-900 break-words">
                  {item.title}
                </h4>
                <Badge
                  className="py-1 px-3 flex-shrink-0"
                  value={item.priority}
                  variant="priority"
                />
              </div>

              <ul className="flex gap-4 mt-3 ml-2 text-sm text-gray-600 list-disc list-inside">
                <li>{item.label1}</li>
                <li>{item.label2}</li>
                <li>{item.label3}</li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-slate-700 mt-2 flex-1">
            {item.summary}{" "}
            <span className="text-gray-500">{item.date}</span>
          </p>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {item.actions?.slice(0, 3).map((action, idx) => (
              <button
                key={idx}
                className={`rounded-lg text-sm px-3 py-1.5 border font-medium transition-colors ${
                  actionColorMap[action] || defaultButton
                }`}
              >
                {action}
              </button>
            ))}
          </div>

       <div className="w-full h-3 mt-4 mb-4 rounded-full bg-white overflow-hidden">
  <div
    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"
    style={{ width: "70%" }}
  />
</div>

        </div>
      </div>
    </div>
  );
}
