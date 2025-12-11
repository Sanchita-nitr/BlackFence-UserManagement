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
    Critical: "bg-red-100 text-red-600 border border-red-300",
    High: "bg-orange-100 text-orange-600 border border-orange-300",
    Medium: "bg-yellow-100 text-yellow-600 border border-yellow-300",
    Low: "bg-green-100 text-green-600 border border-green-300",
  };

  if (variant === "priority") {
    return (
      <span
        className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
          priorityStyles[value] ||
          "bg-gray-100 text-gray-700 border border-gray-300"
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
