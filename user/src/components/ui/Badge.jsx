export default function Badge({ value, tone = "muted", className = "" }) {
  const tones = {
    success: "text-green-600",
    muted: "text-gray-600",
    warning: "text-amber-600",
  };
  const dot = {
    success: "bg-green-500",
    muted: "bg-gray-300",
    warning: "bg-amber-400",
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span className={`w-2.5 h-2.5 rounded-full ${dot[tone]} inline-block`} />
      <span className={`text-sm ${tones[tone]}`}>{value}</span>
    </div>
  );
}
