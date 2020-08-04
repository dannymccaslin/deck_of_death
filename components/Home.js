import React, { useState } from "react";
import { TextInput, Button, Text, View, StyleSheet } from "react-native";
import {Icon} from 'react-native-elements';

import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.main}>
      <View style={styles.topRight}>
            <Icon style={styles.topIcon} color={'white'} size={36} onPress={() => navigation.navigate("Settings")} name='settings'></Icon>
            <Icon style={styles.topIcon} color={'white'} size={36} onPress={() => alert('Pressed Help')} name='help'></Icon>
      </View>
      <View style={styles.container}>
      <View style={styles.buttonStyle}>
      <TouchableHighlight style={styles.buttonStyleTouchable} onPress={() => navigation.navigate("Assign Suits")}>
        <Text style={styles.buttonText}
          title="Assign Exercises to Suits"
          
        >Assign Exercises to Suits</Text>
      </TouchableHighlight>
      </View>
     
      <View style={styles.buttonStyle}>
        <TouchableHighlight style={styles.buttonStyleTouchable} onPress={() => navigation.navigate("History")}>
        <Text style={styles.buttonText}
          title="History">Workout History
          </Text>
        
      </TouchableHighlight>
      </View>
      <View style={styles.buttonStyle}>
      <TouchableHighlight  style={styles.buttonStyleTouchable} onPress={() => {
            { isVisible ? setIsVisible(false) : setIsVisible(true)};
          }}>
        <Text style={styles.buttonText}
          title="See Creator Name">See Creator Name</Text>
         
       
      </TouchableHighlight>
      </View>
      {isVisible ? <Text>Danny McCaslin</Text> : <Text>Alt</Text>}
    </View>
    </View>
  );
};
export default Home;

const width_proportion = "85%";
const height_proportion = "20%";

const styles = StyleSheet.create({
  main: {
    marginTop: '6%',
    backgroundColor: '#353839',
    width: '100%',
    height: '100%',

  },
  container: {
    alignItems: "center",
    flexDirection: 'column',
    marginTop: '16%',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    margin: 3,
    width: width_proportion,
    height: height_proportion,
    backgroundColor: "#009688",
    // justifyContent: "center",
  },
  buttonStyleTouchable : {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: 'bold'
  },
  topRight: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: "2%"
  },
  topIcon: {
    color: 'white'
  }
});
