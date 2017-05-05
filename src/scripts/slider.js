'use strict';
import X from './trix-utils';
import {TweenMax} from 'gsap';

export default class Slider {
    constructor(conf) {

        this.config = conf;

        let mt = {};

        if (X.isTouchSupported()) {
            mt.isTouch = true;
            mt.clickType = 'touchstart';
            mt.releaseType = 'touchend';
            mt.moveType = 'touchmove';
            mt.leaveType = 'touchleave';
            // svgContainer.style.overflow = 'auto';
        } else {
            mt.isTouch = false;
            mt.clickType = 'mousedown';
            mt.releaseType = 'mouseup';
            mt.moveType = 'mousemove';
            mt.leaveType = 'mouseleave';
        }
        this.mouseTypes = mt;

        this.buildSVGStructure(); //
        this.buttonHidden = true;

        this.clickBoundFunc = this.onClickStart.bind(this); // "This" bindes og funktionen lægges i variabel så den kan tilføjes og fjeners efter behov
        this.releaseBoundFunc = this.onRelease.bind(this); // "This" bindes og funktionen lægges i variabel så den kan tilføjes og fjeners efter behov

        this.boundClickFunc = this.onButtonClick.bind(this); // "This" bindes og funktionen lægges i variabel så den kan tilføjes og fjeners efter behov

        this.moveListenerBind = this.onMove.bind(this); // "This" bindes og funktionen lægges i variabel så den kan tilføjes og fjeners efter behov

        X.fetchFile(X.prepath()+this.config.image, this.onSvgLoad.bind(this));

    }

    buildSVGStructure() {

        // Her bygges strukturen delvist. Knappen, resultatvisning og feedback indholdet bygges først når der er brug for det.

        this.container = X.create('div', this.config.container, 'drkl-mb-slider-container');

        this.introContainer = X.create('div', this.container, 'drkl-intro-container');
        this.introContainer.innerHTML = this.introText();

        this.questionContainer = X.create('div', this.container, 'drkl-question-container');
        this.questionContainer.innerHTML = this.questionText();

        let call = X.create('div', this.questionContainer, 'drkl-call-to-action');
        call.innerHTML = 'Træk i grafikken og gæt';
        call.style.color = this.config.buttonColor;

        this.svgContainer = X.create('div', this.container, 'drkl-svg-container');

    }

    buildInteractionStructure() {

        // Her bygges de felter der viser værdierne og gæt knappen

        this.buttonHidden = false;

        this.interactionContainer = X.create('div', this.container, 'drkl-interaction-container');
        this.interactionOutput = X.create('div', this.interactionContainer, 'drkl-interaction-output');

        this.interactionFact = X.create('div', this.interactionContainer, 'drkl-interaction-fact');

        this.buttonContainer = X.create('div', this.interactionContainer, 'drkl-interaction-button-container');
        this.button = X.create('div', this.buttonContainer, 'drkl-interaction-button');

        this.button.addEventListener(this.mouseTypes.clickType, this.boundClickFunc);

        this.button.innerText = `Gæt`;
        this.button.style.background = this.config.buttonColor;

        this.updateOutput(this.config.input.min);
        this.updateFact(this.config.input.min);

        TweenMax.to(this.interactionContainer, 1, {opacity: 1});

    }

    buildFeedbackStructure() {

        // Her bygges felterne til forklaringerne efter man har gættet

        this.feedbackContainer = X.create('div', this.container, 'drkl-feedback-container');
        this.feedbackHeader = X.create('div', this.feedbackContainer, 'drkl-feedback-header');
        this.feedbackHeader.innerHTML = this.feedbackHeaderText();
        this.feedbackContent = X.create('div', this.feedbackContainer, 'drkl-feedback-content');
        this.feedbackContent.innerHTML = this.feedbackContentText();

    }

    introText() {
        // Overrides i indholdsklasserne
        return 'default';
    }

