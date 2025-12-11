export default function MainLayout({ top, left, center, right }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-10 py-4">{top}</div>

      <div className="pt-6 flex-1">
        <div className="grid grid-cols-12 gap-6 items-start px-10">
          <div className="col-span-3 h-full flex flex-col">{left}</div>
          <div className="col-span-6 h-full flex flex-col">{center}</div>
          <div className="col-span-3 h-full flex flex-col">{right}</div>
        </div>
      </div>
    </div>
  );
}
