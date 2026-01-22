import { Download, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { CiSliderHorizontal } from "react-icons/ci";

export default function Support() {
  const notes = [
    {
      id: 1,
      tag: "Preference",
      tagStyle: "bg-blue-100 text-blue-700",
      text: "Client prefers weekly reports to be sent on friday at 5 pm EST. Executive summary should highlight high-severity threats only.",
      lastSync: "2025/09/14, 09 Am",
      addedBy: "admin@blackfench.io",
    },
    {
      id: 2,
      tag: "Known Issue",
      tagStyle: "bg-yellow-100 text-yellow-700",
      text: "Client prefers weekly reports to be sent on friday at 5 pm EST. Executive summary should highlight high-severity threats only.",
      lastSync: "2025/09/14, 09 Am",
      addedBy: "admin@blackfench.io",
    },
    {
      id: 3,
      tag: "Contract",
      tagStyle: "bg-purple-100 text-purple-700",
      text: "Client prefers weekly reports to be sent on friday at 5 pm EST. Executive summary should highlight high-severity threats only.",
      lastSync: "2025/09/14, 09 Am",
      addedBy: "admin@blackfench.io",
    },
  ];

  const attachments = [
    {
      name: "SOW_Beta_Inc_2024.pdf",
      uploaded: "20/01/2026",
      size: "3.4 MB",
    },
    {
      name: "SOW_Alpha_Ltd_2024.pdf",
      uploaded: "15/02/2026",
      size: "2.7 MB",
    },
    {
      name: "SOW_Gamma_Corp_2024.pdf",
      uploaded: "10/03/2026",
      size: "4.1 MB",
    },
    {
      name: "SOW_Beta_Inc_2024.pdf",
      uploaded: "20/01/2026",
      size: "3.4 MB",
    },
  ];

  return (
    <div className="min-h-screen space-y-8">
        <div className=" bg-white rounded-xl p-5 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Support & Operational Notes</h2>

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

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            <Plus className="w-4 h-4" />
            Add Note
          </button>

          <div className="text-sm text-gray-500 flex items-center gap-2">
            1-50 of 1,137
            <span className="text-lg cursor-pointer">‹</span>
            <span className="text-lg cursor-pointer">›</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 ">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-blue-50/40 border border-blue-200 rounded-xl p-5 shadow-sm shadow-blue-200 flex justify-between"
          >
            <div className="space-y-2">
              <span
                className={`inline-block px-3 py-1 text-xs rounded-full ${note.tagStyle}`}
              >
                {note.tag}
              </span>

              <p className="text-sm text-gray-800">{note.text}</p>

              <div className="text-sm text-gray-600">
                <div>
                  <span className="font-medium">Last Sync</span> :{" "}
                  {note.lastSync}
                </div>
                <div>
                  <span className="font-medium">Added By</span> : {note.addedBy}
                </div>
              </div>
            </div>

            <div className="flex gap-1.5">
              <button
                className="w-8 h-8 flex items-center justify-center
               border border-blue-300 rounded-md
               text-blue-600 hover:bg-blue-50 transition"
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                className="w-8 h-8 flex items-center justify-center
               border border-blue-300 rounded-md
               text-blue-600 hover:bg-blue-50 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
</div>
  
      <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Attachments</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            Upload File
          </button>
        </div>

        <div className="space-y-3">
          {attachments.map((file, idx) => (
            <div
              key={idx}
              className="bg-blue-50/40 border border-blue-200 shadow-sm shadow-blue-200 rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{file.name}</div>
                <div className="text-sm text-gray-600">
                  Uploaded on {file.uploaded} · {file.size}
                </div>
              </div>

              <button className="p-2 border border-blue-300 rounded-lg text-blue-600">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
