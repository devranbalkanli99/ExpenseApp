"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between max-w-[1440px] mx-auto">
        <h1 className="text-lg font-bold">Expense App</h1>
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
