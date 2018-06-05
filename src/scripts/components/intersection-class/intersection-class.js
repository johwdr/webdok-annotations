'use strict';





export default class IntersectionClass {
    constructor(selector) {

        this.els = document.querySelectorAll(selector)

        var options = {
            root: null,
            rootMargin: '0px',
            threshold: 0
          }
        var observer = new IntersectionObserver((entries, observer) => {
            this.intersectionCallback(entries, observer)
        }, options);


        for (let n=0; n<this.els.length; n++) {
            const element = this.els[n];
            observer.observe(element);
        }
    }


    intersectionCallback(entries, observer) {

        for (let n=0; n < entries.length; n++) {
            const entry = entries[n];
            if (entry.isIntersecting) {
                entry.target.classList.add('intersecting')
                entry.target.classList.add('intersected')
            } else {
                entry.target.classList.remove('intersecting')
            }
        }

    }


}