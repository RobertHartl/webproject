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