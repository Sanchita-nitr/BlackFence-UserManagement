export default function TableWrapper({ title, actions, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <div className="flex items-center gap-4">{actions}</div>
      </div>
      <div className="w-full overflow-x-auto rounded-lg">{children}</div>
    </div>
  );
}
