import React, { useState } from "react";
import { TextInput, Button, Text, View, StyleSheet } from "react-native";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.buttonStyle}>
      <TouchableHighlight style={styles.buttonStyleTouchable} onPress={() => navigation.navigate("Assign Suits")}>
        <Text style={styles.buttonText}
          title="Assign Exercises to Suits"
          
        >Assign Exercises to Suits</Text>
      </TouchableHighlight>
      </View>
      <View style={styles.buttonStyle}>
      <TouchableHighlight style={styles.buttonStyleTouchable} onPress={() => navigation.navigate("Settings")}>
        <Text style={styles.buttonText}
          title="Change Settings">Change Settings
          </Text>
        
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
  );
};
export default Home;

const width_proportion = "80%";
const height_proportion = "15%";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#5A9BD4',
  },
  buttonStyle: {
    // margin: 3,
    width: width_proportion,
    height: height_proportion,
    backgroundColor: "#009688",
    // justifyContent: "center",
  },
  buttonStyleTouchable : {
    width: '100%',
    height: '100%',
  },
  
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: 'bold'
  },
});
