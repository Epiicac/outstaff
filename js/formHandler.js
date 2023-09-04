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
                description.style.border = "rgb(255, 77, 87) solid 2px"
                description.addEventListener('input', () => {
                    description.style.border = 'none';
                })
            }
        },
        {
            rule:  name.value,
            error: () => {
                name.style.border = "rgb(255, 77, 87) solid 2px"
                name.addEventListener('input', () => {
                    name.style.border = 'none';
                })
            }
        },
        {
            rule:  contacts.value && (phoneRegex.test(contacts.value) || emailRegex.test(contacts.value)),
            error: () => {
                contacts.style.border = "rgb(255, 77, 87) solid 2px";
                contacts.addEventListener('input', () => {
                    contacts.style.border = 'none';
                })
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
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!name.value) {
        name.style.outline = "rgb(255, 77, 87) solid 2px";
        name.addEventListener('input', () => {
            name.style.outline = 'none';
        })
        document.querySelector('.offer-error-name').innerHTML = 'Некорректные данные';
    } else {
        document.querySelector('.offer-error-name').innerHTML = '&nbsp;';
        if (!contacts.value || !(phoneRegex.test(contacts.value) || emailRegex.test(contacts.value))) {
            contacts.style.border = "rgb(255, 77, 87) solid 2px";
            contacts.addEventListener('input', () => {
                contacts.style.border = 'none';
            })
            document.querySelector('.offer-error-contacts').innerHTML = 'Некорректные данные';
        } else {
            document.querySelector('.offer-error-contacts').innerHTML = '&nbsp;';
            data = new FormData($('#request-offer')[0]);
            document.querySelectorAll('input:not(#contractor-email, input[type="submit"]), textarea').forEach((el) => {
                el.value = null;
                el.checked = false;
            })
            document.querySelectorAll('#request-offer input:not(input[type="submit"])').forEach((el) => { el.value = null })
            document.querySelector('.offer-request-wrapper').classList.add('hidden');
            handleEmail(data);
        }
    }
})
document.querySelector('.contractor-input').addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.querySelector('#contractor-email')
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    
    if (!email.value || !(emailRegex.test(email.value))) {
        document.querySelector('.contractor-error-email').style.display = "block"
        email.parentElement.style.border = "rgb(255, 77, 87) solid 2px"
        email.addEventListener('input', () => {
            email.style.border = 'none'
        })
        email.addEventListener('input', () =>{
            document.querySelector('.contractor-error-email').style.display = "none"
            email.parentElement.style.border = "none"
        })
    } else {
        const data = {
            email: email.value,
        }
        document.querySelector('.contractor-error-email').style.display = "none"
        email.parentElement.style.border = "none"
        document.querySelectorAll('.contractor-input input:not(input[type="submit"])').forEach((el) => { el.value = null })
        handleEmail(data)
    }
})
