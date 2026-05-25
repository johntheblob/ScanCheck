const suspiciousWords = [
  "free money",
  "bitcoin giveaway",
  "verify your account",
  "urgent action",
  "claim reward",
  "password required"
];

const suspiciousDomains = [
  "roblox.com.io",
  "steamcomunnity",
  "discord-gift",
  "free-nitro"
];

let warningVisible = false;

init();

async function init() {

  const pageText = document.body.innerText.toLowerCase();
  const url = window.location.hostname.toLowerCase();

  let detected = null;

  // CONTENT SCAN
  for (const word of suspiciousWords) {
    if (pageText.includes(word)) {
      detected = word;
    }
  }

  // DOMAIN SCAN
  for (const domain of suspiciousDomains) {
    if (url.includes(domain)) {
      detected = domain;
    }
  }

  // STATUS
  if (detected) {
    chrome.runtime.sendMessage({ type: "danger" });
    showDanger(detected);
  } else {
    chrome.runtime.sendMessage({ type: "safe" });
  }

  // VIRUSTOTAL / URL SCAN
  chrome.runtime.sendMessage({
    type: "scan-url",
    url: window.location.href
  });
}

// SHIFT + G TEST MODE
document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.key.toLowerCase() === "g") {
    showDanger("Manual Test Trigger");
  }
});

// DANGER POPUP
function showDanger(reason) {

  if (warningVisible) return;
  warningVisible = true;

  const overlay = document.createElement("div");
  overlay.className = "scancheck-overlay";

  overlay.innerHTML = `
    <div class="scancheck-glass">

      <div class="scancheck-header">
        <div class="scancheck-icon">⚠</div>
        <h2>Potential Threat Detected</h2>
      </div>

      <p class="scancheck-subtitle">
        ScanCheck has detected suspicious activity.
      </p>

      <div class="scancheck-info">
        <b>Detected:</b> ${reason}
      </div>

      <div class="scancheck-buttons">

        <button id="leave" class="danger-btn">
          Leave Site
        </button>

        <button id="continue" class="safe-btn">
          Continue Anyway
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  // LEAVE SITE
  document.getElementById("leave").onclick = () => {
    window.location.href = "https://google.com";
  };

  // CONTINUE
  document.getElementById("continue").onclick = () => {
    overlay.remove();
    warningVisible = false;
  };
}
