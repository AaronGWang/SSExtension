// Get elements from popup.html
const slider = document.getElementById('levelSlider');
const checkbox = document.getElementById('omitCheckbox');

// Set values for slider and checkbox to keep config saved
chrome.storage.sync.get(['sliderValue', 'checkboxChecked'], function(data) {
  if (data.sliderValue !== undefined) {
    slider.value = data.sliderValue;
  }
  if (data.checkboxChecked !== undefined) {
    checkbox.checked = data.checkboxChecked;
  }
});

// Update values for slider and checkbox when changed by user and save to local storage
slider.addEventListener('input', function() {
  let summaryLength = "";
  const level = slider.value;

  if (level == 0) {
    summaryLength = "25 words";
  }
  if (level == 1) {
    summaryLength = "50 words";
  }
  if (level == 2) {
    summaryLength = "75 words";
  }

  chrome.storage.sync.set({ sliderValue: slider.value });
  chrome.storage.local.set({ summaryLengthConfig: summaryLength });
});

checkbox.addEventListener('change', function() {
  let omitText = "";
  const omit = checkbox.checked;

  if (omit) {
    omitText = " Omit summary of updates about sports achievements.";
  }
  else {
    omitText = "";
  }

  chrome.storage.sync.set({ checkboxChecked: checkbox.checked });
  chrome.storage.local.set({ omitConfig: omitText });
});