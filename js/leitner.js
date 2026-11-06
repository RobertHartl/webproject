// Gruppe: WI_A_Gruppe_5

const BOX_INTERVALS = { 1: 0, 2: 1, 3: 3, 4: 6, 5: 10 };
const MAX_BOX = 5;

function isCardDue(card, sessionCount) {
  return card.dueAtSession <= sessionCount;
}

function promoteCard(card, sessionCount) {
  card.box = Math.min(card.box + 1, MAX_BOX);
  card.dueAtSession = sessionCount + BOX_INTERVALS[card.box];
}

function resetCard(card, sessionCount) {
  card.box = 1;
  card.dueAtSession = sessionCount;
}

function getDueCards(cards, sessionCount) {
  return cards.filter(function (card) {
    return isCardDue(card, sessionCount);
  });
}
