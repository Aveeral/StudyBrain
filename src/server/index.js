express = require("express");

const app = express();
const PORT = 3000;

app.get("/",(req,res) => {
    res.send(`Hello ${req.query.name} `);
})

app.listen(PORT,() => {console.log("STUDY BRAIN IS NOW RUNNING")})