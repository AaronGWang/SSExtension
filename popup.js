let checkWebsiteBtn = document.getElementById('checkWebsiteBtn');

checkWebsiteBtn.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  if(tab.url === "https://saschina.schoology.com/home") {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: addButtonAndExpandPosts
    });
  }
  else {
    alert("You are not on the correct page");
  }
});

function addButtonAndExpandPosts() {
  let feed = document.querySelector('ul.s-edge-feed');
  let updates = feed.querySelectorAll('li[id^="edge-assoc-"]');

  updates.forEach(li => {
    const buttonContainer = document.createElement('div');
    const showMoreButton = li.querySelector('a[class^="show-more"]');
    if (showMoreButton) {
      showMoreButton.click();
    }
    
    fetch(chrome.runtime.getURL('button.html'))
        .then(response => response.text())
        .then(html => {
            buttonContainer.innerHTML = html;
            li.appendChild(buttonContainer.firstChild);
``
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = chrome.runtime.getURL('button.css');
            document.head.appendChild(link);
        })
        .catch(err => console.error('Error loading button:', err));
  });
}