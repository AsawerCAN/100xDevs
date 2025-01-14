let count = 0;

const counterUpdate = () => {
  count++;
  console.log(count);
};

setInterval(counterUpdate, 1000);
