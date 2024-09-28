function uploadRepo() {
    const repoAddress = document.getElementById('repoAddress').value;
    const repoType = document.querySelector('input[name="repoType"]:checked').value;
    const repoKey = document.getElementById('repoKey').value;
  
    const data = { repoAddress, repoType, repoKey };
  
    fetch('/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        document.getElementById('feedbackBox').innerHTML = result.message;
      })
      .catch(error => console.error('Error:', error));
  }