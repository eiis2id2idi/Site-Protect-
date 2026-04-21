<!DOCTYPE html>
<html lang="es">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ORRXL4 PROTECTOR</title>

<style>

body {
  margin: 0;
  background: #000;
  color: #00aaff;
  font-family: Arial, sans-serif;
  overflow-x: hidden;
}

/* ================= TOPBAR ================= */

.topbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #000;
  border-bottom: 1px solid #00aaff;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1000;
}

.logo {
  font-weight: bold;
  color: #00aaff;
}

.loginTopBtn {
  background: #5865F2;
  color: white;
  border: none;

  padding: 8px 14px;
  border-radius: 6px;

  cursor: pointer;
  font-size: 14px;
}

.loginTopBtn:hover {
  background: #4752c4;
}

/* ================= MENU ================= */

#menuBtn {
  position: fixed;
  top: 18px;
  left: 15px;
  font-size: 22px;
  cursor: pointer;
  z-index: 1100;
}

#sideMenu {
  position: fixed;
  top: 0;
  left: -220px;
  width: 200px;
  height: 100%;
  background: #111;
  transition: 0.3s;
  padding-top: 60px;
  z-index: 1099;
}

#sideMenu.open {
  left: 0;
}

.menuItem {
  padding: 15px;
  color: white;
  cursor: pointer;
  border-bottom: 1px solid #222;
}

.menuItem:hover {
  background: #222;
}

/* ================= SPLASH ================= */

#splash {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 9999;
}

#splash h1 {
  font-size: 32px;
  animation: glow 1.5s infinite alternate;
}

