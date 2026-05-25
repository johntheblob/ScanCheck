chrome.runtime.onInstalled.addListener(() => {

  chrome.tabs.create({
    url: chrome.runtime.getURL("welcome.html")
  });

});

chrome.runtime.onMessage.addListener((message) => {

  if (message.type === "safe") {

    chrome.action.setBadgeText({
      text: "✓"
    });

    chrome.action.setBadgeBackgroundColor({
      color: "#16a34a"
    });

  }

  if (message.type === "danger") {

    chrome.action.setBadgeText({
      text: "!"
    });

    chrome.action.setBadgeBackgroundColor({
      color: "#dc2626"
    });

  }

});
