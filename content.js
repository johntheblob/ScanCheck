const API_URL = "https://scancheck-api.onrender.com/scan";

let warningVisible = false;

// SHIFT + G TEST MODE
document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.key.toLowerCase() === "g") {
    showDanger("Manual Test", "Shift+G triggered ScanCheck");
  }
});

// START SCAN
scanPage();

async function scanPage() {
  try {
    const text = document.body.innerText.slice(0, 3000);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        url: window.location.href
      })
    });

    if (!res.ok) throw new Error("API failed");

    const data = await res.json();

    if (data.risk === "danger") {
      showDanger("ScanCheck Cloud", data.reason);
    } else {
      showSafe();
    }

  } catch (err) {
    console.log("ScanCheck error:", err);
    showSafe();
  }
}

// 🟢 SAFE BADGE
function showSafe() {
  if (document.getElementById("scancheck-safe")) return;

  const badge = document.createElement("div");
  badge.id = "scancheck-safe";

  badge.innerText = "🟢 ScanCheck SAFE";

  badge.style = `
    position:fixed;
    bottom:20px;
    right:20px;
    background:#1db954;
    color:white;
    padding:10px 14px;
    border-radius:12px;
    font-family:-apple-system,BlinkMacSystemFont,Segoe UI;
    z-index:999999;
    box-shadow:0 10px 30px rgba(0,0,0,0.25);
  `;

  document.body.appendChild(badge);
}

// ⚠️ LIQUID GLASS DANGER POPUP
function showDanger(source, reason) {
  if (warningVisible) return;
  warningVisible = true;

  const overlay = document.createElement("div");
  overlay.className = "scancheck-overlay";

  overlay.innerHTML = `
    <div class="scancheck-glass">

      <div class="scancheck-header">
        <div class="scancheck-icon">⚠</div>
        <h2>ScanCheck Alert</h2>
      </div>

      <p class="scancheck-subtitle">Potential threat detected</p>

      <div class="scancheck-info">
        <div><b>Source:</b> ${source}</div>
        <div><b>Detected:</b> ${reason}</div>
      </div>

      <div class="scancheck-buttons">
        <button class="danger-btn" id="leave">Leave Site</button>
        <button class="safe-btn" id="ignore">Continue</button>
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("leave").onclick = () => {
    window.location.href = "https://google.com";
  };

  document.getElementById("ignore").onclick = () => {
    overlay.remove();
    warningVisible = false;
  };
}
