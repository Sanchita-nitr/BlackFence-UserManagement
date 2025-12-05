import { useEffect, useRef, useState } from "react";

export default function DropDownMenu({
  onClose,
  anchor,
  items = [],
  align = "right",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <div onClick={() => setOpen((s) => !s)}>{anchor}</div>

      {open && (
        <div
          className={`absolute top-full mt-2 min-w-[200px] bg-white rounded-lg shadow-lg p-2 z-50 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="flex items-center justify-between px-2 py-2">
            <div className="text-xs text-gray-500">Select</div>
            <button
              aria-label="Close"
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              ✕
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {items.map((it, idx) => (
              <button
                key={idx}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-3 text-sm"
                onClick={() => {
                  it.onClick?.();
                  setOpen(false);
                }}
                type="button"
              >
                {it.icon && (
                  <span className="w-4 h-4 text-gray-500">{it.icon}</span>
                )}
                <span>{it.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
