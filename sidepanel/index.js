let expandPostsBtn = document.getElementById('expandPostsBtn');

expandPostsBtn.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  if(tab.url === "https://saschina.schoology.com/home") {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: expandPosts
    });
  }
  else {
    alert("You are not on the correct page");
  }
});

function expandPosts() {
  let feed = document.querySelector('ul.s-edge-feed');
  let updates = feed.querySelectorAll('li[id^="edge-assoc-"]');

  updates.forEach(li => {
    const showMoreButton = li.querySelector('a[class^="show-more"]');
    if (showMoreButton) {
      showMoreButton.click();
    }
  });
}