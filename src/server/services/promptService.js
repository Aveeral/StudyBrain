
function buildPrompt(question,chunks){

    const systemPrompt = `You are a study assistant. answer only from the provided context.
    But you may define technical terms if they are not explained in the context.
    
    When you use information from a chunk, cite it by referring to its position, 
    for example: "According to chunk 1..." or "(Source: chunk 2)".

    If the answer is not found in the provided context, say "I couldn't find 
    information about this in your notes." `;

    const context = chunks.map((chunk, index) => 
    `[Chunk ${index + 1}]\n${chunk.content}`
    ).join('\n\n');

    const userPrompt = `
    Question: ${question},
    ------CONTEXT-----

    ${context}

    `;
    const Prompt = {systemPrompt,userPrompt};
    return Prompt;
}

module.exports = buildPrompt;