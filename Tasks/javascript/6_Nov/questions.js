const nextButton = document.getElementById("next");
const questionsLi = document.querySelectorAll(".questions");
const previousButton = document.getElementById("previous");
let index = 0;
const ul = document.getElementById("ulQues");
const main = document.getElementById("js_main");
const buttons = document.getElementById("js_buttons");
console.log(ul.offsetHeight)
let y = window.innerHeight / 3;
let li = document.getElementById("js_li");
let liHeight = li.clientHeight;
console.log(liHeight);

ul.style.top = `${y}px`;
buttons.style.top = `${y + ul.clientHeight}px`;

nextButton.addEventListener("click", function (e) {
  e.preventDefault();
  questionsLi[index].className = "opacity-30";
  index = (index + 1) % questionsLi.length;
  questionsLi[index].className = "opacity-100";
  ul.scrollTop =
    questionsLi[index].offsetTop -
    (ul.clientHeight - questionsLi[index].clientHeight) / 2;
});

previousButton.addEventListener("click", function (e) {
  e.preventDefault();
  questionsLi[index].className = "opacity-30";
  index = (index - 1 + questionsLi.length) % questionsLi.length;
  questionsLi[index].className = "opacity-100";
  ul.scrollTop =
    questionsLi[index].offsetTop -
    (ul.clientHeight - questionsLi[index].clientHeight) / 2;
});
