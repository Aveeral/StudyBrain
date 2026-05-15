const express = require("express");
const courseRoutes = require("./routes/courses.js");
const documentRoutes = require("./routes/document.js");
const dotenv =  require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/courses",courseRoutes)
app.use("/courses",documentRoutes);


app.get("/health", (req, res) => {
  res.json({ 
    status: "ok",
    message: "StudyBrain is running"
  });
});


app.listen(PORT, () => {
  console.log(`StudyBrain server running on port ${PORT}`);
}); 