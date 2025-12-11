import Badge from "../ui/Badge";

export default function CommandCard({ item = false }) {
  const gradientMap = {
    Critical: "from-red-50 to-red-100/50",
    High: "from-orange-50 to-orange-100/50",
    Medium: "from-yellow-50 to-yellow-100/50",
    Low: "from-green-50 to-green-100/50",
  };

  const bgGradient =
    gradientMap[item.priority] || "from-gray-50 to-gray-100/50";
  const borderColorMap = {
    Critical: "border-red-300",
    High: "border-orange-300",
    Medium: "border-yellow-300",
    Low: "border-green-300",
  };

  const borderColor = borderColorMap[item.priority] || "border-gray-300";
  const buttonColorMap = {
    Critical: "bg-red-50 border-red-300 text-red-600 hover:bg-red-100",
    High: "bg-orange-50 border-orange-300 text-orange-600 hover:bg-orange-100",
    Medium:
      "bg-yellow-50 border-yellow-300 text-yellow-600 hover:bg-yellow-100",
    Low: "bg-green-50 border-green-300 text-green-600 hover:bg-green-100",
  };

  const buttonColor =
    buttonColorMap[item.priority] || "bg-gray-50 border-gray-300 text-gray-600";

  return (
    <div className="h-full">
      <div
        className={`rounded-2xl border w-full h-full p-4 transition-shadow duration-200 flex flex-col justify-between bg-gradient-to-br ${bgGradient} ${borderColor}`}
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

              <div className="gap-4 mt-3 ml-2 flex space-x-2 text-sm text-gray-600">
                <li>{item.label1}</li>
                <li>{item.label2}</li>
                <li>{item.label3}</li>
                
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-snug mt-2 flex-1">
            {item.summary} <span className="text-gray-500">{item.date}</span>
          </p>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {item.actions.slice(0, 3).map((a, idx) => (
              <button
                key={idx}
                className={`rounded-lg text-sm px-3 py-1.5 border font-medium transition-colors ${buttonColor}`}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="w-full h-2 mt-4 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 mb-4"></div>
        </div>
      </div>
    </div>
  );
}
