const express = require("express");
const session = require("express-session");
const fetch   = require("node-fetch");
const fs      = require("fs");
const path    = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

// ── Configurações ──────────────────────────────────────────────
const PORT           = process.env.PORT || 3000;
const CLIENT_ID      = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET  = process.env.DISCORD_CLIENT_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET || "test123";
const BASE_URL       = process.env.BASE_URL; // 

const REDIRECT_URI   = `${BASE_URL}/api/auth/callback`;
const SCRIPTS_FILE   = path.join(__dirname, "scripts.json");

// ── Middlewares ────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 dias
}));

// ── Helpers de scripts ─────────────────────────────────────────
function loadScripts() {
  if (!fs.existsSync(SCRIPTS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(SCRIPTS_FILE, "utf8"));
  } catch {
    return [];
  }
}

function saveScripts(scripts) {
  fs.writeFileSync(SCRIPTS_FILE, JSON.stringify(scripts, null, 2));
}

// ── Auth: verificar login ──────────────────────────────────────
app.get("/api/auth/me", (req, res) => {
  if (req.session && req.session.user) {
    res.json({ logged: true, user: req.session.user });
  } else {
    res.json({ logged: false });
  }
});

// ── Auth: redireciona para Discord ────────────────────────────
app.get("/api/auth/login", (req, res) => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${1427379744596562101}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;
  res.redirect(url);
});

// ── Auth: callback do Discord ─────────────────────────────────
app.get("/api/auth/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.redirect("/");

  try {
    // Troca o code por um token
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id:     CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type:    "authorization_code",
        code,
        redirect_uri:  REDIRECT_URI
      })
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      console.error("Token error:", tokenData);
      return res.redirect("/");
    }

    // Busca dados do usuário
    const userRes  = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const user = await userRes.json();

    // Salva na sessão
    req.session.user = {
      id:       user.id,
      username: user.username,
      avatar:   user.avatar
    };

    res.redirect("/");

  } catch (e) {
    console.error("Callback error:", e);
    res.redirect("/");
  }
});

// ── Auth: logout ───────────────────────────────────────────────
app.get("/api/auth/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// ── Middleware: checar se está logado ──────────────────────────
function requireAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  res.status(401).json({ error: "Not authenticated" });
}

// ── Gerar script ───────────────────────────────────────────────
app.post("/api/generate", requireAuth, (req, res) => {
  const { content, obfuscate } = req.body;

  if (!content) return res.status(400).json({ error: "No content" });

  const id      = uuidv4();
  const scripts = loadScripts();

  const newScript = {
    id,
    userId:   req.session.user.id,
    code:     content,
    obfuscate: !!obfuscate,
    disabled: false,
    createdAt: new Date().toISOString()
  };

  scripts.push(newScript);
  saveScripts(scripts);

  // URL raw do script
  const rawUrl = `${BASE_URL}/api/raw/${id}`;
  res.json({ raw: rawUrl, id });
});

// ── Servir script raw ──────────────────────────────────────────
app.get("/api/raw/:id", (req, res) => {
  const scripts = loadScripts();
  const script  = scripts.find(s => s.id === req.params.id);

  if (!script) return res.status(404).send("-- Script not found");
  if (script.disabled) return res.status(403).send("-- Script disabled");

  res.setHeader("Content-Type", "text/plain");
  res.send(script.code);
});

// ── Listar meus scripts ────────────────────────────────────────
app.get("/api/myscripts", requireAuth, (req, res) => {
  const scripts = loadScripts();
  const mine    = scripts.filter(s => s.userId === req.session.user.id);
  res.json(mine);
});

// ── Atualizar script ───────────────────────────────────────────
app.post("/api/update", requireAuth, (req, res) => {
  const { id, code } = req.body;
  const scripts = loadScripts();
  const index   = scripts.findIndex(s => s.id === id && s.userId === req.session.user.id);

  if (index === -1) return res.status(404).send("Not found");

  scripts[index].code = code;
  saveScripts(scripts);
  res.send("OK");
});

// ── Desativar script ───────────────────────────────────────────
app.post("/api/disable", requireAuth, (req, res) => {
  const { id } = req.body;
  const scripts = loadScripts();
  const index   = scripts.findIndex(s => s.id === id && s.userId === req.session.user.id);

  if (index === -1) return res.status(404).send("Not found");

  scripts[index].disabled = true;
  saveScripts(scripts);
  res.send("OK");
});

// ── Ativar script ──────────────────────────────────────────────
app.post("/api/enable", requireAuth, (req, res) => {
  const { id } = req.body;
  const scripts = loadScripts();
  const index   = scripts.findIndex(s => s.id === id && s.userId === req.session.user.id);

  if (index === -1) return res.status(404).send("Not found");

  scripts[index].disabled = false;
  saveScripts(scripts);
  res.send("OK");
});

// ── Deletar script ─────────────────────────────────────────────
app.post("/api/delete", requireAuth, (req, res) => {
  const { id } = req.body;
  let scripts = loadScripts();
  const before = scripts.length;

  scripts = scripts.filter(s => !(s.id === id && s.userId === req.session.user.id));

  if (scripts.length === before) return res.status(404).send("Not found");

  saveScripts(scripts);
  res.send("OK");
});

// ── Start ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
