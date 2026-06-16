const queryChunks = require('./queryService.js');
const buildPrompt = require('./promptService.js');
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



async function buildAnswer(question,course_id,user_id){
    const chunks = await queryChunks(question,course_id,user_id);
    const Prompt = buildPrompt(question,chunks);
    const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
        { role: 'system', content: Prompt.systemPrompt },
        { role: 'user', content: Prompt.userPrompt }
    ]
    });
    return response.choices[0].message.content;
}

module.exports = buildAnswer;