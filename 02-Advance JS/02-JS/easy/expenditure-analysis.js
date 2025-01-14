function calculateTotalSpentByCategory(transactions) {
  const categoryTotals = {};

  for (const transaction of transactions) {
    const { category, price } = transaction;

    if (category in categoryTotals) {
      categoryTotals[category] += price;
    } else {
      categoryTotals[category] = price;
    }
  }

  return Object.keys(categoryTotals).map((category) => ({
    category,
    totalSpent: categoryTotals[category],
  }));
}

module.exports = calculateTotalSpentByCategory;

// const transactions = [
//   {
//     id: 1,
//     timestamp: 1656076800000,
//     price: 10,
//     category: "Food",
//     itemName: "Pizza",
//   },
//   {
//     id: 2,
//     timestamp: 1656076800000,
//     price: 20,
//     category: "Electronics",
//     itemName: "Headphones",
//   },
//   {
//     id: 3,
//     timestamp: 1656076800000,
//     price: 5,
//     category: "Food",
//     itemName: "Burger",
//   },
// ];

// console.log(calculateTotalSpentByCategory(transactions));
