require('../styles/styles.scss');


import Example from './components/example/example-component';





function init() {


    const ex = new Example();


}
document.addEventListener('DOMContentLoaded', () => {
    init(); // Udkommenteres til launch i webdok, da vi ikke får event dér
});

