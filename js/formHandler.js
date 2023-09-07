document.querySelector('#leave-request-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const description = document.querySelector('#request-description');
    const name = document.querySelector('#request-name');
    const contacts = document.querySelector('#contacts');
    const files = document.querySelector('#file').files;
    let count = 0
    if (files.length > 0) {
        count = files.length
    }
    filesize = 0;
    Array.from(files).forEach((file)=> {
        filesize += file.size
    })
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const emailRegex = /[a-zA-Z0-9]+[@]+[a-zA-Z0-9]+[.]+[a-zA-Z]+/;

    const rules = [
        {
            rule:  description.value,
            error: () => {
                description.style.outline = "rgb(255, 77, 87) solid 2px"
                description.addEventListener('input', () => {
                    description.style.outline = 'none';
                })
                description.parentElement.children[1].style.display = "block"
            }
        },
        {
            rule:  name.value,
            error: () => {
                name.style.outline = "rgb(255, 77, 87) solid 2px"
                name.addEventListener('input', () => {
                    name.style.outline = 'none';
                })
                name.parentElement.children[1].style.display = "block"
            }
        },
        {
            rule:  contacts.value && (phoneRegex.test(contacts.value) || emailRegex.test(contacts.value)),
            error: () => {
                contacts.style.outline = "rgb(255, 77, 87) solid 2px";
                contacts.addEventListener('input', () => {
                    contacts.style.outline = 'none';
                })
                contacts.parentElement.children[1].style.display = "block"
            }
        },
        {
            rule:  count <= 10,
            error: () => {
                document.querySelector('.count-error').style.display = 'block'
            }
        },
        {
            rule:  filesize < 20971520,
            error: () => {
                document.querySelector('.size-error').style.display = 'block'
            }
        }
    ]
    
    let formValid = true
    for (let rule of rules) {
        if (!rule.rule) {
            rule.error()
            formValid = false
        }
    }
    
    if (formValid) {
        if (document.querySelector('.selected-files') !== null)
            document.querySelector('.selected-files').innerHTML = '<span class="file-hint">Прикрепить файлы</span><span class="file-hint-desc">Загружаемые файлы не должны превышать 20 мб</span>'
        data = new FormData($('#leave-request-form')[0]);
        handleEmail(data)
        document.querySelectorAll('input:not(#contractor-email, input[type="submit"]), textarea').forEach((el) => { 
            el.value = null;
            el.checked = false;
        })
    }
})
document.querySelector('#request-offer').addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.querySelector('#name-request');
    const contacts = document.querySelector('#contacts-request');
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const emailRegex = /[a-zA-Z0-9]+[@]+[a-zA-Z0-9]+[.]+[a-zA-Z]+/;

    name.addEventListener('input', () => {
        name.classList.remove('error')
        document.querySelector('.offer-error-name').innerHTML = '&nbsp';
    })
    contacts.addEventListener('input', () => {
        contacts.classList.remove('error')
        document.querySelector('.offer-error-contacts').innerHTML = '&nbsp';
    })

    const rules = [
        {
            check: name.value,
            except: () => {
                name.classList.add('error')
                document.querySelector('.offer-error-name').innerHTML = 'Некорректные данные';
            }
        },
        {
            check: contacts.value && (phoneRegex.test(contacts.value) || emailRegex.test(contacts.value)),
            except: () => {
                contacts.classList.add('error')
                document.querySelector('.offer-error-contacts').innerHTML = 'Некорректные данные';
            }
        }
    ]

    let sendForm = true
    for (let rule of rules) {
        if (!rule.check) {
            rule.except()
            sendForm = false
        }
    }

    if (sendForm) {
        data = new FormData($('#request-offer')[0]);
        document.querySelectorAll('input:not(#contractor-email, input[type="submit"]), textarea').forEach((el) => {
            el.value = null;
            el.checked = false;
        })
        document.querySelectorAll('#request-offer input:not(input[type="submit"])').forEach((el) => { el.value = null })
        document.querySelector('.offer-request-wrapper').classList.add('hidden');
        handleEmail(data);
    }
})

function notDuplicate(fl, f) {
    for (let el of fl) {
        if (f.name === el.name)
            return false
    }
    return true
}