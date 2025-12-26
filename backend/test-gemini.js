require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

async function testGemini() {
    const log = { success: false, error: null, output: null };

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        console.log(`Testing Gemini API with key: ${apiKey?.substring(0, 10)}...`);

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = "Hello, tell me a short joke.";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("Success! Response:", text);
        log.success = true;
        log.output = text;

    } catch (error) {
        console.error("Gemini Error:", error);
        log.error = {
            message: error.message,
            stack: error.stack,
            full: JSON.stringify(error, Object.getOwnPropertyNames(error))
        };
    } finally {
        fs.writeFileSync('gemini-result.json', JSON.stringify(log, null, 2));
    }
}

testGemini();