@keyframes glow {
  from { text-shadow: 0 0 10px #00aaff; }
  to   { text-shadow: 0 0 25px #00ffff; }
}

.loader {
  margin-top: 30px;
  width: 200px;
  height: 6px;

  background: #111;
  border-radius: 10px;
  overflow: hidden;
}

.loader-bar {
  height: 100%;
  width: 0%;
  background: #00aaff;
  animation: load 2.5s forwards;
}

@keyframes load {
  to { width: 100%; }
}

/* ================= MAIN ================= */

.container {
  width: 90%;
  max-width: 500px;

  margin: 120px auto;
  text-align: center;

  display: none;
}

textarea {
  width: 100%;
  height: 150px;

  background: #111;
  border: 1px solid #00aaff;
  color: #00aaff;

  padding: 10px;
  border-radius: 8px;

  resize: none;
  box-sizing: border-box;
}

input[type="file"] {
  margin-top: 15px;
  color: white;
  width: 100%;
}

button {
  margin-top: 20px;
  width: 100%;

  padding: 12px;

  background: #00aaff;
  border: none;
  border-radius: 8px;

  color: black;
  font-weight: bold;
  font-size: 16px;

  cursor: pointer;
}

button:hover {
  background: #0088cc;
}

.result {
  margin-top: 25px;
  word-break: break-all;
}

.box {
  background: #111;
  border: 1px solid #00aaff;
  border-radius: 8px;

  padding: 10px;
  margin-top: 10px;

  overflow-x: auto;
}

.copyBtn {
  margin-top: 10px;
  background: #00ffcc;
}

.success {
  margin-top: 10px;
  color: #00ffcc;
  font-size: 13px;
}

.toggleBox {
  margin-top: 15px;
  text-align: left;
  font-weight: bold;
}

/* ================= MY SCRIPTS ================= */

#myScriptsPage {
  display: none;
  padding: 100px 20px;
}

.scriptCard {
  background: #111;
  border: 1px solid #00aaff;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
}

.scriptCard pre {
  white-space: pre-wrap;
  word-break: break-word;
  overflow-x: auto;
  max-width: 100%;

  background: #000;
  padding: 8px;
  border-radius: 6px;
  font-size: 12px;
}

  .scriptCard button {
  width: auto;
  margin-top: 0;
  padding: 4px 8px;
  font-size: 12px;
  }

</style>
</head>

<body>

<!-- MENU -->
<div id="menuBtn">â˜°</div>

<div id="sideMenu">
  <div class="menuItem" onclick="showPage('protector')">Protector</div>
  <div class="menuItem" onclick="showPage('myscripts')">My Scripts</div>
</div>

<!-- TOPBAR -->
<div class="topbar">
  <div class="logo"></div>
  <div id="topUserArea"></div>
</div>

<!-- SPLASH -->
<div id="splash">
  <h1>ORRXL4 PROTECTOR ðŸ”’</h1>
  <div class="loader">
    <div class="loader-bar"></div>
  </div>
</div>

<!-- PROTECTOR -->
<div id="protectorPage">
  <div class="container" id="mainContent">

    <h2>ORRXL4 PROTECTOR ðŸ”’</h2>

    <textarea id="textInput" placeholder="Paste your Lua script here..."></textarea>

    <input type="file" id="fileInput" accept=".txt,.lua,.js,.py">

    <div class="toggleBox">
      <label>
        <input type="checkbox" id="obfToggle">
        Obf Source
      </label>
    </div>

    <button onclick="generate()">GENERATE LOADSTRING</button>

    <div class="result" id="result"></div>

  </div>
</div>

<!-- MY SCRIPTS -->
<div id="myScriptsPage">
  <h2>My Scripts</h2>
  <div id="scriptsContainer">Nada aÃºn...</div>
</div>

<script>

setTimeout(() => {
  document.getElementById("splash").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
  checkUser();
}, 2600);

/* MENU */

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.onclick = () => {
  sideMenu.classList.toggle("open");
};

function showPage(page) {
  document.getElementById("protectorPage").style.display = "none";
  document.getElementById("myScriptsPage").style.display = "none";

  if (page === "protector") {
    document.getElementById("protectorPage").style.display = "block";
  } else {
    document.getElementById("myScriptsPage").style.display = "block";
    loadMyScripts();
  }
}

/* USER */

async function checkUser() {
  try {
    const res = await fetch("/api/auth/me");
    const data = await res.json();

    const topArea = document.getElementById("topUserArea");

    if (data.logged) {

      const user = data.user;
      const avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

      topArea.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${avatar}" width="32" style="border-radius:50%;">
          <span>${user.username}</span>
          <span onclick="logout()" style="cursor:pointer;">â»</span>
        </div>
      `;

    } else {

      topArea.innerHTML = `
        <a href="/api/auth/login">
          <button class="loginTopBtn">Sign in with Discord</asyncd>
        </a>
      `;

    }

  } catch {}
}

function logout() {
  window.location.href = "/api/auth/logout";
}

/* GENERATE */

async function generate() {

  const res = await fetch("/api/auth/me");
  const data = await res.json();

  if (!data.logged) {
    alert("You need to sign in first!");
    return;
  }

  const textArea  = document.getElementById("textInput");
  const fileInput = document.getElementById("fileInput");
  const resultDiv = document.getElementById("result");
  const obfToggle = document.getElementById("obfToggle");

  let content = textArea.value;

  if (!content && fileInput.files.length > 0) {
    content = await fileInput.files[0].text();
  }

  if (!content) {
    alert("Write your Lua script or upload a file");
    return;
  }

  resultDiv.innerHTML = "Generating...";

  try {

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        obfuscate: obfToggle.checked
      })
    });

    const dataRes = await response.json();
    const rawUrl = dataRes.raw;

    const loadingString = `loadstring(game:HttpGet("${rawUrl}"))()`;

    resultDiv.innerHTML = `
      <div>
        âœ… <b>RAW Script:</b><br>
        <a href="${rawUrl}" target="_blank">${rawUrl}</a>
      </div>

      <div style="margin-top:20px;">
        ðŸ”¥ <b>LoadingString:</b>

        <div class="box" id="loadingBox">
          ${loadingString}
        </div>

        <button class="copyBtn" onclick="copyLoading()">COPY</button>
        <div class="success" id="copyMsg"></div>
      </div>
    `;

  } catch {
    resultDiv.innerHTML = "âŒ Error";
  }
}

/* COPY */

function copyLoading() {
  const text = document.getElementById("loadingBox").innerText;
  navigator.clipboard.writeText(text);

  const msg = document.getElementById("copyMsg");
  msg.innerText = "âœ” Copied";

  setTimeout(() => {
    msg.innerText = "";
  }, 2000);
}

/* MY SCRIPTS */

async function loadMyScripts() {
  const container = document.getElementById("scriptsContainer");
  container.innerHTML = "Cargando...";

  try {
    const res = await fetch("/api/myscripts");
    const data = await res.json();

    container.innerHTML = "";

    data.forEach(script => {
      const div = document.createElement("div");
      div.className = "scriptCard";
      div.id = script.id;

      const isDisabled = script.disabled;

      if (isDisabled) {
        div.style.background = "#300";
        div.style.border = "1px solid red";
      }

      div.innerHTML = `
        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:8px;
        ">
          <b>ID: ${script.id}</b>

          <div style="display:flex; gap:6px;">

  <button
    onclick="${isDisabled ? '' : `openEditor('${script.id}')`}"
    style="
      background:#00aaff;
      border:none;
      border-radius:4px;
      padding:4px 8px;
      font-size:12px;
      cursor:${isDisabled ? 'not-allowed' : 'pointer'};
      opacity:${isDisabled ? '0.5' : '1'};
    ">
    Edit
  </button>

  <button
    onclick="deleteScript('${script.id}')"
    style="
      background:#ff4444;
      border:none;
      border-radius:4px;
      padding:4px 8px;
      font-size:12px;
      cursor:pointer;
      color:white;
    ">
    Delete
  </button>

            ${isDisabled ? `
  <button
    onclick="enableScript('${script.id}')"
    style="
      background:#00ff88;
      border:none;
      border-radius:4px;
      padding:4px 8px;
      font-size:12px;
      cursor:pointer;
      color:black;
    ">
    Enable
  </button>
` : `
  <button
    onclick="disableScript('${script.id}')"
    style="
      background:#ff0033;
      border:none;
      border-radius:4px;
      padding:4px 8px;
      font-size:12px;
      cursor:pointer;
      color:white;
    ">
    Disable
  </button>
`}

          </div>
        </div>

        <pre>${isDisabled ? "DISABLED" : script.code.slice(0, 200)}</pre>
      `;

      container.appendChild(div);
    });

  } catch {
    container.innerHTML = "Error cargando scripts";
  }
}
async function openEditor(id) {

  currentEditId = id;

  const res = await fetch(`/api/myscripts`);
const data = await res.json();

const script = data.find(s => s.id === id);

const text = script ? script.code : "";

  document.getElementById("editorArea").value = text;

  document.getElementById("editorModal").style.display = "flex";
}

function closeEditor() {
  document.getElementById("editorModal").style.display = "none";
}

document.getElementById("editorFile").addEventListener("change", async function() {
  const file = this.files[0];
  if (file) {
    const text = await file.text();
    document.getElementById("editorArea").value = text;
  }
});

async function saveScript() {

  const content = document.getElementById("editorArea").value;

  const res = await fetch("/api/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: currentEditId,
      code: content   // ðŸ”¥ CAMBIA ESTO
    })
  });

  const text = await res.text();
  console.log(text); // ðŸ”¥ DEBUG

  if (res.ok) {
    alert("Updated âœ…");
    closeEditor();
  } else {
    alert("Error updating âŒ: " + text);
  }
}

async function disableScript(id) {

  const confirmDisable = confirm("Are you sure you want to disable this script?");
  if (!confirmDisable) return;

  try {

    const res = await fetch("/api/disable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    if (res.ok) {
      alert("Script disabled ðŸ’€");

      // ðŸ”¥ recargar lista
      loadMyScripts();

    } else {
      const text = await res.text();
      alert("Error: " + text);
    }

  } catch {
    alert("Network error âŒ");
  }
}

async function enableScript(id) {

  const confirmEnable = confirm("Are you sure you want to enable this script?");
  if (!confirmEnable) return;

  try {

    const res = await fetch("/api/enable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    if (res.ok) {
      alert("Script enabled âœ…");

      // ðŸ”¥ recargar lista
      loadMyScripts();

    } else {
      const text = await res.text();
      alert("Error: " + text);
    }

  } catch {
    alert("Network error âŒ");
  }
  }


  async function deleteScript(id) {

  const ok = confirm("Are you sure u wanna delete this script?");
  if (!ok) return;

  try {

    const res = await fetch("/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    if (res.ok) {
      alert("Deleted ðŸ’€");
      loadMyScripts(); // recarga lista
    } else {
      const text = await res.text();
      alert("Error: " + text);
    }

  } catch {
    alert("Error âŒ");
  }
  }

</script>

<div id="editorModal" style="
  position:fixed;
  top:0; left:0;
  width:100%; height:100%;
  background:rgba(0,0,0,0.8);
  display:none;
  justify-content:center;
  align-items:center;
  z-index:9999;
">

  <div style="
    width:90%;
    max-width:600px;
    height:80%;
    background:#111;
    border:1px solid #00aaff;
    border-radius:10px;
    display:flex;
    flex-direction:column;
    padding:10px;
  ">

    <textarea id="editorArea" style="
      flex:1;
      background:#000;
      color:#00aaff;
      border:none;
      outline:none;
      resize:none;
      padding:10px;
      overflow-y:auto;
    "></textarea>

    <input type="file" id="editorFile" style="margin-top:8px;">

    <div style="display:flex; gap:10px;">
      <button onclick="saveScript()">Save</button>
      <button onclick="closeEditor()">Close</button>
    </div>

  </div>
</div>

</body>
</html>
