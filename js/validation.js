function validateCardInput(question, answer) {
  const errors = [];
  if (!question || question.trim().length === 0) {
    errors.push("Bitte eine Frage eingeben.");
  }
  if (!answer || answer.trim().length === 0) {
    errors.push("Bitte eine Antwort eingeben.");
  }
 if (question && question.trim().length > 200) {
    errors.push("Die Frage ist zu lang (maximal 200 Zeichen).");
  }
  return errors;
}
function generateCardId() {
  return "card-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
}
