const API_URL = "https://scancheck-api.onrender.com/scan";

let warningVisible = false;

// SHIFT + G TEST MODE
document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.key.toLowerCase() === "g") {
    showDanger("Manual Test", "Shift+G triggered popup");
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

// SAFE BADGE
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
    font-family:Arial;
    z-index:999999;
    box-shadow:0 4px 10px rgba(0,0,0,0.2);
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

      <button id="leave" style="margin:10px;padding:10px 14px;">
        Leave Site
      </button>

      <button id="ignore" style="margin:10px;padding:10px 14px;">
        Ignore
      </button>
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
