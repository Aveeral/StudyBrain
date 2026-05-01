const express = require("express");
const dotenv =  require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ 
    status: "ok",
    message: "StudyBrain is running"
  });
});

app.listen(PORT, () => {
  console.log(`StudyBrain server running on port ${PORT}`);
}); 