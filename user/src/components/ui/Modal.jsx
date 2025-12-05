import { useEffect } from "react";

export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-xl shadow-xl z-10 max-w-3xl w-full overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button
            aria-label="Close"
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="px-6 py-6">{footer}</div>}
      </div>
    </div>
  );
}
