export default class Slider {
    constructor({
        container = null, 
        btns = null, 
        next = null,
        activeClass = '',
        animate,
        autoPlay, 
        prev = null} = {}
        ){
        this.container = document.querySelector(container);
        this.slides = this.container.children;
        this.btns = document.querySelectorAll(btns);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoPlay = autoPlay;
        this.slideIndex = 1; // визначає який поточний слайд 
    }
}