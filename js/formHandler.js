document.querySelector('#contractor-submit').addEventListener('click', (e) => {
  const email = document.querySelector('#contractor-email').value
  if (email) {
    e.preventDefault()

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 6f0f29b81c8818a40c3e1b3e611b1774'
      }
    }
    fetch('https://api.mailopost.ru/v1/email/templates/847704/messages', options)
      .then(res => res.json())
      .then(data => console.log(data))
  }
})

function contractorHandle(e) {
  
}