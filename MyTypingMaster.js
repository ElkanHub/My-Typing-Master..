const selectDrill = document.querySelector(".select-drill");
const fullkeys = document.getElementById("fullKeys");
const topRowkeys = document.getElementById("topRowKeys");
const homeRowkeys = document.getElementById("homeRowKeys");
const bottomRowkeys = document.getElementById("bottomRowKeys");
const customkeys = document.getElementById("customKeys");
const endDrillBtn = document.getElementById("endDrill");
const previewKeys = document.querySelector(".preview-keys");
const drillScreen = document.querySelector(".drill-screen");
const currentKey = document.querySelector(".current-key");

const progressBtn = document.querySelector(".progress-button");
const progressModal = document.querySelector(".progress-modal");

const passedKeys = document.querySelector(".passed-keys");
const failedKeys = document.querySelector(".failed-keys");
let passedKeysN = 0;
let failedKeysN = 0;

selectDrill
  .querySelectorAll("button")
  .forEach((button) => (button.disabled = false));
// let flag = false;

//progress modal
progressBtn.addEventListener("click", function (event) {
  progressModal.classList.toggle("show");
  event.stopPropagation(); // Prevents immediate closing when clicking the button
});
document.addEventListener("click", function (event) {
  if (!progressModal.contains(event.target) && event.target !== progressBtn) {
    progressModal.classList.remove("show");
  }
});

//for the active buttons
function drillIsActive(element) {
  selectDrill.querySelectorAll("button").forEach((button) => {
    if (button !== endDrillBtn) button.disabled = true;
  });

  runningDrill(element);
}

//the drill which is active
function runningDrill(currentEl) {
  //reseting the progress message is not working well
  passedKeys.textContent = 0;
  failedKeys.textContent = 0;
  //contdown
  let count = 5;
  let interval = setInterval(function () {
    document.querySelector(".current-key").textContent = count;
    count--;
    selectDrill.addEventListener("click", (event) => {
      if (event.target.matches("#endDrill")) endActiveDrill(interval);
    });

    if (count < 0) {
      clearInterval(interval);
      //then call drill After countdown ends
      switch (currentEl) {
        case fullkeys:
          //code to execute
          fullKeysDrill();
          break;
        case topRowkeys:
          //code to execute
          topRowKeysDrill();
          break;
        case homeRowkeys:
          //code to execute
          homeRowKeysDrill();
          break;
        case bottomRowkeys:
          //code to execute
          bottomRowKeysDrill();
          break;
        case customkeys:
          //code to execute
          customKeysDrill();
          break;
      }
    }
  }, 1000);
}

selectDrill.addEventListener("click", function (event) {
  if (event.target.matches("#homeRowKeys")) {
    drillIsActive(homeRowkeys);
  } else if (event.target.matches("#topRowKeys")) {
    drillIsActive(topRowkeys);
  } else if (event.target.matches("#bottomRowKeys")) {
    drillIsActive(bottomRowkeys);
  } else if (event.target.matches("#fullKeys")) {
    drillIsActive(fullkeys);
  } else if (event.target.matches("#customKeys")) {
    drillIsActive(customkeys);
  }
});

//arrays of drill keys
const topRowKeysArr = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const homeRowKeysArr = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"];
const bottomRowKeysArr = ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"];
const fullKeysArr = topRowKeysArr.concat(homeRowKeysArr, bottomRowKeysArr);

