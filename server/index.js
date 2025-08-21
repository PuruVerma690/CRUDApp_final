import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import { readDB, writeDB } from "./storage.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);
app.use(express.json());

const PORT = process.env.PORT || 4000;

function validateItem(body, isCreate = true) {
  const required = [
    "name",
    "edition_id",
    "status",
    "edition_link",
    "published_at",
    "thumbnail",
  ];
  const errors = [];

  required.forEach((k) => {
    if (
      isCreate &&
      (body[k] === undefined || body[k] === null || body[k] === "")
    ) {
      errors.push(`Missing field: ${k}`);
    }
  });

  return errors;
}

app.get("/api/items", (req, res) => {
  const db = readDB();
  res.json(db.items);
});

app.post("/api/items", (req, res) => {
  const errors = validateItem(req.body, true);
  if (errors.length) return res.status(400).json({ errors });

  const now = new Date().toISOString();
  const newItem = {
    _id: nanoid(),
    name: req.body.name,
    edition_id: req.body.edition_id,
    status: req.body.status,
    edition_link: req.body.edition_link,
    published_at: req.body.published_at,
    createdAt: now,
    updatedAt: now,
    thumbnail: req.body.thumbnail,
    __v: 0,
  };

  const db = readDB();
  db.items.push(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.put("/api/items/:id", (req, res) => {
  const db = readDB();
  const idx = db.items.findIndex((i) => i._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });

  const errors = validateItem(req.body, true);
  if (errors.length) return res.status(400).json({ errors });

  const existing = db.items[idx];
  const updated = {
    ...existing,
    name: req.body.name,
    edition_id: req.body.edition_id,
    status: req.body.status,
    edition_link: req.body.edition_link,
    published_at: req.body.published_at,
    thumbnail: req.body.thumbnail,
    updatedAt: new Date().toISOString(),
    __v: (existing.__v ?? 0) + 1,
  };

  db.items[idx] = updated;
  writeDB(db);
  res.json(updated);
});

app.patch("/api/items/:id", (req, res) => {
  const db = readDB();
  const idx = db.items.findIndex((i) => i._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });

  const existing = db.items[idx];
  const allowed = [
    "name",
    "edition_id",
    "status",
    "edition_link",
    "published_at",
    "thumbnail",
  ];
  const patch = {};
  allowed.forEach((k) => {
    if (req.body[k] !== undefined) patch[k] = req.body[k];
  });

  const updated = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString(),
    __v: (existing.__v ?? 0) + 1,
  };

  db.items[idx] = updated;
  writeDB(db);
  res.json(updated);
});

app.delete("/api/items/:id", (req, res) => {
  const db = readDB();
  const idx = db.items.findIndex((i) => i._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });

  const removed = db.items.splice(idx, 1)[0];
  writeDB(db);
  res.json({ deleted: removed._id });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
