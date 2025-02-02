chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url === "https://saschina.schoology.com/home") {
    annoyingPopup();
    enableSidePanel(tabId);
  } else {
    disableSidePanel(tabId);
  }
});


chrome.tabs.onCreated.addListener((tab) => {
  if (tab.url === "https://saschina.schoology.com/home") {
    annoyingPopup();
    enableSidePanel(tab.id);
  } else {
    disableSidePanel(tab.id);
  }
});


chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url === "https://saschina.schoology.com/home") {
      annoyingPopup();
      enableSidePanel(tab.id);
    } else {
      disableSidePanel(tab.id);
    }
  });
});


function annoyingPopup() {
  chrome.action.openPopup();

  chrome.runtime.onMessage.addListener((message, sender) => {
    (async () => {
      if (message.type === 'open_side_panel') {
        await chrome.sidePanel.open({ tabId: sender.tab.id });
        await chrome.sidePanel.setOptions({
          tabId: sender.tab.id,
          path: 'sidepanel/index.html',
          enabled: true
        });
      }
    })();
  });
}


function enableSidePanel(tabId) {
  console.log("Opening side panel...");

  chrome.sidePanel.setOptions({
    tabId,
    path: 'sidepanel/index.html',
    enabled: true
  });
}


function disableSidePanel(tabId) {
  console.log("Closing side panel...");

  chrome.sidePanel.setOptions({
    tabId,
    path: 'sidepanel/index.html',
    enabled: false
  });
}

// function addSummarizeBtns() {
//   let feed = document.querySelector('ul.s-edge-feed');
//   let updates = feed.querySelectorAll('li[id^="edge-assoc-"]');

//   updates.forEach(li => {
//     const buttonContainer = document.createElement('div');
    
//     fetch(chrome.runtime.getURL('button.html'))
//         .then(response => response.text())
//         .then(html => {
//             buttonContainer.innerHTML = html;
//             li.appendChild(buttonContainer.firstChild);

//             const link = document.createElement('link');
//             link.rel = 'stylesheet';
//             link.href = chrome.runtime.getURL('button.css');
//             document.head.appendChild(link);
//         })
//         .catch(err => console.error('Error loading button:', err));
//   });
// }