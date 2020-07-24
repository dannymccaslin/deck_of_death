import React, { useState, useEffect } from "react";
import { TextInput, Button, Text, View, StyleSheet,AsyncStorage ,TouchableOpacity} from "react-native";
import { TouchableHighlight, ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";

const Results = ({ route, navigation }) => {
  const { results } = route.params;
  // console.log("Results Screen", results);
  let totalTime = 0;
  let spadesTime = 0;
  let clubsTime = 0;
  let diamondsTime = 0;
  let heartsTime = 0;
  let jokersTime = 0;
  const res = results[0];
  const date = new Date();

 const goToHistory =() => {
   navigation.navigate('History');
 }
console.log(date);
  useEffect(() => {
    AsyncStorage.setItem(
          toString(date),
          JSON.stringify(res)
          
        );
        console.log('Saves Storage');
  }, []);

  const timeView = (time) => {
    let secs = ("0" + (Math.floor(time / 1) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(time / 60) % 60)).slice(-2);

    return (
      <Text>
        {minutes}:{secs}
      </Text>
    );
  };

  const displayData = async ()=>{  
    try{  
      let user = await AsyncStorage.getItem(toString(date));  
      alert(user);  
    }  
    catch(error){  
      alert(error)  
    }  
  }

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
      <Text key={cardName + index}>
        {index + 1}. {cardName} Time: {timeView(cardTime)}
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
      <TouchableOpacity onPress ={displayData}>  
          <Text>Click to display data</Text>  
        </TouchableOpacity>  
        <TouchableHighlight
        style={styles.buttonStyle}
        onPress={goToHistory}
        title="History"
      >
        <Text style={styles.buttonText}>History</Text>
      </TouchableHighlight> 
      <Text> ---------------------</Text>
      <ScrollView>{cardMap}</ScrollView>
    </View>
  );
};
export default Results;

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 60,
    width: 200,
    height: 100,
    backgroundColor: "#009688",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  }
});