console.log("Fibonacci");
function fibonacci(n) {
  let output = [];
  let fibonacciNum = 0;

  if (n === 1) {
    output = [0];
  } else if (n === 2) {
    output = [0, 1];
  } else {
    for (let i = 0; i < n; i++) {
      output.push(fibonacciNum);
      if (fibonacciNum === 0) {
        fibonacciNum++;
      } else {
        fibonacciNum = output[output.length - 1] + output[output.length - 2];
      }
    }
  }

  return output;
}

console.log(fibonacci(25));
