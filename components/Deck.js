import React, { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import { Overlay} from 'react-native-elements'
import { HeaderTitle } from "@react-navigation/stack";
import SettingsContext, { SettingsConsumer } from "../context/SettingsContext";
import SwipeGesture from "../swipe-gesture/swipe-gesture";
import createDeck from "./CreateDeck";
import { cos } from "react-native-reanimated";

const Deck = (props) => {
  //Import Settings
  const appSettings = useContext(SettingsContext);

  //Define State Hooks
  const [shuffledDeck, setShuffledDeck] = useState(createDeck());
  const [isVisible, setIsVisible] = useState(true);
  const [suitxercises, setSuitExercises] = useState(props.exercises);
  const [cardTime, setCardTime] = useState(0);
  let suitToLower = "";
  if (shuffledDeck.length > 0) {
    suitToLower = shuffledDeck[0].getSuit().toLowerCase();
  }
  const dLength = createDeck().length;

  //Drop the first card in shuffledDeck
  const dropFirstCard = () => {
    const newDeck = [...shuffledDeck];
    newDeck.shift();
    setShuffledDeck(newDeck);
  };

  //Send card data back to Timer to be logged in Results

  function handleCard() {
    if (shuffledDeck.length > 0) {
      let exercise = suitxercises[suitToLower];
      if (shuffledDeck[0].getSuit() === 'Joker') {
        exercise = appSettings.settings.jokersExercise
      };
      const returnVals = {
        suit: shuffledDeck[0].getSuit(),
        exercise: exercise,
        name: shuffledDeck[0].getValue(),
        value: shuffledDeck[0].getFaceValue(),
      };
      props.onResult(returnVals);
      dropFirstCard();
    } else {
        console.log('end ', shuffledDeck.length);
      props.onEndDeck();
    }
  };

  const endDeck = () => {
      setIsVisible(false);
      props.onEndDeck();
      console.log(isVisible);
  }

  //When the deck length hits zero, tell Timer that the deck is finished

  return (
    <View style={styles.container}>
      <Text style={styles.cardCount}>
        {shuffledDeck.length}/{dLength}
      </Text>
      {shuffledDeck.length >= 1 ? (
        <View style={styles.container}>
          <SwipeGesture onSwipePerformed={handleCard}>
            <View style={styles.cardImage}>
              <Image style={styles.image} source={shuffledDeck[0].getLink()} />
            </View>
          </SwipeGesture>
          
            {shuffledDeck[0].getSuit() === 'Joker' ? 
              <Text style={styles.header}>{shuffledDeck[0].getFaceValue()} {appSettings.settings.jokersExercise} </Text> : 
              <Text style={styles.header}>{shuffledDeck[0].getFaceValue()} {suitxercises[suitToLower]} </Text>
          }
          
        </View>
      ) : <Overlay style={styles.overlay} isVisible={isVisible} fullScreen={true} onBackdropPress={endDeck}>
            <View style={styles.container}>
            <Text>Congratulations!</Text>
            <Text>Tap for Results</Text>
            <Button onPress={endDeck} title="Click Here"></Button>
            </View>
          </Overlay>}

    </View>
  );
};

const styles = StyleSheet.create({
    overlay: {
        justifyContent: 'center'
    },  
  container: {
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: '#353839',

  },
  cardImage: {
    width: 350,
    height: 538,
  },
  image: {
    flex: 3,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  imageCont: {
    width: 10,
  },
  header: {
    flex:1,
    fontSize: 32,
    fontWeight: "bold",
    color: 'white'
  },
  cardCount: {
    fontSize: 16,
    color: 'white'
  },
});

export default Deck;
