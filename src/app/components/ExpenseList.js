"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ExpenseList = ({
  expenses,
  removeExpense,
  selectedCategory,
  showAddTransactionButton,
}) => {
  const router = useRouter();

  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <div className="w-full">
      {filteredExpenses.length === 0 ? (
        <div className="text-center text-gray-500 mt-5">
          <h3 className="text-xl">No expenses or income recorded yet.</h3>
          <p>Start by adding a new expense or income.</p>
          {showAddTransactionButton && (
            <button
              className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => router.push("/")}
            >
              Add Transaction
            </button>
          )}
        </div>
      ) : (
        <ul className="list-group w-full mt-3">
          {filteredExpenses.map((expense) => (
            <li
              key={expense.id}
              className={`list-group-item flex 
									justify-between
									items-center 
                  border 
                  border-gray-200
									${expense.type === "expense" ? "text-red-500" : "text-green-400"}`}
            >
              <div>
                <h4>
                  {expense.expenseName} - ${expense.price}
                </h4>
                <small className="!text-gray-400">{expense.date}</small>
              </div>
              <div>
                <button
                  className="text-white bg-red-700 p-2 rounded-md"
                  onClick={() => removeExpense(expense.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
