export default class Form {
    constructor(forms, inputs) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll(inputs); 
        this.message = { 
            loading: 'загрузка...',
            success: 'Дякую! Ми з вами звяжемося',
            failure: 'Щось пішло не так',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png'
        };
        this.path = 'assets/question.php';
        this.nameInput = document.querySelector('.form__block [name="name"]');
        this.positionInput = document.querySelector('.form__block [name="position"]');
        this.emailInput = document.querySelector('.form__block [name="email"]');
        this.phoneInput = document.querySelector('.form__block [name="phone"]');
   
    }

    clearInputs () { // 3. Очистка інпутів після відправки форми 
        this.inputs.forEach(item => item.value = '');
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');

        mailInputs.forEach(inp => {
            inp.addEventListener('keypress', (e) => {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) { // якщо не латиниця, цифри, @ чи ., то не вводити символ
                    e.preventDefault();
                }
            })
        })
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: 'Post',
            body: data
        });
        return await res.text();
    }

    addRedBorder() {
        if (this.nameInput.value == '') {
            this.nameInput.style.border = '2px solid red';
        }
        
        if (this.positionInput.value == '') {
            this.positionInput.style.border = '2px solid red';
        }
        if (this.emailInput.value == '') {
            this.emailInput.style.border = '2px solid red';
        }
        if (this.phoneInput.value == '') {
            this.phoneInput.style.border = '2px solid red';
        }        
    }

    checkInp(inp) {
        inp.addEventListener('input', () => {
            inp.style.border = '';
        })
    }

    init() {        
        this.checkMailInputs();
                    this.forms.forEach(item => {
                        item.addEventListener('submit', (e) => {
                            e.preventDefault();
        
                                    if (!this.nameInput.value == '' && !this.positionInput.value == '' && !this.emailInput.value == '' && !this.phoneInput.value == '') {
                                        // створюємо головний div для повідомлення
                                        let statusMessage = document.createElement('div'); // 3.
                                        statusMessage.style.cssText = `
                                        margin-top: 15px;             
                                        color: 'grey';
                                        font-size: 18px;
                                        font-weight: 400;
                                        line-height: 20px;
                                        letter-spacing: -.28px;
                                        `;
                                        item.parentNode.appendChild(statusMessage); 
                                        // створюємо всередині головного діву картинку (спінер, що йде загрузка)
                                        let statusImg = document.createElement('img'); 
                                        statusImg.setAttribute('src', this.message.spinner);
                                        statusImg.classList.add('animated', 'fadeInUp');
                                        statusMessage.appendChild(statusImg);
                                        // створюємо всередині головного діву текстовий блок (слово "загрузка")
                                        let textMessage = document.createElement('div');
                                        textMessage.textContent = this.message.loading;
                                        statusMessage.appendChild(textMessage);
                        
                                        const formData = new FormData(item);
                        
                                        this.postData(this.path, formData)
                                        .then(res => {
                                            console.log(res);
                                            statusImg.setAttribute('src', this.message.ok); // 3.
                                            textMessage.textContent = this.message.success; // 3.
                                        })
                                        .catch(() => {
                                            statusImg.setAttribute('src', this.message.fail); // 3.
                                            textMessage.textContent = this.message.failure; // 3.
                                        })
                                        .finally(() => {
                                            this.clearInputs(); // 3.
                                            setTimeout(() => { // 3.
                                                statusMessage.remove();
                                            }, 5000)
                                        })
                                    } else {
                                        this.addRedBorder();
                                        this.checkInp(this.nameInput);
                                        this.checkInp(this.positionInput);
                                        this.checkInp(this.emailInput);
                                        this.checkInp(this.phoneInput);
                                    }
                                
                            })                                       
            
                        
                    })
                }
            }
    






























// export default class Forms {
//     constructor(formSelector) {
//         this.form = document.querySelector(formSelector);
//         this.formData;
//     }

  

//     bindTriggers() {
//         this.form.addEventListener('submit', (e) => {
//             e.preventDefault();
//             this.formData = new FormData(this.form);

            // let postData = async (url, data) => { 
            //     let res = await fetch(url, {
            //         method: 'Post',
            //         body: data
            //     });
            //     return await res.text();
            // }

//             postData('assets/question.php', this.formData)
//             .then(res => console.log(res))
//         })
//     }

//     init() {
//         this.bindTriggers();
//     }

// }