const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


async function generateAListForTopic(topic) {
    try {
      const prompt = `Generate a list of questions and answers about ${topic} so that I can test my knowledge.
                     Return it as a JSON object in format as this example {id: 1, question: "What is the capital of France?", answer: "Paris"}.`;
      let chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
    });
  
      return JSON.parse(chatCompletion.choices[0].message.content);
  
    } catch (error) {
      console.error('Error generating QA list:', error.message);
      throw error;
    }
  }

  module.exports ={
        generateAListForTopic
  }