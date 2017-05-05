/**
 * Created by trix on 02/03/2017.
 */
// import Slider from './slider';
import Temperature from './temperature';
import X from './trix-utils';
require('./styles.scss');

let mainContainer,
    container,
    temperature,
    waterLevel,
    waterLevelDK,
    energy,
    ice,
    renewable,
    sliders,
    prepath;


function init() {
    console.log('init detektor version');
    mainContainer = X.select('.detektor-myth-container'); // skal oprettes i html'en
    console.log(mainContainer);

    temperature = new Temperature(mainContainer);


    window.addEventListener('resize', () => {
        temperature.onResize();
    });

    window.addEventListener('scroll', () => {
        temperature.checkFocus();
    })
}
document.addEventListener('DOMContentLoaded', () => {
    init(); // Udkommenteres til launch i webdok, da vi ikke får event dér
});

// init(); // inline kaldes når koden embeddes i webdok formatet