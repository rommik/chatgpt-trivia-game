// Sample list of questions and answers
let questionDict ={};

  function factoryQuestionnaire(questions){
    questionDict = questions;
  }
// Function to randomly pick an unanswered question/answer pair
function getRandomQuestion() {
  const unansweredQuestions = Object.entries(questionDict)
    .filter(([_, question]) => !question.isAnswered);

  if (unansweredQuestions.length === 0) {
    console.log("All questions have been answered.");
    return null; // Return null if all questions have been answered
  }

  const [randomId, randomQuestion] = unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)];
  return { id: randomId, ...randomQuestion };
}

// Function to mark a question as answered correctly or wrongly
function markQuestion(id, isCorrect) {
  if (questionDict[id]) {
    questionDict[id].isAnswered = true;
    questionDict[id].isCorrect = isCorrect;
  }
}

  module.exports ={
    factoryQuestionnaire,
    getRandomQuestion,
    markQuestion
  }