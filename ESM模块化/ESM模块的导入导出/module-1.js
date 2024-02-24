// import def from "./module-3.js";
// console.log(def);

import * as all from "./module-2.js";
console.log(all);

// import { PI, isOdd, Person } from "./module-3.js";
// console.log(PI, isOdd(666), new Person('mupiao'));

// import def, { PI as pi, isOdd, Person } from "./module-3.js";
// console.log(def);
// console.log(pi, isOdd(666), new Person('mupiao'));


export { default as def, PI, isOdd, Person } from "./module-3.js";
// console.log(def );