    questionText() {
        // Overrides i indholdsklasserne
        return 'default';
    }

    feedbackHeaderText() {
        // Overrides i indholdsklasserne
        return `default`;
    }

    feedbackContentText() {
        // Overrides i indholdsklasserne
        return `default`;
    }

    outputText(value) {

        // HTML'en til når man trækker i grafikken og indstiller sit gæt

        return `<div class="drkl-interaction-output-header" >Dit gæt:</div>
                <div class="drkl-interaction-output-content"> ${value.replace('.', ',')} ${this.config.input.unit}</div>`;
    }

    factText(value) {

        // HTML'en til at animere det rigtige resultat når man har gættet

        return `<div class="drkl-interaction-fact-header" >Korrekt svar:</div>
                <div class="drkl-interaction-fact-content" style="color:${this.config.buttonColor}"> ${value.replace('.', ',')} ${this.config.input.unit}</div>`;
    }

    updateOutput(ratio) {

        // Oversætter den omregnede pixelafstand til den skala man kan gætte indenfor

        let feedbackNorm = X.normalize(ratio, 0, this.config.maxPixelDistance); // Hvor er vi på pixelafstandskalaen

        let feedbackValue = X.linearInterpolate(feedbackNorm, this.config.input.min, this.config.input.max); // Og hvor er det på værdi skalaen

        this.interactionOutput.innerHTML = this.outputText(feedbackValue.toFixed(1)); // Hent HTML der passer til
    }

    updateFact(ratio) {

        // Samme som undateOutput(), men bare til det korrekte svar

        let feedbackNorm = X.normalize(ratio, 0, this.config.maxPixelDistance);
        let feedbackValue = X.linearInterpolate(feedbackNorm, this.config.input.min, this.config.input.max);
        this.interactionFact.innerHTML = this.factText(feedbackValue.toFixed(1));
    }

    onButtonClick() {

        let thisRef = this; // Det er bare så vi kan this'e inden i de indlejrede funktioner;

        this.button.removeEventListener(this.mouseTypes.clickType, this.boundClickFunc);

        this.slideRect.removeEventListener(this.mouseTypes.clickType, this.clickBoundFunc);
        this.slideRect.removeEventListener(this.mouseTypes.releaseType, this.releaseBoundFunc);
        this.slideRect.removeEventListener(this.mouseTypes.leaveType, this.releaseBoundFunc);


        this.updateFact(this.userIndicatorChangeFactor); // Sæt resultatet til brugerens gæt, inden det animeres til det korrekte svar

        TweenMax.to(this.button, 0.6, {opacity: 0}); // Knappen fades ud
        TweenMax.to(this.interactionFact, 0.6, {opacity: 1}); // Resultat teksten fades ind

        // Grafik elementet animeres til positionen der svarer til det korrekte svr og på hver tween update ændres resultat teksten, så
        TweenMax.to(this.truthIndicator, 1.5, {
            y: -this.truePos,
            delay: 0,
            ease: Power1.easeInOut,
            onUpdate: onUpdateFact,
            onUpdateParams: ['{self}'],
            onComplete: showFeedback
        });

        TweenMax.set(thisRef.marker, {y: -thisRef.userIndicatorChangeFactor}); // Markør streg/bølge/el.lign sættes til gæt positionen og fades ind
        TweenMax.to(thisRef.marker, 1.5, {opacity: 1, ease: Power1.easeInOut});

        function onUpdateFact(tween) {
            // Sætter tallet i resultatvisningen efter hvor langt tween'en er nået
            thisRef.updateFact(Math.abs(tween.target._gsTransform.y));

        }

        function showFeedback() {
            // Når resultat animationen er færdig, vises feedback teksterne under grafikken - strukturen bygges og højden animeres op
            thisRef.buildFeedbackStructure();
            let fbHeight = thisRef.feedbackHeader.getBoundingClientRect().height + thisRef.feedbackContent.getBoundingClientRect().height + 40;
            TweenMax.to(thisRef.feedbackContainer, 0.75, {height: fbHeight, ease: Power1.easeInOut});

        }
    }

