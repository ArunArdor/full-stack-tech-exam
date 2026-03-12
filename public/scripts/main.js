const searchBtn = document.getElementById('searchBtn');
const userNameInput = document.getElementById('userName');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', async () => {
  const userName = userNameInput.value.trim();

  if (!userName) {
    resultDiv.innerHTML = '<p class="error">Please enter a name.</p>';
    return;
  }

  resultDiv.innerHTML = '<p>Searching...</p>';

  try {
    const response = await fetch('/api/get-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName })
    });

    const data = await response.json();

    if (!response.ok) {
      resultDiv.innerHTML = `<p class="error">${data.error}</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <h3>Server Response</h3>
      <p><strong>Message:</strong> ${data.message}</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Emoji:</strong> ${data.emoji}</p>
    `;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = '<p class="error">Failed to contact the server.</p>';
  }
});