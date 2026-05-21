const pool = require("./pool.js");

async function findAll() {
    const {rows} = await pool.query('SELECT * FROM courses');
    return rows;
}

async function findById(id) {
    const {rows} = await pool.query('SELECT * FROM courses WHERE id = $1',[id]);
    return rows[0];
}

async function create(name){
    const {rows} = await pool.query('INSERT INTO courses(name) VALUES($1) RETURNING *',[name]);
    return rows[0];
}

async function update(name,id){
    const {rows} = await pool.query('UPDATE courses SET name = $1 WHERE id = $2 RETURNING *',[name,id]);
    return rows[0];
}

async function remove(id){
    const {rows} = await pool.query('DELETE FROM courses WHERE id = $1 RETURNING *',[id]);
    return rows[0];
}

module.exports = {findAll,findById,create,update,remove}