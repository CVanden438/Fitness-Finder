import React, { useContext } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import HeaderDropdown from "./HeaderDropdown";
import { BsArrowBarRight } from "react-icons/bs";
import useScroll from "../hooks/useScroll";

const Header = () => {
  const { data: sesh } = useSession();
  const scrollY = useScroll();
  return (
    <header
      className={`sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-black/60 p-4 font-bold opacity-100 transition-all duration-500`}
    >
      <h1>
        <Link href="/" className="">
          Fitness Finder
        </Link>
      </h1>
      <nav className="hidden md:block">
        <Link
          href="/"
          className="border-r-2 border-yellow-400 px-2 hover:underline"
        >
          Home
        </Link>
        <Link
          href="/createclass"
          className="border-r-2 border-yellow-400 px-2 hover:underline"
        >
          Create Class
        </Link>
        <Link
          href="/viewclasses"
          className="border-r-2 border-yellow-400 px-2 hover:underline"
        >
          View Classes
        </Link>
        <Link
          href="/instructor"
          className={`${
            sesh && "border-r-2 border-yellow-400"
          } px-2 hover:underline`}
        >
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
        className="rounded-full bg-slate-800 py-2 px-4 font-bold outline outline-2 hover:outline-4"
      >
        {sesh ? "Logout" : "Login"}
      </button>
    </header>
  );
};

export default Header;
