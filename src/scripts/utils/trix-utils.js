function create (type, parent, classname){
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
function select (s, e = document){
    // Shortcut to select dom elements
    return e.querySelector(s);
}
function selectAll (s, e = document){
    // Shortcut to select dom elements
    return e.querySelectorAll(s);
}
function linearInterpolate(norm, min, max){
    return (max - min) * norm + min;
}
function normalize(value, min, max){
    return (value - min) / (max - min);
}
function clamp (value, min, max){
    if(value > max) value = max;
    if(value < min) value = min;
    return value;
}

function fetchFile(path, callback) {
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

function isTouchSupported() {
    let msTouchEnabled = window.navigator.msMaxTouchPoints;
    let generalTouchEnabled = "ontouchstart" in document.createElement("div");
    if (msTouchEnabled || generalTouchEnabled) {
        //console.log('touch supported');
        return true;
    }
    return false;
}
function prepath(){
    return '';
}

function isIE(){
    if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)))
    {
        return true;
    }
    return false;
}

function addThousandsSeperators(x) {
        var parts = x.toString().split(",");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(",");
    }
function easeInOutSine(t, b, c, d){
    // t: current time, b: begInnIng value, c: change In value, d: duration
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}
function easeOutIn(t, b, c, d){
    // t: current time, b: begInnIng value, c: change In value, d: duration
    if ((t /= d/2)<1) return c/2 * (Math.sin(Math.PI*t/2) ) + b;
    return -c/2 * (Math.cos(Math.PI*--t/2)-2) + b;      
}
function easeInSine(t, b, c, d){
    // t: current time, b: begInnIng value, c: change In value, d: duration
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
}
function easeOutSine(t, b, c, d){
    // t: current time, b: begInnIng value, c: change In value, d: duration
    return c * Math.sin(t/d * (Math.PI/2)) + b;
}


export { create, select, selectAll, linearInterpolate, normalize, clamp, fetchFile, isTouchSupported, prepath, isIE, addThousandsSeperators, easeInOutSine, easeOutIn, easeInSine, easeOutSine}