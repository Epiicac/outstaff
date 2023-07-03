document.querySelector('#contractor-submit').addEventListener('click', (e) => {
  const email = document.querySelector('#contractor-email').value
  if (email) {
    e.preventDefault()

    const options = {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }
    fetch('https://api.mailopost.ru/v1/email/templates/847704/messages', options)
      .then(res => console.log(res))
  }
})

function contractorHandle(e) {
  
}