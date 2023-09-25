document.querySelector('#leave-request-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const description = document.querySelector('#request-description');
    const name = document.querySelector('#request-name');
    const contacts = document.querySelector('#contacts');
    const changeFiles = document.querySelector('#file').files;
    let count = 0
    if (changeFiles.length > 0) {
        count = changeFiles.length
    }
    filesize = 0;
    Array.from(changeFiles).forEach((file)=> {
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
                    description.parentElement.children[1].style.display = "none"
                })
                description.parentElement.children[1].style.display = "block"
            }
        },
        {
            rule:  name.value,
            error: () => {
                name.style.border = "rgb(255, 77, 87) solid 2px"
                name.addEventListener('input', () => {
                    name.style.border = 'none';
                    name.parentElement.children[1].style.display = "none"
                })
                name.parentElement.children[1].style.display = "block"
            }
        },
        {
            rule:  contacts.value && (phoneRegex.test(contacts.value) || emailRegex.test(contacts.value)),
            error: () => {
                contacts.style.border = "rgb(255, 77, 87) solid 2px";
                contacts.addEventListener('input', () => {
                    contacts.style.border = 'none';
                    contacts.parentElement.children[1].style.display = "none"
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
        
        document.querySelectorAll('input:not(#contractor-phone, input[type="submit"]), textarea').forEach((el) => { 
            el.value = null;
            el.checked = false;
        })
        files = [];

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
        document.querySelectorAll('input:not(#contractor-phone, input[type="submit"]), textarea').forEach((el) => {
            el.value = null;
            el.checked = false;
        })
        document.querySelectorAll('#request-offer input:not(input[type="submit"])').forEach((el) => { el.value = null })
        document.querySelector('.offer-request-wrapper').classList.add('hidden');
        handleEmail(data);
    }
})

document.querySelector('.contractor-input').addEventListener('submit', (e) => {
    e.preventDefault()

    const conForm = document.querySelector('.contractor-input');
    const phone = document.querySelector('#contractor-phone');
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (!phone.value || !(phoneRegex.test(phone.value))) {
        document.querySelector('.error-validate').classList.add('error');
        document.querySelector('.contractor-error-phone').style.display = "block"
        phone.addEventListener('input', () => {
            phone.style.border = 'none'
            document.querySelector('.error-validate').classList.remove('error');
        })
        phone.addEventListener('input', () =>{
            document.querySelector('.contractor-error-phone').style.display = "none"
        })
    } else {
        const data = {
            phone: phone.value,
        }
        document.querySelector('.contractor-error-email').style.display = "none"
        phone.parentElement.style.border = "none"
        document.querySelectorAll('.contractor-input input:not(input[type="submit"])').forEach((el) => { el.value = null })
        handleEmail(data)
    }
})

function notDuplicate(fl, f) {
    for (let el of fl) {
        if (f.name === el.name)
            return false
    }
    return true
}

function handleEmail(data) {
    document.querySelector('.sendmail-popup-wrapper').classList.toggle('hidden')
    data.append('link', location.href);
    $.ajax({
        url: 'ajax/sendForm.php',
        type: 'POST',
        dataType: 'json',
        data: data,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
        },
        error: function(response) {
            console.log(response)
        }
    })
    
}