    onSvgLoad(data) {

        // Efter svg filen er hentet med XMLhttpRequest injecters det som rå HTML

        this.svgContainer.innerHTML = data;

        // Få fat i de elementer der skal manipuleres
        this.userIndicator = X.select(this.config.userIndicator, this.svgContainer);
        this.truthIndicator = X.select(this.config.factIndicator, this.svgContainer);
        this.marker = X.select(this.config.marker, this.svgContainer);
        this.marker.style.opacity = 0;



        // Her laves et område til at fange touch/mouse events så vi styrer størrelsen på det
        let svgns = 'http://www.w3.org/2000/svg';

        this.slideRect = document.createElementNS(svgns, 'rect');
        this.slideRect.setAttribute('x', '120');
        this.slideRect.setAttribute('y', '60');
        this.slideRect.setAttribute('width', '700');
        this.slideRect.setAttribute('height', '500');
        this.slideRect.setAttribute('fill', 'rgba(255, 255, 255, 0)');
        this.slideRect.style.cursor = 'pointer';
        this.slideRect.style.userSelect = 'none';
        this.slideRect.style.webkitTouchCallout = 'none';

        let svg = X.select('svg', this.svgContainer);
        svg.appendChild(this.slideRect);


        // IE hack for at modvirke den anderledes måd IE skalerer svg på (IE ignorerer viewport området som størrelses angivelse)
        // Hacket har en fætter i onResize() da det er højden vi arbejder med
        if(X.isIE()){
            svg.style.height = '560px'; // tja hvad skal man sige ....
        }

        this.slideRect.addEventListener(this.mouseTypes.clickType, this.clickBoundFunc);
        this.slideRect.addEventListener(this.mouseTypes.releaseType, this.releaseBoundFunc);
        this.slideRect.addEventListener(this.mouseTypes.leaveType, this.releaseBoundFunc);

        this.setUserIndicatorMax();
        this.setTrueAnswerPosition();

        this.userIndicatorChangeFactor = 0; // Det er den vi gemmer touch/mouse bevægelses mængden i

        // Det følgende bliver ikke brugt i klima versionen alligevel og er derfor udkommenteret, men kan måske bruges i andre sammenhænge
        // Det giver mulighed for at rotere de bevægelige elementer i SVG filen. Det medfører dog at grafikken bevæger sig i en anden retning end brugens mus/finger
/*
        if (this.config.tilt.tilting) {
            let rotatable = X.select(this.config.tilt.container);
            rotatable.style.transformOrigin = 'center center';
            rotatable.style.transform = 'rotate(' + this.config.tilt.degree + 'deg)'
        }
*/

        this.startAnimation();

    }

    startAnimation() {

        // Det er her vi sætter grafikken til at bølge op og ned, som en invitation til brugeren.


        let thisRef = this; // For at kunne tilgå "this" inde i indlejrede funktioner


        let elements = [this.truthIndicator, this.userIndicator],
            distanceFactor = 0.25,
            distance = this.config.maxPixelDistance * distanceFactor;

        // TweenMax.to(elements, 1, {});
        this.startAnim = TweenMax.to(elements, 4, {
            y: -distance,
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut,
            onUpdate: updating,
            onUpdateParams: ['{self}']
        });
        this.startAnim.pause(); // Vi pauser animationen efter initialisering og starter og pauser den efter om grafikken er synlig i this.checkFocus();

        function updating(tween) {
            // Vi er nød til at holde styr på hvor grafikken har animeret sig hen, så værdierne passer lige så snart brugerem går igang med at trække
            thisRef.userIndicatorChangeFactor = -tween.target[0]._gsTransform.y;
        }
    }

