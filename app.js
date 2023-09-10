const express = require('express');
const { generateAListForTopic } = require('./openai');
const questionnair = require('./questionnair');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json()); // Add JSON body parser middleware



app.get('/api/getQuestion', (req, res) => {
    // const questionIds = Object.keys(questionsDictionary);
    // const randomQuestionId = questionIds[Math.floor(Math.random() * questionIds.length)];
    // const randomQuestion = questionsDictionary[randomQuestionId];
    // res.json(randomQuestion);
    res.json(questionnair.getRandomQuestion());
});



app.post('/api/answerQuestion', (req, res) => {
    const questionId = req.body.questionId;
    const userAnswer = req.body.userAnswer;
    questionnair.markQuestion(questionId, userAnswer);
    res.json(`Recorded answer for question ${questionId}`);
});


app.listen(port, async () => {
    console.log(`Server listening at http://localhost:${port}`);
    questionnair.factoryQuestionnaire(await generateAListForTopic('France'));
    console.log(`ready to serve questions`);
    
}
);
