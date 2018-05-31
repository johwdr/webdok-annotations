require('../styles/styles.scss');


let activeOverlay = null;
let currentTrigger = null;



function init() {


    const triggers = document.querySelectorAll('[data-overlay-trigger]');
    for (let n=0; n<triggers.length;n++) {
        const el = triggers[n];
        el.addEventListener('click', function(event) {
            event.preventDefault();


            if (activeOverlay) {
                activeOverlay.classList.remove('active')
            }

            const target = event.target;
            const id = target.dataset.overlayTrigger;
            const overlay = document.getElementById(id);

            if (currentTrigger && currentTrigger != target) {
                currentTrigger.classList.remove('active');
                currentTrigger = null;
            }


            if (overlay === activeOverlay) {
                activeOverlay = null;
                target.classList.remove('active');
                currentTrigger = null;
            } else {

                activeOverlay = overlay;
                const y = target.offsetTop + target.offsetHeight;
                overlay.style.top = y + 'px';
                overlay.classList.toggle('active');
                target.classList.add('active');
                currentTrigger = target;
            }




        });
    }
    const overlays = document.querySelectorAll('[data-overlay-contents]');
    for (let n=0; n<overlays.length;n++) {
        const el = overlays[n];
        el.addEventListener('click', function(event) {
            event.preventDefault();
            el.classList.remove('active')
            console.log(overlay);
        });
    }

}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

