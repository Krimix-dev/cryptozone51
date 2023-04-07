const chatButton = document.getElementById('chat-btn');
const chatContainer = document.getElementById('chat-container');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

let conversation = [];

chatButton.addEventListener('click', () => {
  chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
});

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userMessage = chatInput.value;
  conversation.push({ role: 'user', content: userMessage });
  renderConversation();
  chatInput.value = '';

  const chatGPTMessage = await fetchChatGPT(userMessage);
  conversation.push({ role: 'assistant', content: chatGPTMessage });
  renderConversation();
});

function renderConversation() {
  chatMessages.innerHTML = conversation
    .map(message => `<div class="${message.role}">${message.content}</div>`)
    .join('');
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function fetchChatGPT(message) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      prompt: `Assistant de cryptomonnaie: ${message}`,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.5,
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}
