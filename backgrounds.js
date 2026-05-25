const VIRUSTOTAL_API_KEY = "PUT_YOUR_API_KEY_HERE";

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("welcome.html")
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.type === "safe") {
    chrome.action.setBadgeText({ text: "✓" });
    chrome.action.setBadgeBackgroundColor({ color: "#16a34a" });
  }

  if (message.type === "danger") {
    chrome.action.setBadgeText({ text: "!" });
    chrome.action.setBadgeBackgroundColor({ color: "#dc2626" });
  }

  if (message.type === "scan-url") {

    fetch("https://www.virustotal.com/api/v3/urls", {
      method: "POST",
      headers: {
        "x-apikey": VIRUSTOTAL_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `url=${encodeURIComponent(message.url)}`
    })
      .then(r => r.json())
      .then(data => {
        sendResponse(data);
      })
      .catch(err => {
        sendResponse({ error: true });
      });

    return true;
  }
});      });

    return true;
  }
});
