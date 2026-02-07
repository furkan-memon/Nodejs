const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// user API
app.get("/api/user", (req, res) => {
  res.json({
    name: "Furkan",
    role: "Frontend Developer",
    city: "Surat"
  });
});

// skills API
app.get("/api/skills", (req, res) => {
  res.json([
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js"
  ]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
