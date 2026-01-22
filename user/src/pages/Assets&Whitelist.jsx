import { useState } from "react";
import Assets from "./Assets";
import Whitelist from "./Whitelist";

const SUB_TABS = [
  { id: "assets", label: "Assets" },
  { id: "whitelist", label: "Whitelist" },
];

export default function AssetsAndWhitelist() {
  const [activeSubTab, setActiveSubTab] = useState("assets");

  return (
    <div className="p-8">
      <div className="">
        <div className="flex items-center gap-10">
          {SUB_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`pb-1 ${
                activeSubTab === tab.id
                  ? "text-blue-600 font-medium border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeSubTab === "assets" ? <Assets /> : <Whitelist />}
      </div>
    </div>
  );
}
