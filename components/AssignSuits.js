import React, { useState } from "react";
import { TextInput, Button, Text, View, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const AssignSuits = ({ sendExercises, navigation }) => {
  const [spadesExercise, setSpadesExercise] = useState("");
  const [clubsExercise, setClubsExercise] = useState("");
  const [diamondsExercise, setDiamondsExercise] = useState("");
  const [heartsExercise, setHeartsExercise] = useState("");

  const collectExercises = () => {
    const eList = [
      {
        spades: spadesExercise,
        clubs: clubsExercise,
        diamonds: diamondsExercise,
        hearts: heartsExercise,
      },
    ];
    navigation.navigate("Timer", {
      suitList: eList,
    });
    // sendExercises(eList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter the Exercises For Each Suit</Text>
      <TextInput
        style={styles.textInput}
        autoCapitalize="words"
        onChangeText={(text) => setSpadesExercise(text)}
        value={spadesExercise}
        placeholder="Spades"
      />
      <TextInput
        style={styles.textInput}
        autoCapitalize="words"
        onChangeText={(text) => setClubsExercise(text)}
        value={clubsExercise}
        placeholder="Clubs"
      />
      <TextInput
        style={styles.textInput}
        autoCapitalize="words"
        onChangeText={(text) => setDiamondsExercise(text)}
        value={diamondsExercise}
        placeholder="Diamonds"
      />
      <TextInput
        style={styles.textInput}
        autoCapitalize="words"
        onChangeText={(text) => setHeartsExercise(text)}
        value={heartsExercise}
        placeholder="Hearts"
      />
      <TouchableHighlight
        style={styles.buttonStyle}
        onPress={collectExercises}
        title="Submit"
      >
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    padding: 10,
    width: 200,
  },
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
    fontSize: 40,
  },
  header: {
    alignContent: "center",
    fontSize: 20,
    margin: 10,
  },
  container: {
    alignItems: "center",
  },
});
export default AssignSuits;
