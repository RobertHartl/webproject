// Gruppe:  WI_A_Gruppe_5   

const BOX_Intervals = { 1: 0, 2: 1, 3: 3, 4: 6, 5: 10};
const MAX_BOX = 5;

function isCardDue(card, sessionsCount) {
    return card.dueAtSession <= sessionsCount;
}