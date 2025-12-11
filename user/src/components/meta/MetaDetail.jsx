import { TbCameraCancel } from "react-icons/tb";
import Button from "../ui/Button";
function KeyValue({ label, value }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm font-medium text-slate-900 break-words">
        {value}
      </div>
    </div>
  );
}

function Sparkline({ points = [40, 60, 35, 80, 40, 70, 55] }) {
  const w = 240;
  const h = 80;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);

  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const midIndex = Math.floor(points.length / 2);
  const midX = midIndex * step;
  const midY = h - ((points[midIndex] - min) / range) * h;

  return (
    <div className="rounded-md p-3">
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="block"
      >
        <path
          d={path}
          fill="none"
          stroke="#2563EB"
          strokeWidth="2"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
        <circle cx={midX} cy={midY} r="4" fill="#2563EB" />
        <g transform={`translate(${midX - 22}, ${midY - 28})`}>
          <rect
            x="0"
            y="0"
            rx="8"
            ry="8"
            width="44"
            height="28"
            fill="#fff"
            stroke="#e6eefc"
          />
          <text
            x="22"
            y="18"
            fill="#111827"
            fontSize="12"
            fontWeight="700"
            textAnchor="middle"
          >
            {points[midIndex]}
          </text>
        </g>
      </svg>

      <div className="mt-3 text-xs text-gray-500 flex items-center justify-between px-1">
        <div className="flex gap-3">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
}

export default function MetaDetail({ selected }) {
  if (!selected) {
    return (
      <aside className="w-96 pl-6 h-full">
        <div className="bg-[#F8F9FC] rounded-xl h-full p-6 soft-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Meta Detail
          </h2>
          <div className=" flex items-center justify-center">
            <div className="text-center text-black space-y-4">
              <div className="w-20 h-20 mx-auto flex items-center justify-center bg-[#ECF4FF] rounded-full border">
                <TbCameraCancel className="text-4xl text-[#1E64C8]" />
              </div>

              <div className="text-lg font-semibold">
                For Meta data, select the card
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-96 pl-6 h-full">
      <div className="bg-white rounded-xl h-full p-6 soft-shadow flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold">Meta Detail</h3>
          <Button
            variant="solid"
            onClick={() => alert("Request takedown triggered")}
            className="whitespace-nowrap bg-[#1E64C8]"
          >
            Request Takedown
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <KeyValue label="App Name" value={"BRINSmobile"} />
          <KeyValue
            label="Package Name"
            value={"customer.brinsmobile.brins.my.com.infoconnect.hswuu.doiwur"}
          />
          <KeyValue
            label="Download Link"
            value={
              <a
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-sm"
                href="#url"
              >
                URL
              </a>
            }
          />

          <div>
            <div className="text-xs text-gray-500 mb-2">Indicators</div>
            <div className="flex items-center gap-2 space-x-4 ">
              <div className=" bg-[#ECF4FF] py-1.5 px-3 rounded-lg border border-[#1E64C8] text-[#1E64C8]">
                {" "}
                Brand Name Misuse
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-[#BCBCBC] text-sm font-semibold text-slate-800">
                Logo Match
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-[#E4E5E55E] p-4 rounded-lg">
          <div className="mb-2 text-sm font-medium ">Trend</div>
          <Sparkline points={[120, 240, 180, 574, 220, 340, 280]} />
        </div>
      </div>
    </aside>
  );
}
