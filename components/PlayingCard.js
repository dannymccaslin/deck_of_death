import CardImage from './CardImage';


function PlayingCard(s,f) {
    this.suit = s;
    this.face = f;
    //Get the value pf a card (King of Hearts, etc)
    this.getValue = () => {
        return `${this.face} of ${this.suit}`;
    };
    //Get the Face Value (What the card is worth)
    this.getFaceValue = () => {
        if (this.face === 'Ace') {
            return 11;
        } else if (this.face === 'King' || this.face === 'Queen' || this.face === 'Jack' || this.face === '10') {
            return 10;
        }else if (this.face === 'Joker') {
            return 15;
        } else {
            return parseInt(this.face);
        }
    };
    //Get the duit 9to match up with the workouts (Spades = Push Ups, etc)
    this.getSuit = () => {
        return this.suit;
    }
    //Transform card names into the names of the PNG files
    this.getLink = () => {
        let fiv = '';
        if (this.face === '10') {
             fiv = '10';
        } else {
             fiv = this.face[0];
        }
        let fis = this.suit[0];
        const key = fiv + fis;
        return CardImage[key] ;
    }
}
export default PlayingCard;