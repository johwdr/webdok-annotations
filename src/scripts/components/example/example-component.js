'use strict';

import {create, select} from '../../utils/trix-utils';

export default class Example {
    constructor(conf) {

        this.build();


    }

    build() {


        let container = select('#starter');

        let content = create('div', container, 'content');

        content.innerHTML = 'Så kører det i smør igen!';

        content.addEventListener('click', () => {
        	console.log('you clicked me!');
        })



    }



}