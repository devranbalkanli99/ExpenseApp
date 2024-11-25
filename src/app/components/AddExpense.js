"use client";
import React from "react";

const AddExpense = ({
  expenseName,
  setExpenseName,
  description,
  setDescription,
  price,
  setPrice,
  date,
  setDate,
  type,
  setType,
  balance,
  totalIncome,
  totalExpense,
  addExpense,
  category,
  setCategory,
}) => {
  return (
    <>
      <div className="flex flex-col text-center">
        <h3 className="text-center">
          Balance: <b className="text-dark">${balance.toFixed(2)}</b>
        </h3>
        <div className="flex flex-row justify-center items-center gap-3 mb-3">
          <h3>
            Income{" "}
            <span className="text-green-400">${totalIncome.toFixed(2)}</span>
          </h3>
          <h3>
            Expense{" "}
            <span className="text-red-500">${totalExpense.toFixed(2)}</span>
          </h3>
        </div>
      </div>

      <div className="mb-3 flex flex-col gap-[20px]">
        <input
          type="text"
          className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        <textarea
          className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-[100px]"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          type="number"
          className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Price"
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="date"
          className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <select
          className="w-full bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>

        <button
          className="text-white bg-blue-700 rounded-lg text-[14px] w-full px-4 py-2 hover:bg-blue-800 transition duration-300 ease-in-out"
          onClick={addExpense}
        >
          Add Transaction
        </button>
      </div>
    </>
  );
};

export default AddExpense;
