const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const basicAuth = require('basic-auth');
const dotenv = require('dotenv');
const { db } = require('./db.cjs');
const crypto = require('crypto');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '200kb' }));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

function getIp(req) {
  return (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').toString();
}

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
}

app.post('/api/submit', (req, res) => {
  const body = req.body || {};
  const id = createId();
  const now = new Date().toISOString();
  const ip = getIp(req);

  const stmt = db.prepare(`INSERT INTO submissions (id,type,name,email,phone,message,tiktokUsername,discordUsername,telegramUsername,pageUrl,referrer,userAgent,ip,consent,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
  stmt.run(
    id,
    body.type || 'streamer',
    body.name || '',
    body.email || '',
    body.phone || '',
    body.message || '',
    body.tiktokUsername || '',
    body.discordUsername || '',
    body.telegramUsername || '',
    body.pageUrl || '',
    body.referrer || '',
    body.userAgent || '',
    ip,
    body.consent ? 1 : 0,
    now,
    function (err) {
      if (err) return res.status(500).json({ error: 'db_error', details: err.message });
      res.json({ ok: true, id, createdAt: now });
    }
  );
  stmt.finalize();
});

app.post('/api/visit', (req, res) => {
  const body = req.body || {};
  const id = createId();
  const now = new Date().toISOString();
  const ip = getIp(req);

  const stmt = db.prepare(`INSERT INTO visits (id,path,referrer,userAgent,language,ip,createdAt) VALUES (?,?,?,?,?,?,?)`);
  stmt.run(id, body.path || '', body.referrer || '', body.userAgent || '', body.language || '', ip, now, function (err) {
    if (err) return res.status(500).json({ error: 'db_error', details: err.message });
    res.json({ ok: true });
  });
  stmt.finalize();
});

function requireAdmin(req, res, next) {
  const user = basicAuth(req);
  const adminUser = process.env.ADMIN_USER || 'admin@novaboost.cloud';
  const adminPass = process.env.ADMIN_PASS || 'An041219na.27';
  if (!user || user.name !== adminUser || user.pass !== adminPass) {
    res.set('WWW-Authenticate', 'Basic realm="Admin"');
    return res.status(401).send('Unauthorized');
  }
  next();
}

app.get('/api/submissions', requireAdmin, (req, res) => {
  db.all('SELECT * FROM submissions ORDER BY createdAt DESC LIMIT 500', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true, submissions: rows });
  });
});

app.get('/api/visits', requireAdmin, (req, res) => {
  db.all('SELECT * FROM visits ORDER BY createdAt DESC LIMIT 500', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true, visits: rows });
  });
});

app.post('/api/profiles', requireAdmin, (req, res) => {
  const body = req.body || {};
  const id = createId();
  const now = new Date().toISOString();
  const stmt = db.prepare(`INSERT INTO profiles (id,tiktokId,data,createdAt) VALUES (?,?,?,?)`);
  stmt.run(id, body.tiktokId || '', JSON.stringify(body.data || {}), now, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true, id });
  });
  stmt.finalize();
});

app.get('/api/profiles', requireAdmin, (req, res) => {
  db.all('SELECT * FROM profiles ORDER BY createdAt DESC LIMIT 500', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true, profiles: rows.map(r => ({ ...r, data: JSON.parse(r.data || '{}') })) });
  });
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
