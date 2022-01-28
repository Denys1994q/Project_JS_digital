import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns, nextBtns, prevBtns) {
        super(btns, nextBtns, prevBtns);
    }

    showSlides(n) { // визначає куди рухається слайдер. Якщо n +1 - вперед, -1 - назад
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
        // модалка 
        try {
            this.hanson.style.opacity = '0';
            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch (e) { }


        this.slides.forEach(slide => {
            slide.style.display = 'none';
        })
        this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers(btns, n) {
        btns.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.plusSlides(n);
            })
        })
    };
       

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch (e) { }

            
        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.plusSlides(1)
            })
            // щоб повертатися на 1 слайд після кліку на лого 
            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        })

            this.showSlides(this.slideIndex);
            this.bindTriggers(this.prevBtns, -1);
            this.bindTriggers(this.nextBtns, 1);
        }
    }

}
