function busyWait(milliseconds) {
  return new Promise((resolve) => {
    const start = Date.now();
    while (Date.now() - start < milliseconds) {}
    resolve(`Waited for ${milliseconds} milliseconds`);
  });
}

busyWait(2000).then((message) => {
  console.log(message);
});

// not recommended to use busyWait function as it will block the event loop
// and can cause performance issues
