"use strict";

/* THIS IS A FLASHCARD PROGRAM THAT IS INTENDED TO ASSIST STUDYING */

/* GLOBAL VARIABLE DECLARATIONS */

const createBtn = document.querySelector(".btn-create");
const saveBtn = document.querySelector(".btn-save");
const container = document.querySelector(".card-container");
const questionInput = document.getElementById("question-input");
const answerInput = document.getElementById("answer-input");
const xBtn = document.getElementById("x-icon");
const clearBtn = document.querySelector(".btn-clear");
let saveContainer = {};

/* FUNCTION DECLARATIONS */

const createCard = function (questionInput, answerInput) {
  // Creates a new card.
  const newCard = document.createElement("div");
  const questionText = document.createElement("p");
  const xIcon = document.createElement("img");
  const answerText = document.createElement("a");
  const answerLabel = document.createElement("a");
  const rIcon = document.createElement("img");

  // X-icon for deleting cards.
  xIcon.setAttribute("src", "x.svg");
  xIcon.classList.add("x-icon");

  // R-icon for revealing answers.
  rIcon.setAttribute("src", "loupe.png");
  rIcon.classList.add("r-icon");

  // New card elements.
  container.appendChild(newCard);
  newCard.classList.add("new-card");
  newCard.appendChild(xIcon);
  newCard.appendChild(rIcon);

  // Function calls to add more elements to the new card as well as new click events.
  addQuestion(questionInput, questionText, newCard);
  addAnswer(answerInput, answerText, answerLabel, newCard);
  deleteCard(xIcon, newCard);
  showAnswer(rIcon, answerText);
};

const addQuestion = function (questionInput, questionText, newCard) {
  // Appends a question into the card.
  questionText.innerHTML = `${questionInput.value || questionInput}`;
  questionText.classList.add("question-output");
  newCard.appendChild(questionText);
};

const addAnswer = function (answerInput, answerText, answerLabel, newCard) {
  // Appends an answer label and answer into the card.
  answerLabel.innerHTML += "Answer: ";
  answerLabel.classList.add("answer-label");
  answerText.classList.add("answer-output");
  answerText.innerHTML += `${answerInput.value || answerInput}`;
  newCard.appendChild(answerLabel);
  newCard.appendChild(answerText);
};

const showAnswer = function (rIcon, answerText) {
  // Shows the hidden answer in the cards when the x-icon is clicked.
  rIcon.addEventListener("click", () => {
    answerText.style.visibility === "hidden"
      ? (answerText.style.visibility = "visible")
      : (answerText.style.visibility = "hidden");
  });
};

const appendAnswer = function (newCard) {
  // Appends the answer into the card.
  newCard.innerHTML += `<p> Answer: ${answerInput.value}</p>`;
};

const addText = function (questionInput, answerInput) {
  // Clears the textareas when the new card is created.
  createCard(questionInput, answerInput);
  questionInput.value = "";
  answerInput.value = "";
};

const deleteCard = function (xIcon, newCard) {
  // Deletes a card when the x-icon is clicked.
  xIcon.addEventListener("click", () => {
    let confirmDelete = confirm("Are you sure you want to delete this card?");
    if (confirmDelete) {
      newCard.remove();
    }
  });
};

const saveCards = function () {
  // Adds the card's question and answer into a save container object.
  let qCards = document.querySelectorAll(".question-output");
  let aCards = document.querySelectorAll(".answer-output");
  saveContainer = {};
  let save = confirm(
    "Are you sure you want to save this? This would overwrite the previous setting."
  );
  if (save) {
    for (let [i, card] of qCards.entries()) {
      card = card.innerText;
      saveContainer[card] = aCards[i].innerHTML;
    }
    alert("The cards are now saved in the local storage.");
    localStorage.setItem("cards", JSON.stringify(saveContainer));
  }
};

const loadCards = function () {
  // Loads the question and answers object saved in the local storage and create a card based on it.
  let savedCards = JSON.parse(localStorage.getItem("cards")) || {};
  for (let [k, v] of Object.entries(savedCards)) {
    createCard(k, v);
  }
};

const clearCards = function () {
  // Deletes all of the existing cards and clears the entire save container object.
  const cards = document.querySelectorAll(".new-card");
  if (cards.length <= 0) {
    //do nothing
  } else {
    let clear = confirm(
      "Are you sure you want to delete ALL the cards and start a new one?"
    );

    if (clear) {
      for (let card of cards) {
        card.remove();
      }
    }
  }
};

/* LOAD EVENT FUNCTION */

loadCards();

/* EVENT DECLARATIONS */

createBtn.addEventListener("click", () => {
  // Restrict the user from making a card when one or noth of the entries are empty. Else, the new card is created.
  if (!Boolean(questionInput.value) || !Boolean(answerInput.value)) {
    alert("The entry(ies) is/are empty. Please provide a value for it.");
  } else {
    addText(questionInput, answerInput);
  }
});

saveBtn.addEventListener("click", () => {
  // Save Button event.
  saveCards();
});

clearBtn.addEventListener("click", () => {
  // Clear Button event.
  clearCards();
});
