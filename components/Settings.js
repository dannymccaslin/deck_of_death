import React, { useState, useContext } from "react";
import {
  TextInput,
  Button,
  Switch,
  Text,
  View,
  StyleSheet,
} from "react-native";
import {RadioButton} from 'react-native-paper';
import SettingsContext, { SettingsConsumer } from "../context/SettingsContext";
import { TouchableHighlight } from "react-native-gesture-handler";
import {Toast} from 'react-native-root-toast';

const Settings = ({navigation}) => {
  const appSettings = useContext(SettingsContext);
  const [useJokers, setUseJokers] = useState(appSettings.settings.useJokers);
  const [jokersExercise, setJokersExercise] = useState(
    appSettings.settings.jokersExercise
  );
  const [jokersReps, setJokersReps] = useState(appSettings.settings.jokersReps);
  const [noDecks, setNoDecks] = useState(appSettings.settings.numberOfDecks);
  const [aceValue, setAceValue] = useState(appSettings.settings.aceValue);
  const toggleJokers = () => setUseJokers((previousState) => !previousState);
  const changeExercise = (text) => setJokersExercise(text);
  const changeNumberReps = (text) => setJokersReps(text);
  const changeNoDecks = (text) => setNoDecks(text);

 
  const updateSettings = () => {
    const newState = {
      useJokers: useJokers,
      jokersExercise: jokersExercise,
      jokersReps: jokersReps,
      numberOfDecks: noDecks,
      aceValue: aceValue
    };
    appSettings.saveSettings(newState);
    navigation.navigate('Home');
    
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text>Use Jokers</Text>
      <Switch
        style={styles.slider}
        value={useJokers}
        onValueChange={toggleJokers}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={useJokers ? "#009688" : "#f4f3f4"}
      />
      {useJokers ? (
        <View>
          <TextInput
            style={styles.input}
            value={jokersExercise}
            onChangeText={changeExercise}
            placeholder={"Jokers Exercise"}
          />
          <Text>Number of Joker Exercises:</Text>
          <TextInput
            value={jokersReps}
            onChangeText={changeNumberReps}
            keyboardType={"number-pad"}
          />
        </View>
      ) : null}
      <View style={{margin: 3}}>
      <Text>Number of Decks: </Text>
      <TextInput
        style={styles.input}
        value={noDecks}
        onChangeText={changeNoDecks}
      />
      </View>
      <View style={styles.avContainer}>
        <Text>Ace Value</Text>
        <View style={styles.avRadioCol}>
          <View style={styles.avRadioRow}>
            
            <RadioButton
              value="11"
              status={ aceValue === '11' ? 'checked' : 'unchecked'}
              onPress={() => setAceValue('11')} 
              />
              <Text>11</Text>
            </View>
            <View style={styles.avRadioRow}>
              <RadioButton
              value="1"
              status={ aceValue === '1' ? 'checked' : 'unchecked'}
              onPress={() => setAceValue('1')} 
              />
               <Text>1</Text>

            </View>
          </View>
        </View>
      <TouchableHighlight style={styles.buttonStyle} onPress={updateSettings}>
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableHighlight>
    </View>
  );
};

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
  },
  container: {
    flex: 4,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  slider: {},
  header: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  avContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    margin: 3
  },
  avRadioCol: {
    flexDirection: 'column',
  },
  avRadioRow: {
    flexDirection: 'row',
    alignItems: 'center' ,
  }
});

export default Settings;
