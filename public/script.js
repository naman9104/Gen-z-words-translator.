const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');
const thoughtBubble = document.getElementById('thoughtBubble');

function showMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showThought(text) {
  thoughtBubble.textContent = `💭 ${text}`;
  thoughtBubble.style.display = 'flex'; // show the bubble
}

function hideThought() {
  thoughtBubble.style.display = 'none'; // hide the bubble
}


function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  showMessage('You', input);
  showThought('Thinking in Gen Z...');

  fetch('http://localhost:3000/translate-slang', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: input })  // ✅ match server format
  })
    .then(res => res.json())
    .then(data => {
      const reply = data.translation || 'No response';
      hideThought();
      showMessage('Shih Tzu', reply);
    })
    .catch(err => {
      console.error('Client Error:', err);
      hideThought();
      showMessage('Shih Tzu', 'Something went wrong.');
    });

  userInput.value = '';
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});
