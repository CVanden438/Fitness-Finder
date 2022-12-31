import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
const header = () => {
  const { data } = useSession();
  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <img src="" alt="Logo" className="h-8" />
      <nav>
        <Link href="/" className="px-2 hover:underline">
          Home
        </Link>
        <Link href="/createclass" className="px-2 hover:underline">
          Create Class
        </Link>
        <Link href="/viewclasses" className="px-2 hover:underline">
          View Classes
        </Link>
        <Link href="/profile" className="px-2 hover:underline">
          Profile
        </Link>
      </nav>
      <button
        onClick={() => (data ? signOut() : signIn())}
        className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
        {data ? "Logout" : "Login"}
      </button>
    </header>
  );
};

export default header;
