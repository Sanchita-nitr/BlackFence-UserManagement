import Badge from "../ui/Badge";

export default function StatusCard({ item, selected = false }) {
  return (
    <div className="h-full">
      <div
        className={`rounded-2xl border w-full h-full p-4 transition-shadow duration-200 flex flex-col justify-between ${
          selected
            ? "shadow-lg border-white bg-gradient-to-br from-white to-[#F2F7FF]"
            : "hover:shadow soft-shadow border-[#D6D6D6] bg-[#E2E2E285]"
        }`}
        aria-selected={selected}
      >
        <div className="flex items-start justify-between mb-3 gap-6">
          <div className="flex flex-col min-w-0 flex-1">
            <h4 className="text-base font-semibold text-slate-900 break-words">
              {item.title}{" "}
              <span className="text-sm text-gray-500 font-semibold">
                {item.subtitle}
              </span>
            </h4>
            <div className="flex items-center gap-4 mt-3">
              <div className="text-xs text-gray-500">{item.date}</div>

              <div className="py-1 px-3 rounded-md bg-white hover:bg-blue-50 hover:text-blue-900 text-sm text-gray-600">
                {item.org}
              </div>
              <div>
                <Badge
                  className="py-1 px-3 text-blue-900"
                  value={item.priority}
                  variant="priority"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-slate-700 leading-snug">
            {item.summary}{" "}
            <a className="text-blue-600 underline ml-1" href="#why">
              Why This Matters
            </a>
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {item.actions.slice(0, 3).map((a, idx) => (
              <button
                key={idx}
                className="rounded-md text-sm px-3 py-1.5 bg-white border border-blue-200 text-blue-600"
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
