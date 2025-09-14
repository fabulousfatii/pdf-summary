

import React, { JSX } from "react";
import { Home, User, Settings } from "lucide-react"; // lucide-react for icons

type NavItem = {
  name: string;
  icon: JSX.Element;
};

const navItems: NavItem[] = [
  { name: "Home", icon: <Home size={24} /> },
  { name: "Profile", icon: <User size={24} /> },
  { name: "Settings", icon: <Settings size={24} /> },
];

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center md:items-start p-4 w-20 md:w-20 lg:w-64 transition-all duration-300">
      <h1 className="text-xl font-bold mb-6 hidden lg:block">MyApp</h1>
      <nav className="flex flex-col gap-4 w-full">
        {navItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            {item.icon}
            <span className="hidden lg:block">{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
