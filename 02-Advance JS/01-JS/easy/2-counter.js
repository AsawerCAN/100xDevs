let count = 0;

function counter() {
  count++;
  console.log(count);
  setTimeout(counter, 2000);
}

setTimeout(counter, 1000);
