// Gruppe: WI_A_Gruppe_5

let currentSessionCards = [];
let currentCardIndex = 0;
let sessionStarted = false;

const SESSION_PANELS = {
  noCards: "session-no-cards",
  empty: "session-empty",
  card: "session-card-container",
};

function persistSession(state) {
  state.session = {
    started: sessionStarted,
    cardIds: currentSessionCards.map(function (card) {
      return card.id;
    }),
    index: currentCardIndex,
  };
  saveState(state);
}

function restoreSession(state) {
  const saved = state.session;
  if (!saved || saved.started !== true || !Array.isArray(saved.cardIds)) {
    return;
  }
  const findCard = function (id) {
    return state.cards.find(function (card) {
      return card.id === id;
    });
  };
  const savedIndex = Number.isInteger(saved.index) ? saved.index : 0;
  currentSessionCards = saved.cardIds.map(findCard).filter(Boolean);
  currentCardIndex = saved.cardIds.slice(0, savedIndex).filter(findCard).length;
  sessionStarted = true;
}

function startSession(state) {
  state.sessionCount += 1;
  currentSessionCards = getDueCards(state.cards, state.sessionCount);
  currentCardIndex = 0;
  sessionStarted = true;
  persistSession(state);
  renderSessionView(state);
}

function pruneSessionCards(state) {
  const existingIds = new Set(
    state.cards.map(function (card) {
      return card.id;
    }),
  );
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

function setCardFlipped(isFlipped) {
  document
    .getElementById("flip-trigger")
    .setAttribute("aria-pressed", String(isFlipped));
  document
    .querySelector(".card-front")
    .setAttribute("aria-hidden", String(isFlipped));
  document
    .querySelector(".card-back")
    .setAttribute("aria-hidden", String(!isFlipped));
  setRatingButtonsEnabled(isFlipped);
}

function flipCurrentCard() {
  const isFlipped =
    document.getElementById("flip-trigger").getAttribute("aria-pressed") ===
    "true";
  setCardFlipped(!isFlipped);
}

function rateCurrentCard(state, wasCorrect) {
  const card = getCurrentSessionCard();
  if (!card) {
    return;
  }
  if (wasCorrect) {
    promoteCard(card, state.sessionCount);
    state.stats.correctReviews += 1;
  } else {
    resetCard(card, state.sessionCount);
  }
  state.stats.totalReviews += 1;
  currentCardIndex += 1;
  persistSession(state);
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

function showSessionPanel(activePanel) {
  Object.keys(SESSION_PANELS).forEach(function (panel) {
    document.getElementById(SESSION_PANELS[panel]).hidden =
      panel !== activePanel;
  });
}

function renderSessionView(state) {
  pruneSessionCards(state);

  if (state.cards.length === 0) {
    showSessionPanel("noCards");
    return;
  }

  const card = getCurrentSessionCard();
  if (!card) {
    document.getElementById("session-empty-text").textContent =
      getEmptyMessage();
    showSessionPanel("empty");
    return;
  }

  showSessionPanel("card");
  document.getElementById("session-question").textContent = card.question;
  document.getElementById("session-answer").textContent = card.answer;
  document.getElementById("session-progress").textContent =
    "Karte " + (currentCardIndex + 1) + " von " + currentSessionCards.length;
  setCardFlipped(false);
}
