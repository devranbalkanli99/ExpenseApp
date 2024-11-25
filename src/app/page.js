"use client";
import React, { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import AddExpense from "./components/AddExpense";
import MonthlyAndYearlyReport from "./components/charts/MonthlyAndYearlyReport";
import Navbar from "./components/Navbar";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("expense");
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryLimits, setCategoryLimits] = useState({
    Food: 10000,
    Transport: 5000,
    Shopping: 7000,
  });
  const [alerts, setAlerts] = useState([]);

  const addExpense = () => {
    if (!expenseName.trim() || !price.trim() || !category) {
      alert("Please fill in all fields.");
      return;
    }

    const newExpense = {
      id: expenses.length + 1,
      expenseName,
      price: parseFloat(price),
      type,
      category,
      date,
    };

    setExpenses([...expenses, newExpense]);

    if (type === "expense") {
      setBalance(balance - parseFloat(price));
      setTotalExpense(totalExpense + parseFloat(price));
    } else {
      setBalance(balance + parseFloat(price));
      setTotalIncome(totalIncome + parseFloat(price));
    }

    checkCategoryLimit(category, parseFloat(price));

    setExpenseName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setDate(new Date().toLocaleDateString());
  };

  const checkCategoryLimit = (category, amount) => {
    const categorySpending =
      expenses
        .filter((expense) => expense.category === category)
        .reduce((acc, expense) => acc + expense.price, 0) + amount;

    const limit = categoryLimits[category];
    if (limit && categorySpending >= limit * 0.8 && categorySpending < limit) {
      setAlerts((prevAlerts) => [
        ...prevAlerts,
        `Warning: You have reached 80% of your budget for ${category}.`,
      ]);
    } else if (categorySpending >= limit) {
      setAlerts((prevAlerts) => [
        ...prevAlerts,
        `Alert: You have exceeded your budget for ${category}!`,
      ]);
    }
  };

  const removeExpense = (id) => {
    const expenseToRemove = expenses.find((expense) => expense.id === id);
    if (!expenseToRemove) return;

    setExpenses(expenses.filter((expense) => expense.id !== id));

    if (expenseToRemove.type === "expense") {
      setBalance(balance + expenseToRemove.price);
      setTotalExpense(totalExpense - expenseToRemove.price);
    } else {
      setBalance(balance - expenseToRemove.price);
      setTotalIncome(totalIncome - expenseToRemove.price);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-[1440px] bg-white mt-5 p-5 flex flex-col justify-center items-center mx-auto">
        <AddExpense
          description={description}
          setDescription={setDescription}
          expenseName={expenseName}
          setExpenseName={setExpenseName}
          price={price}
          setPrice={setPrice}
          date={date}
          setDate={setDate}
          type={type}
          setType={setType}
          balance={balance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          addExpense={addExpense}
          category={category}
          setCategory={setCategory}
        />

        <ExpenseList
          expenses={expenses}
          removeExpense={removeExpense}
          selectedCategory={selectedCategory}
        />

        {alerts.length > 0 && (
          <div className="text-red-500">
            <ul>
              {alerts.map((alert, index) => (
                <li key={index}>{alert}</li>
              ))}
            </ul>
          </div>
        )}

        <MonthlyAndYearlyReport expenses={expenses} />
      </div>
    </>
  );
}
