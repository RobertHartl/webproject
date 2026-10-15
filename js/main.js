// Gruppenname: WI_A_Gruppe_5

let appState = createDefaultState();

function switchView(viewName) {
  const views = document.querySelectorAll(".view");
  views.forEach(function (view) {
    view.hidden = view.id !== "view-" + viewName;
  });

  const navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach(function (button) {
    button.setAttribute("aria-pressed", String(button.dataset.view === viewName));
  });

  if (viewName === "overview") {
    renderCardOverview(appState);
  } else if (viewName === "session") {
    renderSessionView(appState);
  } else if (viewName === "stats") {
    renderCategoryFilter(appState);
    renderStatsDashboard(appState);
  }
}

function initStatsControls() {
  document.getElementById("category-filter").addEventListener("change", function () {
    renderStatsDashboard(appState);
  });
}

function initNavigation() {
  document.querySelectorAll(".nav-button").forEach(function (button) {
    button.addEventListener("click", function () {
      switchView(button.dataset.view);
    });
  });
}

function initCardForm() {
  const form = document.getElementById("card-form");
  const errorOutput = document.getElementById("form-error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const category = document.getElementById("card-category").value;
    const question = document.getElementById("card-question").value;
    const answer = document.getElementById("card-answer").value;

    const errors = validateCardInput(question, answer);

    if (errors.length > 0) {
      errorOutput.textContent = errors.join(" ");
      errorOutput.hidden = false;
      return;
    }

    errorOutput.hidden = true;

    addCard(appState, category, question, answer);
    form.reset();
  });
}

function initSessionControls() {
  document.getElementById("session-start-button").addEventListener("click", function () {
    startSession(appState);
  });
  document.getElementById("flip-trigger").addEventListener("click", flipCurrentCard);
  document.getElementById("rate-correct").addEventListener("click", function () {
    rateCurrentCard(appState, true);
  });
  document.getElementById("rate-wrong").addEventListener("click", function () {
    rateCurrentCard(appState, false);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  appState = loadState();
  initNavigation();
  initCardForm();
  initSessionControls();
  initStatsControls();
  renderCardOverview(appState);
});