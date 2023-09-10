const express = require('express');
const { generateAListForTopic } = require('./openai');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json()); // Add JSON body parser middleware

// Define your dictionary of questions and answers
let questionsDictionary = {
};

app.get('/api/getQuestion', (req, res) => {
    const questionIds = Object.keys(questionsDictionary);
    const randomQuestionId = questionIds[Math.floor(Math.random() * questionIds.length)];
    const randomQuestion = questionsDictionary[randomQuestionId];
    res.json(randomQuestion);
});

const userAnswers = {
    1: { isCorrect: true },
    2: { isCorrect: false },
}

app.post('/api/answerQuestion', (req, res) => {
    const questionId = req.body.questionId;
    const userAnswer = req.body.userAnswer;
    console.log(questionId, userAnswers);
    userAnswers[questionId] = userAnswer;
    res.json();
});


app.listen(port, async () => {
    console.log(`Server listening at http://localhost:${port}`)
    questionsDictionary = await generateAListForTopic('France');
}
);
