'use strict';

import {create, select} from '../../utils/trix-utils';

export default class Example {
    constructor(conf) {

        this.build();


    }

    build() {


        const container = select('#starter');

        const content = create('div', container, 'content');

        content.innerHTML = 'Så kører det!';



    }



}