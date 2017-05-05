export default class X {
    static create (type, parent, classname){
        // Genbruges til at bygge elementer i DOM strukturen
        var el = document.createElement(type);
        if(classname != undefined){
            if(classname.constructor === Array){
                classname.forEach(function(item){
                    el.classList.add(item);
                })
            }else if (classname.constructor === String){
                el.classList.add(classname);
            }
        }
        if(parent){
            parent.appendChild(el);
        }
        return el;
    }
    static select (s, e = document){
        // Genvej til at vælge DOM elementer
        return e.querySelector(s);
    }
    static linearInterpolate(norm, min, max){
        return (max - min) * norm + min;
    }
    static normalize(value, min, max){
        return (value - min) / (max - min);
    }
    static clamp (value, min, max){
        if(value > max) value = max;
        if(value < min) value = min;
        return value;
    }

    static fetchFile(path, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    var data = httpRequest.responseText;
                    if (callback) callback(data);
                }
            }
        };
        httpRequest.open('GET', path);
        httpRequest.send();
    }

    static isTouchSupported() {
        let msTouchEnabled = window.navigator.msMaxTouchPoints;
        let generalTouchEnabled = "ontouchstart" in document.createElement("div");
        if (msTouchEnabled || generalTouchEnabled) {
            //console.log('touch supported');
            return true;
        }
        return false;
    }
    static prepath(){
        return '';
        // return '//www.dr.dk/tjenester/visuel/klima/';
    }

    static isIE(){
        if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)))
        {
            return true;
        }
        return false;
    }



}/*
/!**
 * Created by trix on 08/03/2017.
 *!/
function create(type, parent, classname){
    // Genbruges til at bygge elementer i DOM strukturen
    var el = document.createElement(type);
    if(classname != undefined){
        if(classname.constructor === Array){
            classname.forEach(function(item){
                el.classList.add(item);
            })
        }else if (classname.constructor === String){
            el.classList.add(classname);
        }
    }
    if(parent){
        parent.appendChild(el);
    }
    return el;
}
function select(s){
    // Genvej til at vælge DOM elementer
    return document.querySelector(s);
}
function empty(container){
    // Genvej til at tømme en DIV
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
}
function linearInterpolate(norm, max, min){
    return (max - min) * norm + min;
}
function normalize(value, min, max){
    return (value - min) / (max - min);
}
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
/!**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 *!/
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}
function isTouchSupported() {
    var msTouchEnabled = window.navigator.msMaxTouchPoints;
    var generalTouchEnabled = "ontouchstart" in document.createElement("div");
    if (msTouchEnabled || generalTouchEnabled) {
        //console.log('touch supported');
        return true;
    }
    return false;
}
function fadeOut(el, time, delay) {
    function fadeOut(el, time, delay) {
        if (el.style.opacity === "") el.style.opacity = 1;
        var interval = 60 / (time || 1000);
        setTimeout(function () {
            (function fade() {
                if ((el.style.opacity -= interval) < 0) {
                    el.style.display = "none";
                    el.style.opacity = 0;
                } else {
                    requestAnimationFrame(fade);
                }
            })();
        }, (delay || 0))
    }
}
function fadeIn(el, time, delay, display) {
    if(el.style.opacity==="") el.style.opacity = 0;
    var interval = 60 / (time || 1000);
    el.style.display = display || "block";
    setTimeout(function () {
        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += interval) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            } else {
                el.style.opacity = 1;
            }
        })();
    }, (delay || 0))
}*/
