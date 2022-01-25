export default class Forms {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.formData;
    }

  

    bindTriggers() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.formData = new FormData(this.form);

            let postData = async (url, data) => { 
                let res = await fetch(url, {
                    method: 'Post',
                    body: data
                });
                return await res.text();
            }

            postData('assets/question.php', this.formData)
            .then(res => console.log(res))
        })
    }



    init() {
        this.bindTriggers();
    }

}