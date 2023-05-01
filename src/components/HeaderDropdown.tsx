import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const links = {
  "/": "Home",
  "/creatclass": "Create Class",
  "/viewclasses": "View Classes",
  "/instructors": "Instructos",
  "/profile": "Profile",
};
const HeaderDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: sesh } = useSession();
  return (
    <div className="">
      <button
        className="flex h-10 w-10 items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu size={20} />
      </button>
      {isOpen && (
        <nav className="absolute left-0 mt-2 flex w-full flex-col bg-slate-200">
          <Link
            href="/"
            className="w-full px-2 text-center hover:bg-slate-400 hover:underline"
          >
            Home
          </Link>
          <Link
            href="/createclass"
            className="w-full px-2 text-center hover:bg-slate-400 hover:underline"
          >
            Create Class
          </Link>
          <Link
            href="/viewclasses"
            className="w-full px-2 text-center hover:bg-slate-400 hover:underline"
          >
            View Classes
          </Link>
          <Link
            href="/instructor"
            className="w-full px-2 text-center hover:bg-slate-400 hover:underline"
          >
            Instuctors
          </Link>
          {sesh && (
            <Link
              href="/profile"
              className="w-full px-2 text-center hover:bg-slate-400 hover:underline"
            >
              Profile
            </Link>
          )}
        </nav>
      )}
    </div>
  );
};

export default HeaderDropdown;
