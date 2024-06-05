import { Link } from "react-router-dom";

export default function SidebarItem({ to, text, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center justify-start py-4 pl-16 nav-item ${
        active ? "text-custom-coklat pl-11 " : "text-white opacity-75 hover:opacity-100"
      }`}
    > 

      <div
        className={`flex justify-start items-center ${
          active ? "bg-white  text-custom-coklat h-10 w-auto px-4 rounded-full" : ""
        }`}
        >
        {text}
      </div>
    </Link>
  );
}
