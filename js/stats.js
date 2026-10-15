// Gruppe:  WI_A_Gruppe_5

function calculateBoxCounts(cards) {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    cards.forEach(function (card) {
        counts[card.box] = (counts[card.box] || 0) + 1;
    });
    return counts;
}

function calculateSuccessRate(stats) {
    return Math.round((stats.correctReviews / stats.totalReviews) * 100);
}

function getCategories(cards) {
    const categories = new Set();
    cards.forEach(function (card) {
        if (card.category) {
            categories.add(card.category);
        }
    });
    return Array.from(categories).sort();
}

function filterCardsByCategory(cards, category) {
    if (!category || category === "all") {
        return cards;
    }
    return cards.filter(function (card) {
        return card.category === category;
    });
}