import React, { useState,useContext, useEffect,  } from 'react';
import {
        Text , 
        View,
        StyleSheet,
        Image} from 'react-native';
import { HeaderTitle } from '@react-navigation/stack';
import SettingsContext, {SettingsConsumer} from '../context/SettingsContext';
import SwipeGesture from '../swipe-gesture/swipe-gesture';
import PlayingCard from './PlayingCard';



const Deck = (props) => {
    //Import Settings
    const appSettings = useContext(SettingsContext);

    //Create the deck
    const createDeck = () => {
        function shuffle(array) {
          for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        
            // swap elements array[i] and array[j]
            // we use "destructuring assignment" syntax to achieve that
            [array[i], array[j]] = [array[j], array[i]];
          }
        }
        
        var suits = ['Hearts','Spades','Clubs','Diamonds'];
        var faces = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'];
        const deck = [];
        for (var c = 0; c < appSettings.settings.numberOfDecks; c++) {
            for (var i = 0; i < suits.length; i++) {
            for (var j = 0; j < faces.length; j++) {
                let suit = suits[i];
                let face = faces[j];
                let card = new PlayingCard(suit, face);
                deck.push(card);
                }
            }
        }
        shuffle(deck);
        // console.log('inside createDeck(): ', deck[0].getValue());
    
        return(deck);
    
    }

    //Define State Hooks
    const [shuffledDeck,setShuffledDeck] = useState(createDeck());
    const [isHidden, setIsHidden] = useState(true);
    const [suitxercises, setSuitExercises] = useState(props.exercises);
    const [cardTime, setCardTime] = useState(0);
    const suitToLower = (shuffledDeck[0].getSuit()).toLowerCase();
    const dLength = createDeck().length;
   
    //Drop the first card in shuffledDeck
    const dropFirstCard = () => {
        
        const newDeck = [...shuffledDeck];
        newDeck.shift();
        setShuffledDeck(newDeck);

    }

    //Send card data back to Timer to be logged in Results

    function handleCard() {
        const returnVals = {
            suit: shuffledDeck[0].getSuit(),
            exercise: suitxercises[suitToLower],
            name: shuffledDeck[0].getValue(),
            value: shuffledDeck[0].getFaceValue()
    
        }
        props.result(returnVals);
        if (shuffledDeck.length >= 1) {
            dropFirstCard();
        }
        
    };

    //When the deck length hits zero, tell Timer that the deck is finished
 
    
    return (
        <View style={styles.container}>
            {appSettings.settings.useJokers ? <Text>Using Jokers</Text>: <Text>Not Using Jokers</Text>}
            {shuffledDeck.length >= 1 ?
                <View>
                    <SwipeGesture 
                        onSwipePerformed={handleCard} >
                        <View style={styles.cardImage}>
                            <Image style={styles.image} source={shuffledDeck[0].getLink()} />
                        </View>
                    </SwipeGesture> 
                    <Text style={styles.header}>{shuffledDeck[0].getFaceValue()} {suitxercises[suitToLower]} </Text>
                </View>
            : null}
            <Text>{shuffledDeck.length}/{dLength}</Text>  
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        alignItems: 'center'
    },
    cardImage: {
    width: 350,
    height: 538

    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    imageCont: {
        width: 10
    },
    header: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default Deck;