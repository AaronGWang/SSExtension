const feedContainer = document.getElementById("home-feed-container");
const summaryDisplay = document.createElement("div");

summaryDisplay.style.position = "sticky";
summaryDisplay.style.whiteSpace = "pre-wrap";
summaryDisplay.style.backgroundColor = "white";
summaryDisplay.style.border = "2px solid #ccc";
summaryDisplay.style.borderRadius = "8px";
summaryDisplay.style.boxShadow = "0 4px 8px rgba(200, 200, 200, 0.5)";
summaryDisplay.style.padding = "20px";
summaryDisplay.style.marginBottom = "20px";
summaryDisplay.style.fontFamily = "Arial, sans-serif";
summaryDisplay.style.fontSize = "16px";

feedContainer.parentNode.insertBefore(summaryDisplay, feedContainer);

let dotCount = 0;
const baseText = '<h2>AI Summary:</h2> <br> Loading';

let loadingInterval = setInterval(() => {
  dotCount = (dotCount + 1) % 4; // 0 to 3 dots
  summaryDisplay.innerHTML = baseText + '.'.repeat(dotCount);
}, 500);


setTimeout(() => {
  let feed = document.querySelector('ul.s-edge-feed');
  let showMoreButtons = Array.from(feed.querySelectorAll('a[class*="show-more"]'));

  if (!feed) {
    clearInterval(loadingInterval);
    summaryDisplay.textContent = 'Failed to load page. Try to refresh.';
    return;
  }

  if (showMoreButtons.length === 0) {
    clearInterval(loadingInterval);
    summaryDisplay.textContent = 'Error when loading page. Try to refresh.';
    return;
  }

  // --------
  function clickNext(index) {
    if (index >= showMoreButtons.length) {
      let text = "";
      let updates = document.querySelectorAll('span[class^="update-body"]');

      let updateInners = document.querySelectorAll('div[class^="update-sentence-inner"]');
      let sources = Array.from(updateInners).map(div => div.querySelectorAll('a[class^="sExtlink-processed"]'));

      for (let i = 0; i < updates.length; i++) {
        if (sources[i].length >= 2) { // Ensure at least 2 <a> tags exist
          text += `Author: ${sources[i][0].innerText}\n`;
          text += `Source: ${sources[i][1].innerText}\n\n`;
        } else {
          text += `Author: Missing\n`;
          text += `Source: Missing\n`;
        }
        text += `${updates[i].innerText.trim()}\n\n--------\n\n`;
      }

      const defaut_prompt = "Give me a summary of the following anouncements. Cut each anouncement down to 50 words or less. Organize them in the format of Author | Source | Anouncement. Order them from most important to least important.\n\n";

      const prompt = defaut_prompt + text;

      chrome.runtime.sendMessage({ type: "SEND_PROMPT", prompt }, (response) => {
        if (response.result) {
          clearInterval(loadingInterval); // stop the animation
          let summary = response.result
          const summaryContent = summary.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
          summaryDisplay.innerHTML = summaryContent;

        } else {
          console.error("[!] Error [!]", response.error);
        }
      });

      return;
    };
    // --------

    let button = showMoreButtons[index];
    if (button) {
      button.click();
    }

    setTimeout(() => clickNext(index + 1), 750); // Best interval delay time is 0.75 sec
  }

  clickNext(0);
}, 1500); // Best initial delay time is 1.5 sec