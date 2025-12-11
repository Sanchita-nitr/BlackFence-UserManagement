export default function Badge({
  value,
  tone = "muted",
  className = "",
  variant = "dot",
}) {
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

  const priorityStyles = {
    Critical: "bg-red-500 text-white",
    High: "bg-[#FFEDF1] text-white",
    Medium: "bg-yellow-500 text-white",
    Low: "bg-[#B1FDB1] text-white",
  };

  if (variant === "priority") {
    return (
      <span
        className={`inline-block rounded-md text-sm font-medium ${
          priorityStyles[value] || "bg-gray-300 text-gray-700"
        } ${className}`}
      >
        {value}
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span className={`w-2.5 h-2.5 rounded-full ${dot[tone]} inline-block`} />
      <span className={`text-sm ${tones[tone]}`}>{value}</span>
    </div>
  );
}
