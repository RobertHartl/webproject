// Gruppe: WI_A_Gruppe_5

const MAX_CATEGORY_LENGTH = 40;
const MAX_QUESTION_LENGTH = 200;
const MAX_ANSWER_LENGTH = 500;

function isDuplicateQuestion(question, cards) {
  const normalizedQuestion = question.toLowerCase();
  return cards.some(function (card) {
    return card.question.toLowerCase() === normalizedQuestion;
  });
}

function validateCardInput(cardInput, existingCards) {
  const errors = [];
  const category = cardInput.category.trim();
  const question = cardInput.question.trim();
  const answer = cardInput.answer.trim();

  if (question.length === 0) {
    errors.push("Bitte eine Frage eingeben.");
  } else if (question.length > MAX_QUESTION_LENGTH) {
    errors.push(
      "Die Frage ist zu lang (maximal " + MAX_QUESTION_LENGTH + " Zeichen).",
    );
  } else if (isDuplicateQuestion(question, existingCards)) {
    errors.push("Diese Frage existiert bereits.");
  }

  if (answer.length === 0) {
    errors.push("Bitte eine Antwort eingeben.");
  } else if (answer.length > MAX_ANSWER_LENGTH) {
    errors.push(
      "Die Antwort ist zu lang (maximal " + MAX_ANSWER_LENGTH + " Zeichen).",
    );
  }

  if (category.length > MAX_CATEGORY_LENGTH) {
    errors.push(
      "Die Kategorie ist zu lang (maximal " +
        MAX_CATEGORY_LENGTH +
        " Zeichen).",
    );
  }

  return errors;
}
