import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = "./db.json";

// читать данные
const readDB = () => JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));

// сохранять данные
const writeDB = (data) =>
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// GET tasks
app.get("/tasks", (req, res) => {
  const db = readDB();
  res.json(db.tasks);
});

// POST task
app.post("/tasks", (req, res) => {
  const db = readDB();

  const newTask = {
    ...req.body,
    id: Date.now().toString(),
  };

  db.tasks.push(newTask);
  writeDB(db);

  res.json(newTask);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const db = readDB();

  db.tasks = db.tasks.filter((t) => t.id !== req.params.id);
  writeDB(db);

  res.json({ ok: true });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("API running on port " + PORT);
});