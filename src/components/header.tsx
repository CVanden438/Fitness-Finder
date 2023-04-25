import React, { useContext } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import HeaderDropdown from "./HeaderDropdown";
import { BsArrowBarRight } from "react-icons/bs";

const Header = () => {
  const { data: sesh } = useSession();
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-black bg-slate-100 p-4 font-bold">
      {/* <img src="" alt="Logo" className="h-8" /> */}
      <Link href="/">
        <p className="text-lg font-bold">Fitness Finder</p>
      </Link>
      <nav className="hidden md:block">
        <Link href="/" className="px-2 hover:underline">
          Home
        </Link>
        <Link href="/createclass" className="px-2 hover:underline">
          Create Class
        </Link>
        <Link href="/viewclasses" className="px-2 hover:underline">
          View Classes
        </Link>
        <Link href="/instructor" className="px-2 hover:underline">
          Instuctors
        </Link>
        {sesh && (
          <Link href="/profile" className="px-2 hover:underline">
            Profile
          </Link>
        )}
      </nav>
      <div className="md:hidden">
        <HeaderDropdown />
      </div>
      <button
        onClick={() => (sesh ? signOut() : signIn())}
        className="rounded-full border border-black bg-slate-600 py-2 px-4 font-bold text-white hover:bg-red-700"
      >
        {sesh ? "Logout" : "Login"}
      </button>
    </header>
  );
};

export default Header;
