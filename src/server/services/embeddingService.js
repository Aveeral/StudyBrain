const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateEmbedding(chunkObjects){
    const chunks = chunkObjects.map(chunk => chunk.content);

    const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: chunks
    });
    for(let i=0;i<chunkObjects.length;i++){
        chunkObjects[i].embeddings = response.data[i].embedding;
    }
    
    return chunkObjects;
}

module.exports = generateEmbedding;