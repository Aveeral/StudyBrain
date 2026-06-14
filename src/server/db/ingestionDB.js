const pool = require("./pool.js");

async function insertChunks(chunkObjects,document_id,user_id,course_id){

    for(let i=0;i<chunkObjects.length;i++){
        await pool.query("INSERT INTO chunks(chunk_index,content,embeddings,course_id,user_id,document_id) VALUES($1,$2,$3,$4,$5,$6)",
            [chunkObjects[i].chunk_index,chunkObjects[i].content,JSON.stringify(chunkObjects[i].embeddings),course_id,user_id,document_id]
        )
    }
}

module.exports = insertChunks;