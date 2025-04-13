// Get elements from popup.html
const lengthSlider = document.getElementById('lengthSlider');
const updateNumberSlider = document.getElementById('updateNumberSlider');
const omitSportsCheckbox = document.getElementById('omitSportsCheckbox');

// Load stored values
chrome.storage.sync.get(['lengthSliderValue', 'updateNumberValue', 'omitSportsCheckboxChecked'], function(data) {
  if (data.lengthSliderValue !== undefined) {
    lengthSlider.value = data.lengthSliderValue;
  }
  if (data.updateNumberValue !== undefined) {
    updateNumberSlider.value = data.updateNumberValue;
  }
  if (data.omitSportsCheckboxChecked !== undefined) {
    omitSportsCheckbox.checked = data.omitSportsCheckboxChecked;
  }
});

// Save length slider value and update summary length config
lengthSlider.addEventListener('input', function () {
  let summaryLengthText = "";
  const level = lengthSlider.value;

  if (level == 0) {
    summaryLengthText = "25 words";
  }
  if (level == 1) {
    summaryLengthText = "50 words";
  }
  if (level == 2) {
    summaryLengthText = "75 words";
  }

  chrome.storage.sync.set({ lengthSliderValue: lengthSlider.value });
  chrome.storage.local.set({ summaryLengthConfig: summaryLengthText });
});

// Save update number slider value
updateNumberSlider.addEventListener('input', function () {
  let updateNumberText = "";
  const updateNumber = updateNumberSlider.value;

  if (updateNumber == 0) {
    updateNumberText = "the first 3 updates";
  }
  if (updateNumber == 1) {
    updateNumberText = "the first 5 updates";
  }
  if (updateNumber == 2) {
    updateNumberText = "the first 7 updates";
  }
  if (updateNumber == 3) {
    updateNumberText = "all updates";
  }

  chrome.storage.sync.set({ updateNumberValue: updateNumberSlider.value });
  chrome.storage.local.set({ updateCountConfig: updateNumberText });
});

// Save checkbox state and update omit config
omitSportsCheckbox.addEventListener('change', function () {
  let omitText = "";
  const omit = omitSportsCheckbox.checked;

  if (omit) {
    omitText = " not including updates about sports achievements";
  } else {
    omitText = "";
  }

  chrome.storage.sync.set({ omitSportsCheckboxChecked: omitSportsCheckbox.checked });
  chrome.storage.local.set({ omitSportsConfig: omitText });
});