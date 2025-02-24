document.getElementById('summarizeBtn').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  if(tab.url === "https://saschina.schoology.com/home") {
    const result = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: getPageContent
    });
    
    document.getElementById('summary').textContent = result[0].result;
  } else {
    alert("Please navigate to Schoology home page");
  }
});


document.getElementById('expandPostsBtn').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  if(tab.url === "https://saschina.schoology.com/home") {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: expandPosts
    });
    
  } else {
    alert("Please navigate to Schoology home page");
  }
});


function expandPosts() {
  // return new Promise((resolve) => {
  //   let feed = document.querySelector('ul.s-edge-feed');
  //   let updates = feed.querySelectorAll('li[id^="edge-assoc-"]');
  //   let totalClicks = 0; // Track the number of clicks
  //   let completedClicks = 0; // Track the completed clicks

  //   updates.forEach(li => {
  //     let showMoreButton = li.querySelector('a[class^="show-more"]');
  //     if (showMoreButton) {
  //       totalClicks++;
  //       showMoreButton.click();
  //     }
  //   });

  //   const observer = new MutationObserver(() => {
  //     completedClicks++;
  //     if (completedClicks === totalClicks) {
  //       observer.disconnect(); // Stop observing when all clicks are processed
  //       resolve(); // Resolve the promise
  //     }
  //   });


  //   observer.observe(feed, { childList: true, subtree: true });
  // });

  let feed = document.querySelector('ul.s-edge-feed');
  let updates = feed.querySelectorAll('li[id^="edge-assoc-"]');

  updates.forEach(li => {
    let showMoreButton = li.querySelector('a[class^="show-more"]');
    if (showMoreButton) {
      showMoreButton.click();
    }
  });
}


// function getPageContent() {
//   let text = "";
//   let feed = document.querySelector('ul.s-edge-feed');
//   let updates = feed.querySelectorAll('li[id^="edge-assoc-"]');

//   updates.forEach(update => {
//     let updateBody = update.querySelector('span[class^="update-body"]');
//     let updateText = "";
//     let authorName = "";
    
//     let authorBody = update.querySelector('span[class^="long-username"]');
//     let authorText = authorBody.querySelector('p');
//     authorText.forEach(text => {
//       authorName += authorText.innerText
//     });

//     let elements = updateBody.querySelectorAll('div, p, strong');
    
//     elements.forEach(element => {
//       updateText += element.innerText + " ";
//     });

//     updateText = updateText.trim();

//     text += "Update by" + updateAuthor + "\n" + updateText + "\n\n\n";
//   });
//   return text;
// }

function getPageContent() {
  return document.body.innerText;
}