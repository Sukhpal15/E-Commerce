const nextButton = document.getElementById("next");
const questionsLi = document.querySelectorAll(".questions");
const previousButton = document.getElementById("previous");
let index = questionsLi.length / 2;
const ul = document.getElementById("ulQues");
const main = document.getElementById("js_main");
const buttons = document.getElementById("js_buttons");

let y = window.innerHeight / 2;
let li = document.getElementById("js_li");
let liHeight = li.clientHeight;
console.log(liHeight);

ul.style.top = `${y}px`;
buttons.style.top = `${y + ul.clientHeight}px`;

ul.scrollTop = (ul.scrollHeight - ul.clientHeight) / 2;

// Initialize the initial opacity classes
for (let i = questionsLi.length / 2; i < questionsLi.length; i++) {
  if (i === index) {
    questionsLi[i].className = "opacity-100";
  } else {
    questionsLi[i].className = "opacity-30";
  }
}

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
