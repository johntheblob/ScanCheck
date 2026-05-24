const suspiciousWords = [
  "free money",
  "bitcoin giveaway",
  "verify your account"
];

const text = document.body.innerText.toLowerCase();

let danger = false;

for (const word of suspiciousWords) {
  if (text.includes(word)) {
    danger = true;
  }
}

if (danger) {
  alert("⚠ ScanCheck: Misstänkt sida upptäckt!");
} else {
  const badge = document.createElement("div");

  badge.innerText = "🟢 SAFE | ScanCheck";

  badge.style.position = "fixed";
  badge.style.bottom = "20px";
  badge.style.right = "20px";
  badge.style.background = "green";
  badge.style.color = "white";
  badge.style.padding = "10px";
  badge.style.borderRadius = "12px";
  badge.style.zIndex = "999999";

  document.body.appendChild(badge);
}
