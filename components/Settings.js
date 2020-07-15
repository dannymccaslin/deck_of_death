import React, { useState, useContext } from 'react';
import { TextInput, 
        Button, 
        Switch,
        Text , 
        View,
        StyleSheet} from 'react-native';
import SettingsContext, {SettingsConsumer} from '../context/SettingsContext';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Settings = () => {
    const appSettings = useContext(SettingsContext);
    const [useJokers, setUseJokers] = useState(appSettings.settings.useJokers);
    const [jokersExercise, setJokersExercise] = useState(appSettings.settings.jokersExercise);
    const [jokersReps, setJokersReps] = useState(appSettings.settings.jokersReps);
    const [noDecks, setNoDecks] = useState(appSettings.settings.numberOfDecks);
    const toggleJokers = () => setUseJokers(previousState => !previousState);
    const changeExercise = (text) => setJokersExercise(text);
    const changeNumberReps = (text) => setJokersReps(text);
    const changeNoDecks = (text) => setNoDecks(text);


    const updateSettings = () => {
        const newState = {
            useJokers: useJokers,
            jokersExercise: jokersExercise,
            jokersReps: jokersReps,
            numberOfDecks: noDecks
        }
        appSettings.saveSettings(newState);

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
                thumbColor={useJokers ? "#009688" : "#f4f3f4"} />
            {useJokers ? 
                <View>
                    <TextInput style={styles.input} value={jokersExercise} onChangeText={changeExercise} placeholder={'Jokers Exercise'}/>
                    <Text>Number of Joker Exercises:</Text>
                    <TextInput  value={jokersReps} onChangeText={changeNumberReps} keyboardType={"number-pad"}/>
                </View> : null}
                <Text>Number of Decks: </Text>
                <TextInput style={styles.input} value={noDecks} onChangeText={changeNoDecks} />
            <TouchableHighlight style={styles.buttonStyle} onPress={updateSettings}>
                <Text style={styles.buttonText}>Save Settings</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: 60,
        width: 200,
        height: 100,
        backgroundColor: '#009688',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white', 
        fontSize: 20       
    },
    container: {
        flex: 4,
        alignItems: "center",
      },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginBottom:10,
    },
    slider: {
    },
    header: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default Settings;