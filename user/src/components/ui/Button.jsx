import React from "react";

export default function Button({ children, variant = "primary", size = "md", className = "", ...rest }) {
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const variants = {
    primary:
      "text-white rounded-lg bg-gradient-to-b from-blue-500 to-blue-600 shadow-md hover:from-blue-600 hover:to-blue-700",
    solid: "bg-blue-600 text-white rounded-lg hover:bg-blue-700",
    ghost: "bg-white border border-gray-200 text-slate-700 rounded-lg hover:bg-gray-50",
    outlineBlue: "bg-white text-blue-600 border border-blue-200 rounded-lg",
    pill: "bg-white text-slate-700 border border-gray-200 rounded-full px-4 py-2",
    danger: "bg-rose-400 text-white rounded-lg hover:bg-rose-500",
    success: "bg-green-400 text-white rounded-lg hover:bg-green-500",
    warning: "bg-yellow-400 text-white rounded-lg hover:bg-yellow-500",
    info: "bg-cyan-400 text-white rounded-lg hover:bg-cyan-500",
    light: "bg-gray-100 text-slate-700 rounded-lg hover:bg-gray-200",
    dark: "bg-slate-700 text-white rounded-lg hover:bg-slate-800",
    link: "text-slate-700 underline-offset-4 hover:underline",
  };

  return (
    <button className={`${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className} inline-flex items-center justify-center font-medium`} {...rest}>
      {children}
    </button>
  );
}
