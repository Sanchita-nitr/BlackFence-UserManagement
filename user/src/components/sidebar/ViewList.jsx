import { useState } from "react";
import { FaRegSquare } from "react-icons/fa6";
const items = {
  "Situation Board": "Top Priority",
  "Priority Actions": "High",
  "Follow up Task": "Medium",
};

const tagStyles = {
  "Top Priority": {
    border: "#BF5568",
    bg: "#FFD3DB57",
    text: "#BF5568",
  },
  High: {
    border: "#D88A28",
    bg: "#FFEBC5",
    text: "#B96B00",
  },
  Medium: {
    border: "#2874AE",
    bg: "#D9EAFE",
    text: "#1F4F73",
  },
  Low: {
    border: "#4CAF50",
    bg: "#DFF4E0",
    text: "#2E7D32",
  },
};

export default function RoleList() {
  const [selected, setSelected] = useState(null);

  return (
    <aside className="w-[290px] pr-6 h-full">
      <div className="bg-gradient-to-b from-[#FEFEFE] via-[#EDF0F4] to-[#FFFFFF] rounded-xl p-4 shadow-sm h-full overflow-auto">
        <h3 className="text-lg font-semibold mb-4 justify-center flex">
          Security Views
        </h3>

        <div className="space-y-3">
          {Object.entries(items).map(([label, tag], index) => {
            const styles = tagStyles[tag];
            const isSelected = selected === label;

            return (
              <div
                key={index}
                onClick={() => setSelected(isSelected ? null : label)}
                className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-[#A7B6CC] bg-gradient-to-r from-[#A7B6CC42] to-[#2997FF0A]"
                    : "border-[#DBDEE1] bg-[#F2F3F4]"
                }`}
              >
                <div className="flex flex-col">
                  <div className="text-sm font-medium">{label}</div>
                </div>

                <span
                  className="text-xs px-2 py-1 rounded-lg"
                  style={{
                    backgroundColor: styles.bg,
                    color: styles.text,
                    border: `1px solid ${styles.border}`,
                  }}
                >
                  {tag}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-6 space-y-2">
          <div className="text-sm font-medium text-slate-700">
            Display Option
          </div>

          <div className="p-4 border border-[#DBDEE1] bg-[#F2F3F4] rounded-lg flex items-center gap-3 cursor-pointer hover:bg-[#E9EAEB]">
            <FaRegSquare className="text-slate-700" size={18} />
            <span className="text-slate-800 text-sm font-medium flex justify-center">
              Compact View
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
