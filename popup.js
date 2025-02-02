popUpBtn = document.getElementById('popUpBtn');

popUpBtn.addEventListener('click', function () {
  chrome.runtime.sendMessage({ type: 'open_side_panel' });
});