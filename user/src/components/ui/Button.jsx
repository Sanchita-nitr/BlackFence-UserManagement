export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-shadow focus:outline-none";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };
  const variants = {
    primary: "bg-blue-600 text-white shadow-sm hover:bg-blue-700",
    ghost: "bg-white border border-gray-200 text-slate-700 hover:bg-gray-50",
    danger: "bg-rose-400 text-white hover:bg-rose-500",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
