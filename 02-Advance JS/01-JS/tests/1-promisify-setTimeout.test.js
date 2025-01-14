const waitForSeconds = require("../hard/1-promisify-setTimeout.js");

describe("waitForSeconds", () => {
  jest.useFakeTimers();

  it("should resolve with the correct message after the specified time", async () => {
    const n = 3;
    const promise = waitForSeconds(n);

    jest.advanceTimersByTime(n * 1000);

    await expect(promise).resolves.toBe(`Resolved after ${n} seconds`);
  });

  it("should not resolve before the specified time", () => {
    const n = 2;
    const promise = waitForSeconds(n);

    jest.advanceTimersByTime(n * 500);

    const pendingCheck = new Promise((resolve) => setTimeout(resolve, 0));
    expect(Promise.race([promise, pendingCheck])).resolves.not.toBe(
      `Resolved after ${n} seconds`
    );
  });

  it("should resolve immediately for n = 0", async () => {
    const n = 0;
    const promise = waitForSeconds(n);

    jest.advanceTimersByTime(0);
    await expect(promise).resolves.toBe(`Resolved after ${n} seconds`);
  });

  it("should reject for invalid input (negative number)", async () => {
    const n = -1;

    await expect(waitForSeconds(n)).rejects.toThrow(
      "Time must be a non-negative number"
    );
  });

  it("should reject for invalid input (non-numeric)", async () => {
    const n = "abc";

    await expect(waitForSeconds(n)).rejects.toThrow(
      "Time must be a non-negative number"
    );
  });

  it("should handle large values without crashing", async () => {
    const n = 10000;

    const promise = waitForSeconds(n);
    jest.advanceTimersByTime(n * 1000);

    await expect(promise).resolves.toBe(`Resolved after ${n} seconds`);
  });

  it("should resolve close to the expected time (±10ms)", async () => {
    const n = 2;
    const start = Date.now();

    const promise = waitForSeconds(n);
    jest.advanceTimersByTime(n * 1000);

    await promise;

    const end = Date.now();
    const elapsed = end - start;
    expect(elapsed).toBeGreaterThanOrEqual(2000);
    expect(elapsed).toBeLessThanOrEqual(2010);
  });
});
