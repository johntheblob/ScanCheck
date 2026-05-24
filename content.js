let warningVisible = false;

const API_URL = "https://DIN-RENDER-URL.onrender.com/scan";

// SHIFT + G TEST
document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.key.toLowerCase() === "g") {
    showDanger("MANUAL TEST", "Shift+G triggered ScanCheck popup");
  }
});

// SKICKA TILL API
async function scanPage() {
  try {
    const text = document.body.innerText.slice(0, 3000);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    if (data.risk === "danger") {
      showDanger("ScanCheck Cloud", data.reason);
    } else {
      showSafe();
    }

  } catch (err) {
    console.log("ScanCheck API error:", err);
    showSafe();
  }
}

// SAFE BADGE
function showSafe() {
  if (warningVisible) return;

  const badge = document.createElement("div");
  badge.innerText = "🟢 ScanCheck SAFE (Cloud)";
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

      <button id="leave">Leave Site</button>
      <button id="ignore">Ignore</button>
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

// START SCAN
scanPage();
