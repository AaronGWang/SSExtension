setTimeout(() => {
  let feed = document.querySelector('ul.s-edge-feed');
  if (!feed) return;

  let showMoreButtons = Array.from(feed.querySelectorAll('a[class*="show-more"]'));

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

      console.log(text)
      return;
    };

    let button = showMoreButtons[index];
    if (button) {
      button.click();
    }

    setTimeout(() => clickNext(index + 1), 750); // Best interval delay time is 0.75 sec
  }

  clickNext(0);
}, 1500); // Best initial delay time is 1.5 sec
