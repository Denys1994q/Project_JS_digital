export default class Difference {
    constructor(oldOfficer, newOfficer, items) { // те, що ми передаємо з main 
        this.oldOfficer = document.querySelector(oldOfficer); // ті змінні, з якими ми працюємо безпосередньо у ф-ії 
        this.newOfficer = document.querySelector(newOfficer);
        this.items = items;
    }

    hideItems() {
       this.oldOfficer.querySelectorAll(this.items).forEach((item, i, arr) => {
            if (i !== arr.length - 1) { // приховуємо всі елементи, крім останнього 
                item.style.display = 'none';
            }
       }) 
       this.newOfficer.querySelectorAll(this.items).forEach((item, i, arr) => {
            if (i !== arr.length - 1) { // приховуємо всі елементи, крім останнього 
            item.style.display = 'none';
            }
         }) 
    }

    bindTriggers() {
        let n = 0; 
        this.oldOfficer.querySelector('.plus__content').addEventListener('click', () => {
            this.oldOfficer.querySelectorAll(this.items)[n].style.display = 'flex';
            n++;
            if(n > 2) {
                this.oldOfficer.querySelectorAll(this.items)[n].style.display = 'flex';
                this.oldOfficer.querySelectorAll(this.items)[this.oldOfficer.querySelectorAll(this.items).length-1].style.display = 'none';
            }
        })
    }

    init() {
        this.hideItems();
        this.bindTriggers();
    }

}