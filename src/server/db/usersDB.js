const pool = require("./pool.js");

async function createUser(email,password_hash,display_name){
   const {rows} = await pool.query("INSERT INTO users(email,password_hash,display_name) VALUES($1,$2,$3) RETURNING *",[email,password_hash,display_name]);
   return rows[0];
}

async function getUserByEmail(email){
   const {rows} = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
   return rows[0];
}

module.exports = { createUser, getUserByEmail };