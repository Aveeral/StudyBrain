const pool = require("./pool.js");

async function findAll(course_id) {
      const {rows} = await pool.query("SELECT * FROM documents WHERE course_id = $1",[course_id]);
      return rows;
}

async function findById(id) {
      const {rows} = await pool.query("SELECT * FROM documents WHERE id=$1",[id]);
      return rows[0];
}

async function create(name,course_id){
    const {rows} =  await pool.query("INSERT INTO documents(name,course_id) VALUES($1,$2) RETURNING *",[name,course_id]);
    return rows[0];
}

async function update(name,id) {
    const {rows} = await pool.query("UPDATE documents SET name = $1 WHERE id = $2 RETURNING *",[name,id]);
    return rows[0];
}

async function remove(id){
    const {rows} = await pool.query("DELETE FROM documents WHERE id = $1 RETURNING *",[id]);
    return rows[0];
}

module.exports = {findAll,findById,create,update,remove};