//Some common problems solved using DP (dynamic programming)

//fib with recursion only the time complexity would be O(2^n) cus the recursion tree will grow a lot
function fibRecur(n) {
  if (n === 1 || n === 2) return 1;
  return fibRecur(n - 1) + fibRecur(n - 2);
}

//with memoization basically storing the solutions to the sub problems so you don't have to recalculate it again, instead just do a lookup O(n) roughly linear growth with n memo is top down
function fib(n, container = {}) {
  if (container[n]) return container[n];
  if (n === 1 || n === 2) return 1;
  let res = fib(n - 1, container) + fib(n - 2, container);
  container[n] = res;
  return res;
}

//tabulation is bottom up approach also O(n)
function fibTab(n) {
  if (n === 1 || n === 2) return 1;
  let container = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    container[i] = container[i - 1] + container[i - 2];
  }
  return container[n];
}

console.log(fib(45));
console.log(fibTab(45));
