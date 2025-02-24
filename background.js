function annoyingPopup() {
  chrome.action.openPopup();
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && 
      tab.url === "https://saschina.schoology.com/home") {
    // The tab is ready to be processed if needed
    chrome.action.enable(tabId);
    annoyingPopup();
  } else {
    chrome.action.disable(tabId);
  }
});