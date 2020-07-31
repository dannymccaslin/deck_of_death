import React, { useState } from "react";
import { TextInput, Button, Text, View, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.container}>
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

const width_proportion = '90%';
const height_proportion = '20%';

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#5A9BD4',
  },
  buttonStyle: {
    flexDirection: 'row',
    width: width_proportion,
    height: height_proportion,
    backgroundColor: "#009688",
    alignItems: "center",
    justifyContent: "center",
  },
  
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: 'bold'
  },
});
