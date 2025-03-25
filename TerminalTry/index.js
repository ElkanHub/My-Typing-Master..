const inputQuote = document.getElementById("inputQuote");
const addBtn = document.getElementById("addBtn");
const displaySection = document.querySelector(".display-section");
const genRandomBtn = document.getElementById("genRandomBtn");

let quoteArr = [];

addBtn.addEventListener("click", () => {
  if (!inputQuote.value.trim().length == 0) {
    quoteArr.push(inputQuote.value.trim());
  }
  inputQuote.value = " ";
  console.log(quoteArr);
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

genRandomBtn.addEventListener("click", () => {
  if (quoteArr.length === 0) {
    displaySection.innerHTML = "No Quote saved... Save a Quote to generate";
  } else {
    displaySection.innerHTML = `One of your Quotes: ${
      quoteArr[randomNum(0, quoteArr.length)]
    }`;
  }
});
