const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const retrieve = require("../db/retrievalDB.js");

async function queryChunks(userQuery,course_id,user_id){
    const trimmed_query = userQuery.trim();
    if(!trimmed_query){
        const err = new Error("Please enter a query!");
        err.status = 400;
        throw err;
    }
    const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: trimmed_query
    });

    return await retrieve(queryEmbedding.data[0].embedding,course_id,user_id);
}

module.exports = queryChunks;