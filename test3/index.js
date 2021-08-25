const assert = require("chai").assert;

const positions = [
  { a: ["C", 2], b: ["D", 4], canAttack: true },
  { a: ["F", 7], b: ["E", 5], canAttack: true },
  { a: ["C", 2], b: ["A", 1], canAttack: true },
  { a: ["A", 6], b: ["B", 4], canAttack: true },
  { a: ["A", 6], b: ["B", 5] },
  { a: ["C", 2], b: ["C", 2] },
  { a: ["A", -1], b: ["B", 1] },
  { a: ["D", 4], b: ["E", 5] },
];

const checkRange = (a) => {
  return (a < 1 || a > 8) ? false : true;
} 

// implement this method to test if two knights threaten eachother
const canAttack = (a, b) => {
  a.push( a[0].charCodeAt(0) - 64);
  b.push( b[0].charCodeAt(0) - 64);

  if(checkRange(a[2]) && checkRange(a[1]) && checkRange(b[2]) && checkRange(b[1])) {
      const range = Math.abs(a[1] - b[1])  + Math.abs(a[2] - b [2]);
      return range === 3;
  } else {
      return false
  };
}

positions.forEach((test) => {
  try {
    assert.equal(canAttack(test.a, test.b), !!test.canAttack);
    console.log('Success');
  } catch (e) {
    console.error("FAILED", test);
  }
});
