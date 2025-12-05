export default function IconButton({
  icon,
  label = "button",
  variant = "ghost",
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center rounded-md focus:outline-none";
  const variants = {
    ghost: "p-2 hover:bg-gray-100",
    solid: "p-2 bg-white shadow-sm",
  };
  return (
    <button
      aria-label={label}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {icon}
    </button>
  );
}