//randomizer
function randomizer(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//randomizer testing is now working properly

let randomPreviewTxt = [
  "One Drill At A Time",
  "One More Drill Won't Hurt",
  "Select Another Drill",
  "Home Row Keys Are Nice",
  "Keys Unlock Doors",
];

//function to end Active drill
function endActiveDrill(setIntervalVariableId, activeDrillEl) {
  // code to end all processes, most importantly, to end current drill
  clearInterval(setIntervalVariableId);
  currentKey.textContent = " ";
  selectDrill
    .querySelectorAll("button")
    .forEach((button) => (button.disabled = false));
  //to print random text in preview when endDrill.
  let randomPreviews = randomizer(0, randomPreviewTxt.length);
  console.log(randomPreviews);
  previewKeys.innerHTML = randomPreviewTxt[randomPreviews];
  //reseting undoneKeysN and doneKeysN variables
  undoneKeysN = 100;
  doneKeysN = 0;
  //reseting falied and passed keysN
  updateProgressModal();

  passedKeysN = 0;
  failedKeysN = 0;

  //call local storage to store scores;
}
function updateProgressModal() {
  document.querySelector(".passed").textContent = passedKeys.innerHTML;
  document.querySelector(".failed").textContent = failedKeys.innerHTML;

  document.querySelector(".skiped").textContent =
    Number(doneKeys.innerHTML) -
    (Number(passedKeys.innerHTML) + Number(failedKeys.innerHTML));

  document.querySelector(".left").textContent =
    undoneKeysN - Number(doneKeys.innerHTML);
}

//Drills
function homeRowKeysDrill() {
  previewKeys.innerHTML = homeRowKeysArr.join(" ").toUpperCase();
  let interval = setInterval(() => {
    blinkBorder(currentKey, "#3f51b5", "white");
    let randomKeys = randomizer(0, homeRowKeysArr.length);
    console.log(homeRowKeysArr[randomKeys].toUpperCase());
    currentKey.textContent = homeRowKeysArr[randomKeys].toUpperCase();
    //function to check keys will be in the function to doneCurrentKeys
    doneCurrentKeys(interval); //reffering to the "2OutOf100"

    //to end the Active drill
    selectDrill.addEventListener("click", function (event) {
      if (event.target.matches("#endDrill")) {
        endActiveDrill(interval, homeRowkeys);
      }
    });
  }, 2000);
}

function topRowKeysDrill() {
  previewKeys.innerHTML = topRowKeysArr.join(" ").toUpperCase();
  let interval = setInterval(() => {
    let randomKeys = randomizer(0, topRowKeysArr.length);
    console.log(topRowKeysArr[randomKeys].toUpperCase());
    currentKey.textContent = topRowKeysArr[randomKeys].toUpperCase();
    //call back function to check the clicked key to match current key
    doneCurrentKeys(interval); //reffering to the "2OutOf100"
    //to end the Active drill
    selectDrill.addEventListener("click", function (event) {
      if (event.target.matches("#endDrill")) {
        endActiveDrill(interval, topRowkeys);
      }
    });
  }, 2000);
}

function bottomRowKeysDrill() {
  previewKeys.innerHTML = bottomRowKeysArr.join(" ").toUpperCase();
  let interval = setInterval(() => {
    let randomKeys = randomizer(0, bottomRowKeysArr.length);
    console.log(bottomRowKeysArr[randomKeys].toUpperCase());
    currentKey.textContent = bottomRowKeysArr[randomKeys].toUpperCase();
    //call back function to check the clicked key to match current key
    doneCurrentKeys(interval); //reffering to the "2OutOf100"
    //to end the Active drill
    selectDrill.addEventListener("click", function (event) {
      if (event.target.matches("#endDrill")) {
        endActiveDrill(interval, bottomRowkeys);
      }
    });
  }, 2000);
}

function fullKeysDrill() {
  previewKeys.innerHTML = fullKeysArr.join(" ").toUpperCase();
  let interval = setInterval(() => {
    let randomKeys = randomizer(0, fullKeysArr.length);
    console.log(fullKeysArr[randomKeys].toUpperCase());
    currentKey.textContent = fullKeysArr[randomKeys].toUpperCase();
    //call back function to check the clicked key to match current key
    doneCurrentKeys(interval); //reffering to the "2OutOf100"
    //to end the Active drill
    selectDrill.addEventListener("click", function (event) {
      if (event.target.matches("#endDrill")) {
        endActiveDrill(interval, fullkeys);
      }
    });
  }, 2000);
}

function customKeysDrill() {
  previewKeys.innerHTML = `<input id="inputCustomKeys" placeholder = "Which keys do you want to practice"/><button id = "doneCustomKeys">Done</button>`;
  const inputCustomKeys = document.getElementById("inputCustomKeys");
  const doneCustomKeys = document.getElementById("doneCustomKeys");

  previewKeys.addEventListener("click", function (event) {
    let inputValue = inputCustomKeys.value.trim().toUpperCase();
    let customKeysArr = inputValue.split(",").map((key) => {
      key = key.trim(); // Trim spaces

      if (key === "COMMA") {
        return "&comma;"; // Convert "comma" to ","
      } else if (key.length > 1) {
        return key.charAt(0); // Return first character if longer than 1
      }

      return key; // Return the trimmed key if no modifications
    }); // comment here.
    // more changes just for something

    if (event.target.matches("#doneCustomKeys")) {
      /*debug*/ console.log(customKeysArr);
      previewKeys.innerHTML = customKeysArr.join(" ");
      let interval = setInterval(() => {
        let randomKeys = randomizer(0, customKeysArr.length);
        console.log(customKeysArr[randomKeys].toUpperCase());
        currentKey.textContent = customKeysArr[randomKeys].toUpperCase();
        doneCurrentKeys(interval); //reffering to the "2OutOf100"
        selectDrill.addEventListener("click", function (event) {
          if (event.target.matches("#endDrill")) {
            endActiveDrill(interval, customkeys);
          }
        });
      }, 2000);
    }
  });

  //call back function to check the clicked key to match current key
  //to end the Active drill
}

//checking the pressed key
//let correctKey = currentKey.textContent.trim(); // Example correct key

passedKeys.innerHTML = passedKeysN;
failedKeys.innerHTML = failedKeysN;

const doneKeys = document.querySelector(".done-keys");
const undoneKeys = document.querySelector(".undone-keys");
let undoneKeysN = 100;
let doneKeysN = 95;
function doneCurrentKeys(setIntervalVariableId) {
  if (doneKeysN < undoneKeysN) {
    doneKeysN++;
    doneKeys.innerHTML = doneKeysN;
    undoneKeys.innerHTML = undoneKeysN;
    //To check keys
    document.addEventListener("keydown", checkKey, { once: true });
  } else {
    endActiveDrill(setIntervalVariableId);
    //document.removeEventListener("keydown", checkKey());
  }
}
function checkKey(event) {
  if (event.key.toUpperCase() === currentKey.textContent) {
    blinkBorder(passedKeys, "#388e3c", "#388e3c");
    passedKeysN = passedKeysN + 1;
    passedKeys.textContent = passedKeysN;
    console.log("passed");
  } else {
    blinkBorder(failedKeys, "#d32f2f", "#d32f2f");
    failedKeysN = failedKeysN + 1;
    failedKeys.textContent = failedKeysN;
    console.log("failed");
  }
}

function blinkBorder(element, originalColor, blinkColor) {
  element.style.border = `solid ${blinkColor} 1.5px`;
  setTimeout(() => {
    element.style.border = `solid ${originalColor} 1px`;
  }, 200);
}

/* function checkKey(event) {
        console.log(
          `this is current keys textContent${currentKey.textContent}`
        );
        if (event === currentKey.innerHTML) {
          console.log("✅ Correct key pressed!");
          passedKeysN++;
          passedKeys.innerHTML = passedKeysN;
        } else {
          console.log("❌ Wrong key! No second chances.");
          failedKeysN++;
          failedKeys.innerHTML = failedKeysN;
        }
        // Remove the event listener after first key press (only one chance)
        document.removeEventListener("keydown", checkKey());
      }
*/
// Add event listener to listen for key press (only once)
