export default class Slider {
    constructor({
        container = null, 
        btns = null,   
        prevBtns = null, 
        nextBtns = null,
        next = null,
        activeClass = '',
        animate,
        autoPlay, 
        prev = null} = {}
        ){
            
        this.container = document.querySelector(container);
        try {this.slides = this.container.children;} catch(e) {}
        this.btns = document.querySelectorAll(btns);
        
        this.prevBtns = document.querySelectorAll(prevBtns);
        this.nextBtns = document.querySelectorAll(nextBtns);

        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoPlay = autoPlay;
        this.slideIndex = 1; // визначає який поточний слайд 
    }
}