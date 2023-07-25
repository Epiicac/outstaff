document.querySelector('#leave-request-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const description = document.querySelector('#request-description')
    const name = document.querySelector('#request-name')
    const contacts = document.querySelector('#contacts')
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    if (!description.value) {
        description.style.outline = "rgb(255, 77, 87) solid 2px"
        description.addEventListener('input', () => {
            description.style.outline = 'none'
        })
    } else {
        if (!name.value) {
            name.style.outline = "rgb(255, 77, 87) solid 2px"
            name.addEventListener('input', () => {
                name.style.outline = 'none'
            })
        } else {
            if (!contacts.value || !(phoneRegex.test(contacts.value) || emailRegex.test(contacts.value))) {
                contacts.style.outline = "rgb(255, 77, 87) solid 2px"
                contacts.addEventListener('input', () => {
                    contacts.style.outline = 'none'
                })
            } else {
                const data = {
                    name: name.value,
                    description: description.value,
                    contacts: contacts.value
                }
                handleEmail(data)
            }
        }
    }
})
document.querySelector('.contractor-input').addEventListener('submit', (e) => {
    e.preventDefault()
    handleEmail([])
})

function handleEmail(data) {
    document.querySelector('.sendmail-popup-wrapper').classList.toggle('hidden')
}