// Initialize API information
const apiKey = "OPENAI_API_KEY";
const apiUrl = "https://api.openai.com/v1/chat/completions";

// Recieve message from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SEND_PROMPT') {

    // Send prompt to API and return response to content.js
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message.prompt }],
      })
    })
    .then(response => response.json())
    .then(data => {
      sendResponse({ result: data.choices[0].message.content });
    })
    .catch(err => {
      sendResponse({ error: err.message });
    });

    return true; // Keep the message channel open for async response
  }
});