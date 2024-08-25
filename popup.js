let checkWebsiteBtn = document.getElementById('checkWebsiteBtn');

checkWebsiteBtn.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  if(tab.url === "https://saschina.schoology.com/home") {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: modFirstUpdate
    });
  }
  else {
    alert("You are not on the correct page");
  }
});

function modFirstUpdate() {
  let feed = document.querySelector('ul.s-edge-feed');
  let updates = feed.querySelectorAll('li[id^="edge-assoc-"]');
  updates.forEach(li => {
    const button = document.createElement('button');
    button.textContent = 'Summarize';
    button.style.textalign = 'center';
    button.style.color = 'white';
    button.style.height = '30px';
    button.style.width = '50%';
    button.style.padding = '5px';
    button.style.background = '#009578';
    button.style.border = 'none';
    button.style.outline = 'none';
    button.style.borderRadius = '5px';
    button.style.overflow = 'hidden';
    button.style.fontFamily = '"Quicksand", sans-serif';
    button.style.fontSize = '16px';
    button.style.fontWeight = '500';
    button.style.cursor = 'pointer';
    button.style.marginLeft = '25%';

    button.addEventListener('mouseover', () => {
        button.style.background = '#008168';
    });
    button.addEventListener('mouseout', () => {
        button.style.background = '#009578';
    });

    button.addEventListener('mousedown', () => {
        button.style.background = '#006e58';
    });
    button.addEventListener('mouseup', () => {
        button.style.background = '#009578';
    });

    li.appendChild(button);
});
}