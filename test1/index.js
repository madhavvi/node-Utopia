const assert = require("chai").assert;

const names = [
  "Michael Daniel Jäger",
  "LINUS HARALD christer WAHLGREN",
  "Pippilotta Viktualia Rullgardina Krusmynta Efraimsdotter LÅNGSTRUMP",
  "Kalle Anka",
  "Ghandi",
];

const expected = [
  { first: "Michael", middle: ["Daniel"], last: "Jäger" },
  { first: "Linus", middle: ["Harald", "Christer"], last: "Wahlgren" },
  {
    first: "Pippilotta",
    middle: ["Viktualia", "Rullgardina", "Krusmynta", "Efraimsdotter"],
    last: "Långstrump",
  },
  { first: "Kalle", middle: [], last: "Anka" },
  { first: "Ghandi", middle: [], last: null },
];

const validate = (result) => {
  try {
    assert.deepEqual(result, expected);
    console.log('Success');
  } catch (e) {
    console.error("Failed", e);
  }
};

const capitalizeFirstLetter = (name) => {
  name = name.toLowerCase();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const filtered = names.reduce((acc, crt) => {
  let name = {};
  let nameArr = crt.split(" ").map(capitalizeFirstLetter);    // this will return array with capitalize names

  name = {
      first: nameArr[0],
      middle: nameArr.length > 2 ? crt.split(" ", nameArr.length - 1).map(capitalizeFirstLetter).slice(1) : [],
      last: nameArr.length > 1 ? nameArr[nameArr.length - 1] : null
  }

  acc.push(name);
  return acc;
}, []);

// implement code generating result
const result = filtered;

// At the end call validate
validate(result);
