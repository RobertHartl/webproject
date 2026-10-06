// Gruppe:  WI_A_Gruppe_5   

const BOX_Intervals = { 1: 0, 2: 1, 3: 3, 4: 6, 5: 10};
const MAX_BOX = 5;

function isCardDue(card, sessionsCount) {
    return card.dueAtSession <= sessionsCount;
}

function promoteCard(card, sessionsCount) {
    card.box = Math.min(card.box + 1, MAX_BOX);
    card.dueAtSession = sessionsCount + BOX_Intervals[card.box];
}

function resetCard(card, sessionsCount) {
    card.box = 1;
    card.dueAtSession = sessionsCount;
}

function getDueCards(cards, sessionsCount) {
    return cards.filter(function (card) {
        return isCardDue(card, sessionsCount);
    });
}