    onClickStart(ev) {
        ev.preventDefault();
        // console.log(window.pageYOffset);
        // X.select('body').style.overflow = 'auto';
        if (this.startAnim !== null) {
            this.startAnim.kill();
            this.startAnim = null;
            let p = X.select('#pointer', this.container);
            TweenMax.to(p, 0.5, {
                opacity: 0, onComplete: () => {
                    p.style.display = 'none'
                }
            });
        }

        if (this.buttonHidden) {
            this.buildInteractionStructure();
        }
        // console.log('ready to move:', this.mouseTypes.moveType);

        this.clickY = this.getYCoord(ev);
        // if (this.clickY == undefined) this.clickY = ev.layerY;

        this.translateMoveValue(0);
        this.updateOutput(this.tempUserIndicatorHeight);

        this.slideRect.addEventListener(this.mouseTypes.moveType, this.moveListenerBind, false);

    }

    getYCoord(ev){
        let y = ev.clientY;
        if(y === undefined) y = ev.layerY;
        if(this.mouseTypes.isTouch && y === undefined) y = ev.touches[0].clientY;
        return y;
    }

    onMove(ev) {

        ev.preventDefault();
        // console.log('move');

        let currentMouseY = this.getYCoord(ev);
        // if (currentMouseY == undefined) currentMouseY = ev.layerY;

        let pixelMove = (this.clickY - currentMouseY);
        // console.log('pixelMove', currentMouseY, pixelMove);
        this.translateMoveValue(pixelMove);

        this.updateOutput(this.tempUserIndicatorHeight);

        TweenMax.set([this.truthIndicator, this.userIndicator], {y: -this.tempUserIndicatorHeight});

    }

    onRelease(ev) {
        this.userIndicatorChangeFactor = this.tempUserIndicatorHeight;
        this.slideRect.removeEventListener(this.mouseTypes.moveType, this.moveListenerBind);

    }
    translateMoveValue(pixelValue) {
        // console.log('translate: ', pixelValue);

        let norm = X.normalize(pixelValue, 0, this.userIndicatorMax);

        let userMoveRatio = X.linearInterpolate(norm, 0, this.config.maxPixelDistance);

        this.tempUserIndicatorHeight = X.clamp((this.userIndicatorChangeFactor + userMoveRatio), 0, this.config.maxPixelDistance);

    }

    setUserIndicatorMax() {

        let refHeight = this.svgContainer.getElementsByTagName('svg')[0].getAttribute('viewBox').split(' ')[3],
            indexHeight = this.svgContainer.getElementsByTagName('svg')[0].getBoundingClientRect().height;

        this.userIndicatorMax = this.config.maxPixelDistance * (indexHeight / refHeight);

    }

    setTrueAnswerPosition() {

        let trueNorm = X.normalize(this.config.trueAnswer, this.config.input.min, this.config.input.max);

        this.truePos = X.linearInterpolate(trueNorm, 0, this.config.maxPixelDistance);

    }

    onResize() {
        if (X.isIE()) {
            let thesvg = X.select('svg', this.svgContainer);
            let h = (560 / 940) * thesvg.getBoundingClientRect().width;
            thesvg.style.height = Math.round(h) + 'px';
        }


        this.setUserIndicatorMax();

        if (this.feedbackContainer !== undefined) {
            let fbHeight = this.feedbackHeader.getBoundingClientRect().height + this.feedbackContent.getBoundingClientRect().height + 40;
            this.feedbackContainer.style.height = fbHeight + 'px';
        }
        // TweenMax.set(this.feedbackContainer, {height: fbHeight});

    }

    checkFocus(pos) {
        let wh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            b = this.container.getBoundingClientRect().bottom;
        if (b > 0 && b < wh) {
             console.log('in focus', b, wh);
            if (this.startAnim != null) this.startAnim.play();
        } else {
            if (this.startAnim != null) this.startAnim.pause();
        }
    }


}