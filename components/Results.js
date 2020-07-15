import React, { useState } from 'react';
import { TextInput, 
        Button, 
        Text , 
        View,
        StyleSheet} from 'react-native';
import { TouchableHighlight, ScrollView } from 'react-native-gesture-handler';

const Results = ({route}) => {
    const {results} = route.params;
    let totalTime = 0;
    let spadesTime = 0;
    let clubsTime = 0;
    let diamondsTime = 0;
    let heartsTime = 0;
    let jokersTime = 0;
    const res = results[0];
    for (var i = 0; i < res.length; i++) {
        
    }
    const timeView = (time) => {
        let secs = ('0' + (Math.floor(time / 1) % 60)).slice(-2);
        let minutes = ('0' + (Math.floor(time / 60) % 60)).slice(-2);

        return (
            <Text>{minutes}:{secs}</Text>
        )
    
    }


    const cardMap = res.map((cardres, index) => {
        const cardName = cardres.card;
        const cardTime = cardres.time;
        const cardSuit = cardres.suit;
        totalTime += cardTime;
        switch(cardSuit) {
            case 'Spades':
                spadesTime += cardTime;
                break;
            case 'Clubs':
                clubsTime += cardTime;
                break;
            case 'Diamonds':
                diamondsTime +=cardTime;
                break;
            case 'Hearts':
                heartsTime += cardTime;
                break;
            case 'jokers':
                jokersTime += cardTime;
            default:
                break;
        }
        return (
       <Text key={cardName}>{index}. {cardName} Time: {timeView(cardTime)}</Text>
        )
    });
    return (
        <View>
            <Text>Spades: {timeView(spadesTime)}</Text>
            <Text>Clubs: {timeView(clubsTime)}</Text>
            <Text>Diamonds: {timeView(diamondsTime)}</Text>
            <Text>Hearts: {timeView(heartsTime)}</Text>
            <Text>Total: {timeView(totalTime)}</Text>
            <Text> ---------------------</Text>
            <ScrollView>
            {cardMap}
            </ScrollView>
        </View>
    )

}
export default Results;