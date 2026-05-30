const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dataDir = path.resolve(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const DB_PATH = path.join(dataDir, "db.sqlite");
const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    type TEXT,
    name TEXT,
    email TEXT,
    phone TEXT,
    message TEXT,
    tiktokUsername TEXT,
    discordUsername TEXT,
    telegramUsername TEXT,
    pageUrl TEXT,
    referrer TEXT,
    userAgent TEXT,
    ip TEXT,
    consent INTEGER DEFAULT 1,
    createdAt TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS visits (
    id TEXT PRIMARY KEY,
    path TEXT,
    referrer TEXT,
    userAgent TEXT,
    language TEXT,
    ip TEXT,
    createdAt TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY,
    tiktokId TEXT,
    data TEXT,
    createdAt TEXT
  )`);

  const ensureSubmissionColumn = (name, type) => {
    db.get(`PRAGMA table_info(submissions)`, (err, row) => {
      db.all(`PRAGMA table_info(submissions)`, (err2, rows) => {
        if (err2 || !rows.some((column) => column.name === name)) {
          db.run(`ALTER TABLE submissions ADD COLUMN ${name} ${type}`);
        }
      });
    });
  };

  ensureSubmissionColumn("tiktokUsername", "TEXT");
  ensureSubmissionColumn("discordUsername", "TEXT");
  ensureSubmissionColumn("telegramUsername", "TEXT");
});

module.exports = {
  db,
  DB_PATH,
};
