import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Forms from './modules/forms';
import Accordion from './modules/accordion';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
    // 4 різні слайдери: 1 екземпляр MainSlider, 3 екземпляри MiniSlider
    const slider = new MainSlider({
        btns: '.next',
        container: '.page'
    });
    slider.render();

    const modulePageSlider = new MainSlider({
        btns: '.next',
        container: '.moduleapp',
        nextBtns: '.nextmodule',
        prevBtns: '.prevmodule',
    });
    modulePageSlider.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        autoPlay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    // ютуб-плеєр
    new VideoPlayer({
        overlay: '.overlay',
        btns: '.showup .play'
    }).init();

    new VideoPlayer({
        overlay: '.overlay',
        btns: '.module__video-item .play'
    }).init();

    new Difference('.officerold', '.officernew', '.officer__card-item').init();
    new Forms('form', '.form__block input').init();

    new Accordion('.module__info-show .plus').init();

    new Download('.download').init();

});