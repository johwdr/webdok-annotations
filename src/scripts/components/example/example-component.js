'use strict';

import {create, select, fetchFile} from '../../utils/trix-utils';




export default class Example {
    constructor(conf) {

        this.build();


    }

    build() {

        var data = require('../../../assets/data.json');


        let container = select('#starter');

        let content = create('div', container, 'content');

        content.innerHTML = 'Så kører det i smør igen! Navnet er: ' + data.name;

        content.addEventListener('click', () => {
        	console.log('you clicked me!');
        })

        let path = 'https://www.dr.dk/tjenester/visuel/staging/drn-webpack-boilerplate/assets/test/af/nedarvning/test.txt'
        fetchFile(path, (data)=>{
            console.log('got it: ', data);
        })

    }



}