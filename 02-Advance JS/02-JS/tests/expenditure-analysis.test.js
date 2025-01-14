const calculateTotalSpentByCategory = require("../easy/calculateTotalSpentByCategory");

describe("calculateTotalSpentByCategory", () => {
  it("should calculate total spent per category correctly for a valid input", () => {
    const transactions = [
      {
        id: 1,
        timestamp: 1656076800000,
        price: 10,
        category: "Food",
        itemName: "Pizza",
      },
      {
        id: 2,
        timestamp: 1656076800000,
        price: 20,
        category: "Electronics",
        itemName: "Headphones",
      },
      {
        id: 3,
        timestamp: 1656076800000,
        price: 5,
        category: "Food",
        itemName: "Burger",
      },
    ];
    const result = calculateTotalSpentByCategory(transactions);
    expect(result).toEqual([
      { category: "Food", totalSpent: 15 },
      { category: "Electronics", totalSpent: 20 },
    ]);
  });

  it("should return an empty array for an empty input", () => {
    const transactions = [];
    const result = calculateTotalSpentByCategory(transactions);
    expect(result).toEqual([]);
  });

  it("should handle transactions with no categories", () => {
    const transactions = [
      {
        id: 1,
        timestamp: 1656076800000,
        price: 10,
        category: "",
        itemName: "Unknown",
      },
      {
        id: 2,
        timestamp: 1656076800000,
        price: 5,
        category: "",
        itemName: "Another Unknown",
      },
    ];
    const result = calculateTotalSpentByCategory(transactions);
    expect(result).toEqual([{ category: "", totalSpent: 15 }]);
  });

  it("should handle a single transaction", () => {
    const transactions = [
      {
        id: 1,
        timestamp: 1656076800000,
        price: 50,
        category: "Groceries",
        itemName: "Vegetables",
      },
    ];
    const result = calculateTotalSpentByCategory(transactions);
    expect(result).toEqual([{ category: "Groceries", totalSpent: 50 }]);
  });

  it("should handle transactions with multiple same categories", () => {
    const transactions = [
      {
        id: 1,
        timestamp: 1656076800000,
        price: 10,
        category: "Books",
        itemName: "Novel",
      },
      {
        id: 2,
        timestamp: 1656076800000,
        price: 20,
        category: "Books",
        itemName: "Magazine",
      },
    ];
    const result = calculateTotalSpentByCategory(transactions);
    expect(result).toEqual([{ category: "Books", totalSpent: 30 }]);
  });

  it("should handle transactions with negative prices", () => {
    const transactions = [
      {
        id: 1,
        timestamp: 1656076800000,
        price: 10,
        category: "Refunds",
        itemName: "Refund A",
      },
      {
        id: 2,
        timestamp: 1656076800000,
        price: -5,
        category: "Refunds",
        itemName: "Refund B",
      },
    ];
    const result = calculateTotalSpentByCategory(transactions);
    expect(result).toEqual([{ category: "Refunds", totalSpent: 5 }]);
  });

  it("should ignore transactions without prices", () => {
    const transactions = [
      {
        id: 1,
        timestamp: 1656076800000,
        price: 10,
        category: "Food",
        itemName: "Pizza",
      },
      { id: 2, timestamp: 1656076800000, category: "Food", itemName: "Burger" }, // Missing price
    ];
    const result = calculateTotalSpentByCategory(transactions);
    expect(result).toEqual([{ category: "Food", totalSpent: 10 }]);
  });

  it("should handle categories with mixed cases", () => {
    const transactions = [
      {
        id: 1,
        timestamp: 1656076800000,
        price: 10,
        category: "FOOD",
        itemName: "Pizza",
      },
      {
        id: 2,
        timestamp: 1656076800000,
        price: 20,
        category: "food",
        itemName: "Burger",
      },
    ];
    const result = calculateTotalSpentByCategory(transactions);
    expect(result).toEqual([
      { category: "FOOD", totalSpent: 10 },
      { category: "food", totalSpent: 20 },
    ]);
  });
});
