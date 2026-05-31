const pool = require("./pool.js");

async function findAll(user_id) {
    
    const {rows} = await pool.query('SELECT * FROM courses WHERE user_id = $1',[user_id]);
    return rows;
}

async function findById(id,user_id) {
    const {rows} = await pool.query('SELECT * FROM courses WHERE id = $1 AND user_id=$2',[id,user_id]);
    return rows[0];
}

async function create(name,user_id){
    const {rows} = await pool.query('INSERT INTO courses(name,user_id) VALUES($1,$2) RETURNING *',[name,user_id]);
    return rows[0];
}

async function update(name,id,user_id){
    const {rows} = await pool.query('UPDATE courses SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING *',[name,id,user_id]);
    return rows[0];
}

async function remove(id,user_id){
    const {rows} = await pool.query('DELETE FROM courses WHERE id = $1 AND user_id = $2 RETURNING *',[id,user_id]);
    return rows[0];
}

module.exports = {findAll,findById,create,update,remove}