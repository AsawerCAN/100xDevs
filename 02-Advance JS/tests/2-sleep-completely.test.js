const busyWait = require("../hard/2-sleep-completely.js");

describe("busyWait", () => {
  it("should resolve with the correct message after the specified time", async () => {
    const milliseconds = 1000;
    const start = Date.now();
    const result = await busyWait(milliseconds);
    const end = Date.now();

    expect(result).toBe(`Waited for ${milliseconds} milliseconds`);
    expect(end - start).toBeGreaterThanOrEqual(milliseconds);
  });

  it("should resolve immediately for 0 milliseconds", async () => {
    const milliseconds = 0;
    const start = Date.now();
    const result = await busyWait(milliseconds);
    const end = Date.now();

    expect(result).toBe(`Waited for ${milliseconds} milliseconds`);
    expect(end - start).toBeLessThan(10); // Minimal time for 0ms
  });

  it("should reject for invalid input (negative number)", async () => {
    const milliseconds = -100;
    await expect(busyWait(milliseconds)).rejects.toThrow(
      "Time must be a non-negative number"
    );
  });

  it("should reject for invalid input (non-numeric)", async () => {
    const milliseconds = "abc";
    await expect(busyWait(milliseconds)).rejects.toThrow(
      "Time must be a non-negative number"
    );
  });

  it("should handle large values without crashing", async () => {
    const milliseconds = 500;
    const result = await busyWait(milliseconds);
    expect(result).toBe(`Waited for ${milliseconds} milliseconds`);
  });
});
