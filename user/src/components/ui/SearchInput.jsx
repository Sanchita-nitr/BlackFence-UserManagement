import { IoSearchOutline } from "react-icons/io5";
export default function SearchInput({
  value = "",
  onChange = () => {},
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div
      className={`flex items-center bg-white border border-gray-200 rounded-lg px-3 h-10 ${className}`}
    >
      <IoSearchOutline className="w-4 h-4 text-gray-400 mr-2" />
      <input
        className="flex-1 text-sm placeholder-gray-400 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
