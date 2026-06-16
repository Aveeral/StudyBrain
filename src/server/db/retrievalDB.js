const pool = require("./pool.js");

async function retrieve(queryEmbedding,course_id,user_id){
   const query = `
    SELECT id, content, chunk_index, 1 - (embeddings <=> $1) AS similarity
    FROM chunks
    WHERE course_id = $2 AND user_id = $3
    ORDER BY embeddings <=> $1
    LIMIT 5
`;

const { rows } = await pool.query(query, [JSON.stringify(queryEmbedding),course_id,user_id]);
return rows;
}

module.exports = retrieve;