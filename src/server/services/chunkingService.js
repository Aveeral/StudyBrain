
async function chunkText(text,chunkSize = 1000,overlap = 100){
    const trimmed = text.trim();
    if(!trimmed){
        const err = new Error("The file is empty. Pls enter valid document!");
        err.status = 400;
        throw err;
    }
    const chunkObjects = [];
    for(let i=0;i<trimmed.length;i += chunkSize-overlap){
        chunkObjects.push({chunk_index: chunkObjects.length,content: trimmed.slice(i,i+chunkSize)});
    }
    return chunkObjects;
}

module.exports = chunkText;