// Gruppenname: WI_X_Gruppe_N

function createCardElement(card, onDelete) {
  const item = document.createElement("li");
  item.className = "card-tile";

  const question = document.createElement("p");
  question.className = "card-tile-question";
  question.textContent = card.question;

  const meta = document.createElement("p");
  meta.className = "card-tile-meta";
  meta.textContent =
    (card.category ? card.category + " · " : "") + "Box " + card.box;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "button-delete";
  deleteButton.textContent = "Löschen";

  deleteButton.addEventListener("click", function () {
    onDelete(card.id);
  });

  item.append(question, meta, deleteButton);

  return item;
}

function renderCardOverview(state) {
  const list = document.getElementById("card-list");
  list.innerHTML = "";

  if (state.cards.length === 0) {
    const empty = document.createElement("li");
    empty.className = "card-list-empty";
    empty.textContent =
      "Noch keine Karten vorhanden. Lege oben deine erste Karte an.";

    list.appendChild(empty);
    return;
  }

  state.cards.forEach(function (card) {
    const element = createCardElement(card, function (cardId) {
      deleteCard(state, cardId);
    });

    list.appendChild(element);
  });
}

function addCard(state, category, question, answer) {
  const newCard = {
    id: generateCardId(),
    category: category.trim(),
    question: question.trim(),
    answer: answer.trim(),
    box: 1,
    dueAtSession: state.sessionCount
  };

  state.cards.push(newCard);
  saveState(state);
  renderCardOverview(state);
}

function deleteCard(state, cardId) {
  state.cards = state.cards.filter(function (card) {
    return card.id !== cardId;
  });

  saveState(state);
  renderCardOverview(state);
}