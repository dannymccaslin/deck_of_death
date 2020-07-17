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
      console.log('before if ', shuffledDeck.length)
    if (shuffledDeck.length > 0) {
        console.log('handle card ', shuffledDeck.length);
      const returnVals = {
        suit: shuffledDeck[0].getSuit(),
        exercise: suitxercises[suitToLower],
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
      {appSettings.settings.useJokers ? (
        <Text>Using Jokers</Text>
      ) : (
        <Text>Not Using Jokers</Text>
      )}
      {shuffledDeck.length >= 1 ? (
        <View style={styles.container}>
          <SwipeGesture onSwipePerformed={handleCard}>
            <View style={styles.cardImage}>
              <Image style={styles.image} source={shuffledDeck[0].getLink()} />
            </View>
          </SwipeGesture>
          <Text style={styles.header}>
            {shuffledDeck[0].getFaceValue()} {suitxercises[suitToLower]}{" "}
          </Text>
        </View>
      ) : <Overlay style={styles.overlay} isVisible={isVisible} fullScreen={true} onBackdropPress={endDeck}>
            <View style={styles.container}>
            <Text>Congratulations!</Text>
            <Text>Tap for Results</Text>
            <Button onPress={endDeck} title="Click Here"></Button>
            </View>
          </Overlay>}
      <Text>
        {shuffledDeck.length}/{dLength}
      </Text>
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
  },
  cardImage: {
    width: 350,
    height: 538,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  imageCont: {
    width: 10,
  },
  header: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Deck;
