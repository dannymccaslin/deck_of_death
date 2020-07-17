import React, { useState, useEffect } from "react";
import { TextInput, Button, Text, View, StyleSheet, Image } from "react-native";
import Deck from "./Deck";
import { TouchableHighlight } from "react-native-gesture-handler";

// import { HeaderTitle } from '@react-navigation/stack';

const Timer = ({ route, navigation }) => {
  const { suitList } = route.params;
  const suitlist = suitList[0];
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [results, setResults] = useState([]);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setTimer(0);
  }

  const sendTime = () => {
    props.sessionTime(timer);
  };

  // let centiseconds = ('0' + (Math.floor(timer / 1) % 10)).slice(-1);
  let secs = ("0" + (Math.floor(timer / 1) % 60)).slice(-2);
  let minutes = ("0" + (Math.floor(timer / 60) % 60)).slice(-2);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  function handleChange(event) {
    props.onChange(timer);
  }

  const setResultsCard = (event) => {
    const { suit, exercise, name, value } = event;

    const resultCard = {
      time: timer,
      card: name,
      suit: suit,
      exercise: exercise,
    };
    setResults(results.concat(resultCard));
    reset();
  };

  const finishDeck = () => {
    // const time = event;
    // setResultsCard(time);
    console.log("finishing");
    navigation.navigate("Results", { results: [results] });
  };


  return (
    <View style={styles.container}>
      <View>
        <Deck
          exercises={suitlist}
          onResult={setResultsCard}
          onEndDeck={finishDeck}
        />
      </View>

      <Text onChange={handleChange}>
        {minutes}:{secs}
      </Text>
      <TouchableHighlight style={styles.buttonStylePause} onPress={toggle}>
        <Text style={styles.buttonText}>{isActive ? "Pause" : "Resume"}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
  },
  swipesGestureContainer: {
    height: "100%",
    width: "100%",
  },
  cardImage: {
    width: 260,
    height: 400,
  },
  
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  buttonStylePause: {
    backgroundColor: "orange",
    marginTop: 10,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Timer;
