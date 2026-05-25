document.getElementById("openWelcome").onclick = () => {

  chrome.tabs.create({
    url: chrome.runtime.getURL("welcome.html")
  });

};
