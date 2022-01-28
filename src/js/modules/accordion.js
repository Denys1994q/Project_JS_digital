export default class Accordion {
    constructor (trigger = null, showBlock = null) {
        this.trigger = document.querySelectorAll(trigger);
    }

    bindTriggers() {
        this.trigger.forEach(trig => {
            trig.addEventListener('click', () => {
                const sibling = trig.closest('.module__info-show').nextElementSibling;

                sibling.classList.toggle('msg');
                sibling.classList.add('animated', 'fadeInUp')
                sibling.style.marginTop = '20px';
        })
    })
}

    init() {
        this.bindTriggers();
    }

}