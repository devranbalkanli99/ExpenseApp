export const groupByMonth = (expenses) => {
  const groupedData = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!groupedData[key]) {
      groupedData[key] = { income: 0, expense: 0 };
    }

    if (expense.type === "income") {
      groupedData[key].income += expense.price;
    } else {
      groupedData[key].expense += expense.price;
    }
  });

  return groupedData;
};

export const groupByYear = (expenses) => {
  const groupedData = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const year = date.getFullYear();
    const key = `${year}`;

    if (!groupedData[key]) {
      groupedData[key] = { income: 0, expense: 0 };
    }

    if (expense.type === "income") {
      groupedData[key].income += expense.price;
    } else {
      groupedData[key].expense += expense.price;
    }
  });

  return groupedData;
};

export const getChartData = (groupedData) => {
  const labels = Object.keys(groupedData);
  const incomeData = labels.map((label) => groupedData[label].income);
  const expenseData = labels.map((label) => groupedData[label].expense);

  return { labels, incomeData, expenseData };
};
