import { TbCameraCancel } from "react-icons/tb";

function SmallHeading({ children }) {
  return <div className="text-sm text-gray-500 font-medium">{children}</div>;
}

export default function DeepDive({ selected }) {
  if (!selected) {
    return (
      <aside className="w-96 pl-6 h-full">
        <div className="bg-[#F8F9FC] rounded-xl h-full p-6 soft-shadow">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Deep Dive</h2>

          <div className="flex items-center justify-center h-full">
            <div className="text-center text-slate-900 space-y-4">
              <div className="w-20 h-20 mx-auto flex items-center justify-center bg-[#ECF4FF] rounded-full border border-[#DCE9FF]">
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
  const domain = selected.domain || "Adidas.io";
  const registered = selected.registered || "10/02/2025";
  const firstSeenDate = selected.firstSeenDate || "10/02/2025";
  const firstSeenTime = selected.firstSeenTime || "12:00 PM";
  const asn = selected.asn || "AS46SB";
  const evidence = selected.evidence || [
    "Historical DNS Matching",
    "Historical DNS Matching",
    "Historical DNS Matching",
  ];

  return (
    <aside className="w-96 pl-6 h-full">
      <div className="bg-white rounded-xl h-full p-6 soft-shadow flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-slate-900">Deep Dive</h3>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <SmallHeading>App Name</SmallHeading>
            <div className="mt-2 text-base font-semibold text-slate-900">
             Prioritize phishing domains this week - spike of 40% from same registrar
            </div>
          </div>

          <hr className="border-t border-gray-200 my-2" />

          <div>
            <SmallHeading>Domain Details</SmallHeading>
            <div className="mt-3 grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-28 text-sm text-gray-500">Domain Name</div>
                <div className="text-sm font-medium text-slate-900">{domain}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-28 text-sm text-gray-500">Registered</div>
                <div className="text-sm font-medium text-slate-900">
                  {registered}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-28 text-sm text-gray-500">First Seen</div>
                <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                  <span>{firstSeenDate}</span>
                  <span className="mx-0.5">•</span>
                  <span>{firstSeenTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-28 text-sm text-gray-500">ASN</div>
                <div className="text-sm font-medium text-slate-900">{asn}</div>
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-200 my-2" />
          <div>
            <SmallHeading>Evidence</SmallHeading>
            <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-slate-900">
              {evidence.map((e, i) => (
                <li key={i} className="break-words">
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <div className="h-8" />
        </div>
      </div>
    </aside>
  );
}
