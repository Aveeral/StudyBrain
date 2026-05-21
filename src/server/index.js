const express = require("express");
const courseRoutes = require("./routes/courses.js");
const documentRoutes = require("./routes/documents.js");
const dotenv =  require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/courses",courseRoutes)
app.use("/courses",documentRoutes);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  res.status(status).json({ error: message });
});


app.get("/health", (req, res) => {
  res.json({ 
    status: "ok",
    message: "StudyBrain is running"
  });
});


app.listen(PORT, () => {
  console.log(`StudyBrain server running on port ${PORT}`);
}); 