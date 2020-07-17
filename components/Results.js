import React, { useState } from "react";
import { TextInput, Button, Text, View, StyleSheet,AsyncStorage } from "react-native";
import { TouchableHighlight, ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

const Results = ({ route }) => {
  const { results } = route.params;
  console.log("Results Screen", results.length);
  let totalTime = 0;
  let spadesTime = 0;
  let clubsTime = 0;
  let diamondsTime = 0;
  let heartsTime = 0;
  let jokersTime = 0;
  const res = results[0];
  const date = new Date();
_storeData = async () => {
  try {
    await AsyncStorage.setItem(
      toString(date),
      JSON.stringify(results)

    );
  } catch (error) {
    console.log('Error: ', error);
  };
};  
  const timeView = (time) => {
    let secs = ("0" + (Math.floor(time / 1) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(time / 60) % 60)).slice(-2);

    return (
      <Text>
        {minutes}:{secs}
      </Text>
    );
  };

  const cardMap = res.map((cardres, index) => {
    const cardName = cardres.card;
    const cardTime = cardres.time;
    const cardSuit = cardres.suit;
    totalTime += cardTime;
    switch (cardSuit) {
      case "Spades":
        spadesTime += cardTime;
        break;
      case "Clubs":
        clubsTime += cardTime;
        break;
      case "Diamonds":
        diamondsTime += cardTime;
        break;
      case "Hearts":
        heartsTime += cardTime;
        break;
      case "jokers":
        jokersTime += cardTime;
      default:
        break;
    }
    return (
      <Text key={cardName}>
        {index}. {cardName} Time: {timeView(cardTime)}
      </Text>
    );
  });
  return (
    <View>
      <Card>
        <Text>Spades: {timeView(spadesTime)}</Text>
      </Card>
      <Card>
      <Text>Clubs: {timeView(clubsTime)}</Text>
      </Card>
      <Card>
      <Text>Diamonds: {timeView(diamondsTime)}</Text>
      </Card>
      <Card>
      <Text>Hearts: {timeView(heartsTime)}</Text>
      </Card>
      <Card>
      <Text>Total: {timeView(totalTime)}</Text>
      </Card>
      <Text> ---------------------</Text>
      <ScrollView>{cardMap}</ScrollView>
    </View>
  );
};
export default Results;
