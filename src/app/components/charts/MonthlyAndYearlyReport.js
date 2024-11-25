"use client";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { jsPDF } from "jspdf";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  groupByMonth,
  groupByYear,
  getChartData,
} from "../../helpers/MonthlyChartStructure.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MonthlyAndYearlyReport({ expenses }) {
  const [reportType, setReportType] = useState("monthly");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryLimits, setCategoryLimits] = useState({
    Food: 10000,
    Transport: 5000,
    Shopping: 7000,
  });

  const groupedData =
    reportType === "monthly" ? groupByMonth(expenses) : groupByYear(expenses);

  const { labels, incomeData, expenseData } = getChartData(groupedData);

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${
          reportType === "monthly" ? "Monthly" : "Yearly"
        } Income & Expense Report`,
      },
    },
  };

  const [alerts, setAlerts] = useState([]);

  const checkForData = () => {
    if (expenses.length === 0) {
      setAlerts(["Please add some income or expense to generate a report."]);
      return false;
    }
    setAlerts([]);
    return true;
  };

  const generatePDF = () => {
    if (!checkForData()) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Expense Report", 20, 20);

    let yPosition = 30;
    Object.keys(categoryLimits).forEach((category) => {
      doc.text(`${category}: $${categoryLimits[category]}`, 20, yPosition);
      yPosition += 10;
    });

    doc.save("expense-report.pdf");
  };

  return (
    <div className="mt-5 w-full">
      <div className="flex flex-row justify-between items-center gap-3 my-[50px]">
        <select
          className="bg-gray-100 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:bg-gray-200 transition duration-300 ease-in-out"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {Object.keys(categoryLimits).map((cat) => (
            <option
              key={cat}
              value={cat}
              className="bg-gray-50 text-gray-900 hover:bg-gray-100"
            >
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={generatePDF}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Download PDF Report
        </button>
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setReportType("monthly")}
          className={`px-4 py-2 rounded ${
            reportType === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Monthly Report
        </button>
        <button
          onClick={() => setReportType("yearly")}
          className={`px-4 py-2 rounded ${
            reportType === "yearly" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Yearly Report
        </button>
      </div>

      <Bar data={data} options={options} />
    </div>
  );
}
