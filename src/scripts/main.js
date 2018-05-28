require('../styles/styles.scss');


import Example from './components/example/example-component';





function init() {


    const ex = new Example();


}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

