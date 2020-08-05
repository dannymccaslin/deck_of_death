import React, { useState, useEffect } from "react";
import { TextInput, Button, Text, View, StyleSheet, Image, BackHandler, Alert } from "react-native";
import {Icon} from 'react-native-elements';
import Deck from "./Deck";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

// import { HeaderTitle } from '@react-navigation/stack';

const Timer = ({ route, navigation }) => {
  const { suitList } = route.params;
  const suitlist = suitList[0];
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [results, setResults] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Cancel Workout",
          "Are you sure you want to cancel your workout? This will return you to the Home screen. Your progress will not be saved.",
          [
            {
              text: "Keep Going",
              onPress: () => console.log("Cancel Pressed"),
            },
            { text: "Go Home", onPress: () => navigation.navigate('Home') }
          ],
          {cancelable: false}
      )
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);

    })
  )

  
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
    navigation.navigate("Results", { results: [results] });
  };


  return (
    <View style={styles.container}>
      <View style={{flex: 4}}>
        <Deck
          exercises={suitlist}
          onResult={setResultsCard}
          onEndDeck={finishDeck}
        />
      </View>
      <View style={styles.bottomText}>
        <Text style={styles.timerText} onChange={handleChange}>
          {minutes}:{secs}
        </Text>
        <TouchableHighlight style={styles.buttonStylePause} onPress={toggle}>
          {!isActive ? <Icon size={60} color={'white'} name="pause-circle-filled" /> : <Icon size={60} color={'#ffffff87'} name='pause-circle-outline' />}
          {/* <Text style={styles.buttonText}>{isActive ? "Pause" : "Resume"}</Text> */}
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: '#121212',
    marginTop: '6%'

  },
  swipesGestureContainer: {
    height: "100%",
    width: "100%",
  },
  cardImage: {
    width: "60%",
    height: "60%"
  },
  
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  buttonStylePause: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom:6

  },
  timerText: {
    fontSize:38,
    color: '#ffffff87'
  }
});
export default Timer;
