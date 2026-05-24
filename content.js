let warningVisible = false;

// SHIFT + G TEST
document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.key.toLowerCase() === "g") {
    showDanger("MANUAL TEST", "Shift+G triggered ScanCheck popup");
  }
});

// AUTO SCAN
const text = document.body.innerText.toLowerCase();

const badWords = ["free money", "bitcoin", "verify your account"];

for (const w of badWords) {
  if (text.includes(w)) {
    showDanger("Content Scan", w);
    break;
  }
}

// SAFE BADGE
if (!warningVisible) {
  const badge = document.createElement("div");
  badge.innerText = "🟢 ScanCheck SAFE";
  badge.style = `
    position:fixed;
    bottom:20px;
    right:20px;
    background:#1db954;
    color:white;
    padding:10px 14px;
    border-radius:12px;
    font-family:Arial;
    z-index:999999;
  `;
  document.body.appendChild(badge);
}

// DANGER POPUP
function showDanger(source, reason) {
  if (warningVisible) return;
  warningVisible = true;

  const overlay = document.createElement("div");
  overlay.style = `
    position:fixed;
    top:0;left:0;
    width:100%;height:100%;
    background:rgba(0,0,0,0.75);
    z-index:9999999;
    display:flex;
    justify-content:center;
    align-items:center;
    font-family:Arial;
  `;

  overlay.innerHTML = `
    <div style="
      background:white;
      padding:25px;
      border-radius:16px;
      width:420px;
      text-align:center;
    ">
      <h2 style="color:red;">⚠ ScanCheck Alert</h2>
      <p><b>Source:</b> ${source}</p>
      <p><b>Detected:</b> ${reason}</p>

      <button id="leave" style="margin:10px;padding:10px;">Leave Site</button>
      <button id="ignore" style="margin:10px;padding:10px;">Ignore</button>
    </div>
  `;

  document.body.appendChild(overlay);

  // AUTO BLOCK (leave)
  document.getElementById("leave").onclick = () => {
    window.location.href = "https://google.com";
  };

  document.getElementById("ignore").onclick = () => {
    overlay.remove();
    warningVisible = false;
  };
}
