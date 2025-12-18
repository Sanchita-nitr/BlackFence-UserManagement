export default function MainLayout({ top, left, center, right }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-10 py-4">{top}</div>
      <div className="flex-1 px-10 pt-6">
        <div className="flex gap-6 h-full">
          <div className="w-[20%] max-w-[300px] min-w-[260px]">{left}</div>
          <div className="w-[60%] flex-1 min-w-0">{center}</div>
          <div className="w-[20%] max-w-[380px] min-w-[320px]">{right}</div>
        </div>
      </div>
    </div>
  );
}
