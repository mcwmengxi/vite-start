import { cloneDeep } from "lodash";

const cloneArr = [
  { name: "ymy", age: 25 },
  { name: "toko", age: 22 },
];

console.log(cloneDeep(cloneArr));
