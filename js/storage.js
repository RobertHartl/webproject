// Gruppe: WI_A_Gruppe_5

const STORAGE_KEY = "karteikarten-app-data";

function createDefaultState() {
  return {
    cards: [],
    sessionCount: 0,
    stats: {
      totalReviews: 0,
      correctReviews: 0
    }
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultState();
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.cards)) {
      return createDefaultState();
    }
    if (typeof parsed.sessionCount !== "number") {
      parsed.sessionCount = 0;
    }
    if (!parsed.stats || typeof parsed.stats.totalReviews !== "number" ||
        typeof parsed.stats.correctReviews !== "number") {
      parsed.stats = { totalReviews: 0, correctReviews: 0 };
    }
    return parsed;
  } catch (error) {
    console.warn("Gespeicherte Daten waren beschädigt, starte mit leerem Zustand.", error);
    return createDefaultState();
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Zustand konnte nicht gespeichert werden.", error);
  }
}
