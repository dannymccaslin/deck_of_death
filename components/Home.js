import React, { useState } from "react";
import { TextInput, Button, Text, View, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Text>This is Home</Text>
      <TouchableHighlight style={styles.buttonStyle} onPress={() => navigation.navigate("Assign Suits")}>
        <Text style={styles.buttonText}
          title="Assign Exercises to Suits"
          
        >Assign Exercises to Suits</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.buttonStyle} onPress={() => navigation.navigate("Settings")}>
        <Text style={styles.buttonText}
          title="Change Settings">Change Settings
          </Text>
        
      </TouchableHighlight>
      <TouchableHighlight style={styles.buttonStyle} onPress={() => navigation.navigate("History")}>
        <Text style={styles.buttonText}
          title="History">Workout History
          </Text>
        
      </TouchableHighlight>
      <TouchableHighlight style={styles.buttonStyle}  onPress={() => {
            { isVisible ? setIsVisible(false) : setIsVisible(true)};
          }}>
        <Text style={styles.buttonText}
          title="See Creator Name">See Creator Name</Text>
         
       
      </TouchableHighlight>
      {isVisible ? <Text>Danny McCaslin</Text> : <Text>Alt</Text>}
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 10,
    width: 200,
    height: 100,
    backgroundColor: "#009688",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: 'bold'
  },
});
