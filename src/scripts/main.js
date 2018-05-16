require('../styles/styles.scss');


import Accordion from './components/accordion/accordion';





function init() {


    if (window.location.href.indexOf('admin/edit') > -1) {
        return;
    }

    const acc = new Accordion();

    console.log(acc);
    acc.setup();
}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

