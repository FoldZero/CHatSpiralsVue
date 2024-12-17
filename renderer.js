document.getElementById('sendButton').addEventListener('click', async () => {
  const userMessage = document.getElementById('userInput').value;
  const response = await window.api.sendQuery(userMessage);
  document.getElementById('response').innerText = response;
});
