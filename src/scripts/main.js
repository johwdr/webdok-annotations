require('../styles/styles.scss');






function init() {

    let activeOverlay = null;
    const triggers = document.querySelectorAll('[data-overlay-trigger]');
    for (let n=0; n<triggers.length;n++) {
        const el = triggers[n];
        el.addEventListener('click', function(event) {
            event.preventDefault();
            const target = event.target;
            const id = target.dataset.overlayTrigger;
            console.dir(target);

            const overlay = document.getElementById(id);
            const x = target.offsetLeft + (target.offsetWidth/2);
            const y = target.offsetTop + (target.offsetHeight/2);
            //overlay.classList.add('active')
            overlay.style.transformOrigin =  x + 'px ' + y + 'px';
            overlay.classList.add('active')
            console.log(id);
            console.log(overlay);
        });
    }
    const overlays = document.querySelectorAll('[data-overlay-contents]');
    for (let n=0; n<overlays.length;n++) {
        const el = overlays[n];
        el.addEventListener('click', function(event) {
            event.preventDefault();
            const overlay = event.target; //.getElementById(id);
            overlay.classList.remove('active')

            console.log(overlay);
        });
    }

}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

