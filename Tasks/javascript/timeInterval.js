//First Question: Write a function printNumbers(from, to) that outputs a number every second, starting from from and ending with to.

// First method by set time out
// function printNumber(from, to) {
//   setTimeout(() => {
//     console.log(from++);
//     if (from <= to) {
//       setTimeout(() => {
//         return printNumber(from, to);
//       }, 0);
//     }
//   }, 0);
// }
// printNumber(10, 15);

//Second Time out method
// function printNumberByInterval(from, to){
//  let a = setInterval(() => {
//   console.log(from++);
//   if(from === to + 1){
//     this.a = a;
//    clearInterval(this.a)
//   }
//  }, 1000);
// }
//   printNumberByInterval(0,10)

// function printNumberByInterval(from, to) {
//   let a = setInterval(() => {
//     console.log(from++);
//     if (from === to + 1) {
//       clearInterval(a);
//     }
//   }, 1000);
// }
// printNumberByInterval(0, 10);

//Question 2 Write a function to create two button start or stop. When we click start it will start printing hii until we click on stop.

// let start = document.getElementById("srt");
// let end = document.getElementById("stp");
// let para = document.getElementById("para");
// let b;
// start.addEventListener("click", function () {
//   b = setInterval(() => {
//     para.innerHTML += "hi<br>";
//   }, 1000);
// });

// end.addEventListener("click", function () {
//   clearInterval(b);
// });

//Question 3 Let's do some practice with a simple exercice. You must modify the code below based on the following rules:

// The function job must return a promise object (you are in a NodeJS environment, you can use new Promise)
// The promise must resolve itself 2 seconds after the call to job and must provide hello world in the data

// let timeHello = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("Hello World");
//   }, 2000);
// });

// timeHello.then((data) => {
//   console.log(data);
// });

//Question 4 Let's do a harder exercise. In this code, your function receives a parameter data. You must modify the code below based on the following rules:

// Your function must always return a promise
// If data is not a number, return a promise rejected instantly and give the data "error" (in a string)
// If data is an odd number, return a promise resolved 1 second later and give the data "odd" (in a string)
// If data is an even number, return a promise rejected 2 seconds later and give the data "even" (in a string)

// function evenOddData(addNum) {
//   let evenOdd = new Promise((resolve, reject) => {
//     if (isNaN(addNum) || typeof(addNum) === "string" ) {
//       return reject("Error");
//     } else if (addNum % 2 == 0) {
//       setTimeout(() => {
//         return reject("even");
//       }, 2000);
//     }
//     else {
//       setTimeout(() => {
//         return resolve("odd");
//       }, 1000);
//     }
//   });

//   evenOdd
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// evenOddData(0);

