import { X, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

export default function UploadModal({ onClose, onUpload }) {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (selectedFiles) => {
    setFiles(Array.from(selectedFiles));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleUpload = () => {
    if (!files.length) return;

    const payload = new FormData();
    files.forEach((file) => payload.append("files", file));

    onUpload?.(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[760px] rounded-2xl p-8 shadow-xl relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Upload</h2>
          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className={`border-2 border-dashed rounded-2xl h-[300px] flex flex-col items-center justify-center cursor-pointer transition
            ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50"
            }
          `}
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 text-white mb-4">
            <UploadCloud />
          </div>
          <p className="text-gray-900 font-medium">
            Drag & Drop to upload files or{" "}
            <span className="text-blue-600 font-semibold">Browse</span>
          </p>

          {files.length > 0 && (
            <p className="mt-4 text-sm text-gray-500">
              {files.length} file(s) selected
            </p>
          )}

          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleUpload}
          disabled={!files.length}
          className={`w-full mt-10 py-4 rounded-xl text-lg font-semibold transition
            ${
              files.length
                ? "bg-[#3766C3] text-white hover:bg-[#2f56a5]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
