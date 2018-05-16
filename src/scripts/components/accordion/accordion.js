'use strict';




export default class Accordion {
    constructor() {

        this.components = [];



    }

    setup() {
        console.log('restructure')
        return new Promise((resolve, reject) => {


            const components = document.querySelectorAll('.component');
            for (let n=0; n<components.length; n++) {
                let component =  components[n];

                if (this.shouldRestructure(component)) {
                    this.restructureComponent(component);
                }

            }
            resolve();
        });
    }

    shouldRestructure(component) {
        return !component.classList.contains('hero-component');
    }

    restructureComponent(component) {
        const header = component.querySelector('.header');
        if (!header) {
            return;
        }
        const parent = header.parentNode;

        const contentWrapper = this.addWrapperElement(parent)

        const elements = parent.querySelectorAll('.element');
        for (let n=0; n<elements.length; n++) {
            const element = elements[n];
            console.log(element);
            contentWrapper.appendChild(element);
        }

        this.setupEvents(header, component);

    }
    setupEvents(header, component) {
        header.addEventListener('click', () => {
            component.classList.toggle('faq-expanded');
        })
        header.classList.add('faq-openable')
    }

    addWrapperElement(parent) {
        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('webdok-faq-content-wrapper');
        parent.appendChild(contentWrapper);
        return contentWrapper;
    }

}