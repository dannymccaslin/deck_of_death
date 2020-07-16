import React, { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { HeaderTitle } from "@react-navigation/stack";
import SettingsContext, { SettingsConsumer } from "../context/SettingsContext";
import SwipeGesture from "../swipe-gesture/swipe-gesture";
import createDeck from "./CreateDeck";

const Deck = (props) => {
  //Import Settings
  const appSettings = useContext(SettingsContext);

  //Define State Hooks
  const [shuffledDeck, setShuffledDeck] = useState(createDeck());
  const [isHidden, setIsHidden] = useState(true);
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
    console.log("New Deck", newDeck);
    newDeck.shift();
    setShuffledDeck(newDeck);
  };

  //Send card data back to Timer to be logged in Results

  function handleCard() {
    if (shuffledDeck.length > 0) {
      const returnVals = {
        suit: shuffledDeck[0].getSuit(),
        exercise: suitxercises[suitToLower],
        name: shuffledDeck[0].getValue(),
        value: shuffledDeck[0].getFaceValue(),
      };
      console.log("Return Vals", returnVals);
      props.onResult(returnVals);
      console.log("Length of Deck", shuffledDeck.length);
      dropFirstCard();
    } else {
      props.onEndDeck();
    }
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
        <View>
          <SwipeGesture onSwipePerformed={handleCard}>
            <View style={styles.cardImage}>
              <Image style={styles.image} source={shuffledDeck[0].getLink()} />
            </View>
          </SwipeGesture>
          <Text style={styles.header}>
            {shuffledDeck[0].getFaceValue()} {suitxercises[suitToLower]}{" "}
          </Text>
        </View>
      ) : null}
      <Text>
        {shuffledDeck.length}/{dLength}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
