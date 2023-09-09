const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json()); // Add JSON body parser middleware

// Define your dictionary of questions and answers
const questionsDictionary = {
    1: {id:1, question: 'What is the capital of France?', answer: 'Paris' },
    2: { id:2, question: 'Who wrote "Romeo and Juliet"?', answer: 'William Shakespeare' },
    // Add more questions and answers as needed
};

app.get('/api/getQuestion', (req, res) => {
    const questionIds = Object.keys(questionsDictionary);
    const randomQuestionId = questionIds[Math.floor(Math.random() * questionIds.length)];
    const randomQuestion = questionsDictionary[randomQuestionId];
    res.json(randomQuestion);
});

const userAnswers ={
    1: {isCorrect: true},
    2: {isCorrect: false},
}
    
app.post('/api/answerQuestion', (req, res) => {
    const questionId = req.body.questionId;
    const userAnswer = req.body.userAnswer;
    console.log(questionId, userAnswers);
    userAnswers[questionId] = userAnswer;
    res.json();
});



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
}
);
