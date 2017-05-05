import Slider from './slider'

export default class Temperature extends Slider{
    constructor(cont){
        let config = {
            container: cont,
            image: 'images/temperature.svg',
            marker: '#temperaturemarker',
            userIndicator: '#mercury',
            factIndicator: '#temperature',
            buttonColor:'#EF3F23',
            tilt: {tilting: true, degree: 12, container: '#rotatable'},
            input: {unit: '°C', max: 9.0, min: 0.0},
            maxPixelDistance: 294,
            trueAnswer: 1.1
        };
        super(config);
        console.log('temper construct', this.config.maxPixelDistance);
    }
    introText () {
        // return 'Temperaturerne er generelt stigende. Det giver ændrede vækstbetingelser på kloden';
        return 'Den globale gennemsnitstemperatur har generelt været stigende siden 1850. Det giver ændrede vækstbetingelser på kloden.';
    }
    questionText () {
        // return 'Hvor meget er gennemsnitstemperaturen steget på verdensplan siden 1850?';
        return 'Hvor meget tror du temperaturen er steget siden 1850?';
    }
    feedbackHeaderText() {
        return `Derfor stiger temperaturen`;
    }
    feedbackContentText() {
        return `Temperaturen er blandt andet steget, fordi vi har udledt drivhusgasser i atmosfæren. Det har gjort den dyne, der ligger over kloden, mere effektiv til at holde på varmen. Livsbetingelserne forandres i takt med, at temperaturen stiger. Landbruget skifter måske afgrøder og skal gøre tingene anderledes. <br/><br/>I gennemsnit er jordens temperatur steget 1,1 grad, men det dækker over store forskelle. Det er måske 4 grader i Arktis og 0,5 grad ude over oceanerne, så der er virkeligt store variationer i, hvor meget temperaturerne stiger. Den gennemsnitlige temperatur i Danmark er siden 1850 steget fra 7,1 til 8,6 grader.`;
    }

}