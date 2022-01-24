import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoPlay, paused) {
        super(container, next, prev, activeClass, animate, autoPlay); 
    }

    decorizeSlides() { // додати клас активності першому слайду 
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) { // якщо animate передано в main, бо не всім слайдерам це треба
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });
        this.slides[0].classList.add(this.activeClass);
        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }
        
        if (this.animate) { // якщо animate передано в main, бо не всім слайдерам це треба
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
          // для кнопок в слайді - баг, щоб вони не ставали першими 
          if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
            this.container.appendChild(this.slides[0]); // slide
            this.container.appendChild(this.slides[1]); // btn
            this.container.appendChild(this.slides[2]); // btn
            this.decorizeSlides();    
        } else if (this.slides[1].tagName == "BUTTON") {
            this.container.appendChild(this.slides[0]); // slide
            this.container.appendChild(this.slides[1]); // btn
            this.decorizeSlides();    
        } else {
            this.container.appendChild(this.slides[0]); // перший слайд стає останнім 
            this.decorizeSlides();     
        }
    }
  
    bindTriggers() { // кліки на кнопки
        this.next.addEventListener('click', () => this.nextSlide())

        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
            let active = this.slides[this.slides.length - 1]; // останній слайд стає перед першим  
            this.container.insertBefore(active, this.slides[0]);
            this.decorizeSlides();
        })
    }

    activateAnimation() {
        this.paused = setInterval(() => {
            this.nextSlide();
        }, 3000);
    }
    
    init() { // при ініціалізації, перший раз, ще до кліків
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;
        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoPlay) {
            this.container.addEventListener('mouseenter', () => {
                clearInterval(this.paused);
            })
            this.container.addEventListener('mouseleave', () => {
                this.activateAnimation();
            })
            this.activateAnimation();
        }
    }

}