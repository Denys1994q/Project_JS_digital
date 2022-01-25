export default class Difference {
    constructor(oldOfficer, newOfficer, items) { // те, що ми передаємо з main 
        this.oldOfficer = document.querySelector(oldOfficer); // ті змінні, з якими ми працюємо безпосередньо у ф-ії 
        this.newOfficer = document.querySelector(newOfficer);
        this.oldItems = this.oldOfficer.querySelectorAll(items);
        this.newItems = this.newOfficer.querySelectorAll(items);
        this.oldCounter = 0;
        this.newCounter = 0;
    }

    hideItems(items) {
       items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) { // приховуємо всі елементи, крім останнього 
                item.style.display = 'none';
            }
       }) 
    }

    bindTriggers(officer, counter, items) {
        officer.querySelector('.plus').addEventListener('click', () => {
            if (counter !== items.length - 2) { // якщо зараз каунтер ще не дійшов до передостаннього елементу
                items[counter].classList.add('animated', 'fadeIn');
                items[counter].style.display = 'flex';
                counter++;
            } else { // коли показується передстання карточка, остання карточка видаляється
                items[counter].classList.add('animated', 'fadeIn'); 
                items[counter].style.display = 'flex';
                items[items.length - 1].remove();
            }
        });    
    }

    init() {
        this.hideItems(this.newItems);
        this.hideItems(this.oldItems);
        this.bindTriggers(this.oldOfficer, this.oldCounter, this.oldItems);
        this.bindTriggers(this.newOfficer, this.newCounter, this.newItems);
    }

}