const pool = require("./pool.js");

async function findAll(course_id) {
      const {rows} = await pool.query("SELECT * FROM documents WHERE course_id = $1",[course_id]);
      return rows;
}

async function findById(id,course_id) {
      const {rows} = await pool.query("SELECT * FROM documents WHERE id=$1 AND course_id=$2",[id,course_id]);
      return rows[0];
}

async function create(name,course_id){
    const {rows} =  await pool.query("INSERT INTO documents(name,course_id) VALUES($1,$2) RETURNING *",[name,course_id]);
    return rows[0];
}

async function update(name,id,course_id) {
    const {rows} = await pool.query("UPDATE documents SET name = $1 WHERE id = $2 AND course_id = $3 RETURNING *",[name,id,course_id]);
    return rows[0];
}

async function remove(id,course_id){
    const {rows} = await pool.query("DELETE FROM documents WHERE id = $1 AND course_id = $2 RETURNING *",[id,course_id]);
    return rows[0];
}

module.exports = {findAll,findById,create,update,remove};