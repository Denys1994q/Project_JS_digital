export default class VideoPlayer {
    // 1. завантажуємо скріпт для створення плеєру 
    // 2. створюємо плеєр 
    // 3. При кліку показуємо створений плеєр 
    // 4. При кліку на хрестик плеєр закривається 

    // не треба робити так, щоб кожен раз створювався новий плеєр, коли клікаємо на кнопку. Бо тоді працює некоректно (залишається path від першої кнопки, по якій клікнув)

    // 5. Коли перше відео закінчується, розблоковується наступне 
    // 6. Щоб відео не відкривалося, якщо воно ще не розблоковане 

    constructor({
        btns = null,
        overlay = null }) {

        this.btns = document.querySelectorAll(btns);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this); // щоб ця функція з ютубівського апі запускалася з контекстом нашого об'єкту 
    }

    bindTriggers() { // 3. 
        this.btns.forEach((btn, i) => {
            try {
                const blockedElem = btn.closest('.module__video-item').nextElementSibling; // 6.
                if (i % 2 == 0) { // всі парні блоки 
                    blockedElem.setAttribute('data-disabled', 'true'); // блоку назначаємо disabled
                }
            } catch (e) { }

            btn.addEventListener('click', () => {
                if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') { // 6.
                    this.activeBtn = btn; // кнопка, на яку ми клікнули // 5. 
                    if (document.querySelector('iframe#frame')) { // якщо відкритий, то не створюємо знову, а просто показуємо
                        this.overlay.style.display = 'flex';
                        if (this.path !== btn.getAttribute('data-url')) { // якщо ми клікнули на іншу кнопку (тобто, this.path - буде іншим)
                            this.path = btn.getAttribute('data-url'); // просто записуємо нове значення this.path, яке відповідає тій кнопці, по якій ми клікнули 
                            this.player.loadVideoById({ videoId: this.path });
                        }
                    } else { // якщо плеєр ще не було створено, то створюємо 
                        this.path = btn.getAttribute('data-url');
                        this.createPlayer(this.path);
                    }
                }
            });
        })
    }

    bindCloseBtn() { // 4. 
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        })
    }

    createPlayer(url) { // 2. створюємо плеєр і показуємо його через flex 
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: { // 5. 
                'onStateChange': this.onPlayerStateChange
            }
        });
        this.overlay.style.display = 'flex';
    }

    onPlayerStateChange(state) { // 5. 
        try {
            // замінюємо заблоковані елементи по верстці на розблоковані (міняємо іконки, написи і т.д.)
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true); // копіюємо свг іконку 

            if (state.data === 0) { // якщо статус відео - закінчено
                // console.log(this.activeBtn.closest('.module__video-item'))
                if (blockedElem.querySelector('.play__circle').classList.contains('closed')) { // тільки, якщо ще не було відкрито, тоді забирати цей клас. Щоб не вийшло так, що вже відкрито, а ми намагаємо видалити клас, який вже видалено раніше 
                    blockedElem.setAttribute('data-disabled', 'false') // 6.
                    blockedElem.querySelector('.play__circle').classList.remove('closed'); // 5.
                    blockedElem.querySelector('svg').remove(); // видалили свг старе 
                    blockedElem.querySelector('.play__circle').appendChild(playBtn); // вставити свг нове
                    blockedElem.querySelector('.play__text').textContent = 'play video'; // міняємо текст
                    blockedElem.querySelector('.play__text').classList.remove('attention');
                    blockedElem.style.opacity = 1;
                    blockedElem.style.filter = 'none';
                }
            }
        }
        catch (e) { }
    }

    init() {
        if (this.btns.length > 0) { // перевіряємо чи є в нас взагалі кнопки, щоб не було помилки 
            const tag = document.createElement('script'); // 1. 
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // 1.

            this.bindTriggers();
            this.bindCloseBtn();
        }
    }

}