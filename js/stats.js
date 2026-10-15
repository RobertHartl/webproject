// Gruppe:  WI_A_Gruppe_5

function calculateBoxCounts(cards) {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    cards.forEach(function (card) {
        counts[card.box] = (counts[card.box] || 0) + 1;
    });
    return counts;
}

function calculateSuccessRate(stats) {
    if (!stats || stats.totalReviews === 0) {
        return 0;
    }
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

function renderCategoryFilter(state) {
    const select = document.getElementById("category-filter");
    if (!select) return;

    const categories = getCategories(state.cards);
    select.innerHTML = "";

    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "Alle Kategorien";
    select.appendChild(allOption);

    categories.forEach(function (category) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });
}

function renderStatsDashboard(state) {
    const select = document.getElementById("category-filter");
    const selectedCategory = select ? (select.value || "all") : "all";

    const relevantCards = filterCardsByCategory(state.cards, selectedCategory);
    const boxCounts = calculateBoxCounts(relevantCards);
    const successRate = calculateSuccessRate(state.stats);

    const dashboard = document.getElementById("stats-dashboard");
    if (!dashboard) return;

    dashboard.innerHTML = "";

    const tiles = [
        { label: "Karten gesamt", value: relevantCards.length },
        { label: "Erfolgsquote", value: successRate + "%" },
        { label: "Box 1", value: boxCounts[1] },
        { label: "Box 2", value: boxCounts[2] },
        { label: "Box 3", value: boxCounts[3] },
        { label: "Box 4-5 (gemeistert)", value: (boxCounts[4] || 0) + (boxCounts[5] || 0) }
    ];

    tiles.forEach(function (tile) {
        const el = document.createElement("div");
        el.className = "stat-tile";

        const value = document.createElement("span");
        value.className = "stat-value";
        value.textContent = String(tile.value);

        const label = document.createElement("span");
        label.className = "stat-label";
        label.textContent = tile.label;

        el.append(value, label);
        dashboard.appendChild(el);
    });
}