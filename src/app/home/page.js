"use client";
import Navbar from "../components/Navbar";
import AddExpense from "../components/AddExpense";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1440px] mx-auto p-4">
        <h2 className="text-center text-2xl font-bold">
          Welcome to Expense App
        </h2>
        <AddExpense />
      </div>
    </div>
  );
}
