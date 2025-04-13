// Initialization and injection of summary display block
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

// Loading animation & disclaimer
const disclaimerMessage = "<h2>NOTE: This is a AI summary and doesn't have all the information from the original announcements. Make sure to check important anouncements on top of reading the summary.</h2><br>";
let dotCount = 0;
const baseText = '<h2>AI Summary:</h2> <br> Loading';

let loadingInterval = setInterval(() => {
  dotCount = (dotCount + 1) % 4; // 0 to 3 dots
  summaryDisplay.innerHTML = baseText + '.'.repeat(dotCount);
}, 500);

// Initial delay to allow the page to load
setTimeout(() => {
  let feed = document.querySelector('ul.s-edge-feed');
  let showMoreButtons = Array.from(feed.querySelectorAll('a[class*="show-more"]'));

  // Check if the feed is loaded (display errors if updates don't load fast enough)
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

  // Expand all updates
  function clickNext(index) {

    // Main function block after all updates have been expanded and page is loaded
    if (index >= showMoreButtons.length) {

      // Scrape updates, authors, sources, and organize into desired format
      let text = "";
      let updates = document.querySelectorAll('span[class^="update-body"]');

      let updateInners = document.querySelectorAll('div[class^="update-sentence-inner"]');
      let sources = Array.from(updateInners).map(div => div.querySelectorAll('a[class^="sExtlink-processed"]'));

      for (let i = 0; i < updates.length; i++) {
        if (sources[i].length >= 2) {
          text += `Author: ${sources[i][0].innerText}\n`;
          text += `Source: ${sources[i][1].innerText}\n\n`;
        } else {
          text += `Author: Missing\n`;
          text += `Source: Missing\n`;
        }
        text += `${updates[i].innerText.trim()}\n\n--------\n\n`;
      }

      // Retrieve user config from popup.js and popup.html
      chrome.storage.local.get(["summaryLengthConfig", "updateCountConfig", "omitSportsConfig"], (result) => {
        let summaryLength = result.summaryLengthConfig || "50 words";
        let updateCount = result.updateCountConfig || "the first 5 updates";
        let omitSportsText = result.omitSportsConfig || "";
      
        // Set default instructions for the AI along with user config
        let default_prompt = `Give me a summary of the following announcements. Cut each announcement down to ${summaryLength} or less. Organize them in the format of "#. **Author | Source |** Announcement". Summarize ${updateCount}${omitSportsText}.\n\n`;
        
        // console.log(default_prompt);
      
        const prompt = default_prompt + text;

        // Send the prompt to the background script and API
        chrome.runtime.sendMessage({ type: "SEND_PROMPT", prompt }, (response) => {
          if (response.result) {
            clearInterval(loadingInterval); // stop the animation

            let summary = response.result;
            const summaryContent = summary.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
            summaryDisplay.innerHTML = disclaimerMessage + summaryContent;

            const disclaimerElement = summaryDisplay.querySelector('h2');
            if (disclaimerElement) {
              disclaimerElement.style.color = "red";
              disclaimerElement.style.fontWeight = "bold";
            }
  
          } else {
            console.error("[!] Error [!]", response.error);
          }
        });
      });

      return;
    };
    // --------

    // Expand individual posts by clicking the show more buttons
    let button = showMoreButtons[index];
    if (button) {
      button.click();
    }

    setTimeout(() => clickNext(index + 1), 700); // Best interval delay time is 0.75 sec
  }

  // Begin expanding by starting with the first show more button and incrementing
  clickNext(0);
}, 1500); // Best initial delay time is 1.5 sec