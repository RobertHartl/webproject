// Gruppe:  WI_A_Gruppe_5

let currentSessionCards = [];
let currentCardIndex = 0;
let sessionStarted = false;

function startSession(state) {
  state.sessionCount += 1;
  currentSessionCards = getDueCards(state.cards, state.sessionCount);
  currentCardIndex = 0;
  sessionStarted = true;
  saveState(state);
  renderSessionView(state);
}

function pruneSessionCards(state) {
  const existingIds = new Set(state.cards.map(function (card) {
    return card.id;
  }));
  const remainingBefore = currentSessionCards
    .slice(0, currentCardIndex)
    .filter(function (card) {
      return existingIds.has(card.id);
    }).length;
  currentSessionCards = currentSessionCards.filter(function (card) {
    return existingIds.has(card.id);
  });
  currentCardIndex = remainingBefore;
}

function getCurrentSessionCard() {
  if (currentCardIndex >= currentSessionCards.length) {
    return null;
  }
  return currentSessionCards[currentCardIndex];
}

function setRatingButtonsEnabled(enabled) {
  document.getElementById("rate-correct").disabled = !enabled;
  document.getElementById("rate-wrong").disabled = !enabled;
}

function flipCurrentCard() {
  const trigger = document.getElementById("flip-trigger");
  const isFlipped = trigger.getAttribute("aria-pressed") === "true";
  trigger.setAttribute("aria-pressed", String(!isFlipped));
  setRatingButtonsEnabled(!isFlipped);
}

function rateCurrentCard(state, wasCorrect) {
  const card = getCurrentSessionCard();
  if (!card) {
    return;
  }
  if (wasCorrect) {
    promoteCard(card, state.sessionCount);
  } else {
    resetCard(card, state.sessionCount);
  }
  state.stats.totalReviews += 1;
  if (wasCorrect) {
    state.stats.correctReviews += 1;
  }
  currentCardIndex += 1;
  saveState(state);
  renderSessionView(state);
}

function getEmptyMessage() {
  if (!sessionStarted) {
    return "Starte eine Session, um fällige Karten zu lernen.";
  }
  if (currentSessionCards.length === 0) {
    return "Aktuell sind keine Karten fällig. Starte später eine neue Session.";
  }
  return "Session abgeschlossen. Starte eine neue Session, wenn du weiterlernen möchtest.";
}

function renderSessionView(state) {
  const noCards = document.getElementById("session-no-cards");
  const emptyBox = document.getElementById("session-empty");
  const container = document.getElementById("session-card-container");
  
  pruneSessionCards(state);
  
  if (state.cards.length === 0) {
    noCards.hidden = false;
    emptyBox.hidden = true;
    container.hidden = true;
    return;
  }
  
  const card = getCurrentSessionCard();
  if (!card) {
    noCards.hidden = true;
    emptyBox.hidden = false;
    container.hidden = true;
    document.getElementById("session-empty-text").textContent = getEmptyMessage();
    return;
  }
  
  noCards.hidden = true;
  emptyBox.hidden = true;
  container.hidden = false;
  
  document.getElementById("session-question").textContent = card.question;
  document.getElementById("session-answer").textContent = card.answer;
  document.getElementById("session-progress").textContent =
    "Karte " + (currentCardIndex + 1) + " von " + currentSessionCards.length;
    
  document.getElementById("flip-trigger").setAttribute("aria-pressed", "false");
  setRatingButtonsEnabled(false);
}