const { waitForAll } = require("../hard/3-promise-all.js");

describe("waitForAll", () => {
  jest.useFakeTimers();

  it("should resolve after the longest duration and return the correct results", async () => {
    const t1 = 2,
      t2 = 3,
      t3 = 5;

    const promise = waitForAll(t1, t2, t3);

    jest.advanceTimersByTime(t3 * 1000);
    const totalTime = await promise;

    expect(totalTime).toBeGreaterThanOrEqual(t3 * 1000);
  });

  it("should calculate the total time taken accurately", async () => {
    const t1 = 1,
      t2 = 1,
      t3 = 1;

    const startTime = Date.now();
    const promise = waitForAll(t1, t2, t3);

    jest.advanceTimersByTime(t3 * 1000);
    const totalTime = await promise;

    const endTime = Date.now();
    expect(totalTime).toBeLessThanOrEqual(endTime - startTime);
  });

  it("should handle zero durations correctly", async () => {
    const t1 = 0,
      t2 = 0,
      t3 = 0;

    const promise = waitForAll(t1, t2, t3);

    jest.advanceTimersByTime(0);
    const totalTime = await promise;

    expect(totalTime).toBeLessThanOrEqual(10);
  });

  it("should reject if any promise fails (negative duration)", async () => {
    const t1 = -1,
      t2 = 2,
      t3 = 3;

    await expect(waitForAll(t1, t2, t3)).rejects.toThrow(
      "Time must be a non-negative number"
    );
  });

  it("should reject if any promise fails (non-numeric duration)", async () => {
    const t1 = 1,
      t2 = "abc",
      t3 = 3;

    await expect(waitForAll(t1, t2, t3)).rejects.toThrow(
      "Time must be a non-negative number"
    );
  });
});
