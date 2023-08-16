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
                document.querySelectorAll('input:not(#contractor-email, input[type="submit"]), textarea').forEach((el) => { 
                    el.value = null
                    el.checked = false
                })
            }
        }
    }
})
document.querySelector('#request-offer').addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.querySelector('#name-request')
    const contacts = document.querySelector('#contacts-request')
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    if (!name.value) {
        name.style.outline = "rgb(255, 77, 87) solid 2px"
        name.addEventListener('input', () => {
            name.style.outline = 'none'
        })
        document.querySelector('.offer-error-name').innerHTML = 'Неправильная фома'
    } else {
        document.querySelector('.offer-error-name').innerHTML = '&nbsp;'
        if (!contacts.value || !(phoneRegex.test(contacts.value) || emailRegex.test(contacts.value))) {
            contacts.style.outline = "rgb(255, 77, 87) solid 2px"
            contacts.addEventListener('input', () => {
                contacts.style.outline = 'none'
            })
            document.querySelector('.offer-error-contacts').innerHTML = 'Неправильная фома'
        } else {
            document.querySelector('.offer-error-contacts').innerHTML = '&nbsp;'
            const data = {
                name: name.value,
                contacts: contacts.value
            }
            document.querySelectorAll('#request-offer input:not(input[type="submit"])').forEach((el) => { el.value = null })
            document.querySelector('.offer-request-wrapper').classList.add('hidden')
            handleEmail(data)
        }
    }
})
document.querySelector('.contractor-input').addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('.contractor-input input[type="email"]').value = null
    handleEmail([])
})

function handleEmail(data) {
    document.querySelector('.sendmail-popup-wrapper').classList.toggle('hidden')
}