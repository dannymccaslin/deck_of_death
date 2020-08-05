import React, { useState } from "react";
import { Text, View, StyleSheet, Modal, TouchableHighlight, Linking } from "react-native";
import {Icon} from 'react-native-elements';


const Home = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const loadBrowser = (url) => {
    Linking.openURL(url).catch(err => console.log("Can't load URL", err));
  }
  return (
    <View style={styles.main}>
      <View style={styles.topRight}>
            <Icon style={styles.topIcon} color={'white'} size={36} onPress={() => navigation.navigate("Settings")} name='settings'></Icon>
            <Icon style={styles.topIcon} color={'white'} size={36} 
            onPress={() => {
              setHelpVisible(true);
              console.log(helpVisible);
            }}
               name='help'></Icon>
      </View>
{/* Help Modal */}
      <Modal style={styles.centeredView}
        animationType="slide"
        transparent={true}
        visible={helpVisible}
        onRequestClose= {() => console.log('help Modal close request') }
        >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Choose which Exercises you would like to perform for each suit, and then start the game.</Text>
              <Text style={styles.modalText}>Swipe each card to move to the next one. The direction you swipe doesn't matter.</Text>
              <Text style={styles.modalText}>You can pause your workout at any time.</Text>
              <Text style={styles.modalText}>Use Settings (the gear icon at the top of the screen) to adjust settings like whether or not to use Jokers, the value of an Ace, and the number of decks.</Text>
              <Text style={styles.modalText}>Once you complete a workout you will be abe to view your results on the results screen, and you can view your workout history on the History screen.</Text>
            

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setHelpVisible(!helpVisible);
                console.log(helpVisible);
              }}
            >
              <Text style={styles.textStyle}>
                Got It!</Text>
              </TouchableHighlight>
          </View>
        </View>
{/* About Section Modal */}
      </Modal>
      <Modal style={styles.centeredView}
        animationType="slide"
        transparent={true}
        visible={aboutVisible}
        onRequestClose= {() => console.log('help Modal close request') }
        >
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Deck Of Death</Text>
            <Text style={styles.modalText}>Version: 1.0</Text>
              <Text style={styles.modalText}>Original Artwork: 
              <Text style={styles.textLink} onPress={()=>{loadBrowser('https://www.instagram.com/mattjrawson/')}}>Matt Rawson</Text>
              </Text>
              <Text style={styles.modalText}>Developed by: 
                <Text style={styles.textLink} onPress={() => {loadBrowser('http://www.dannymccaslin.org')}}>Danny McCaslin</Text>
              </Text>
              <Text style={styles.modalText}>Special Thanks: Andy Realto</Text>
            

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setAboutVisible(!aboutVisible);
                console.log(aboutVisible);
              }}
            >
              <Text style={styles.textStyle}>
                Got It!</Text>
              </TouchableHighlight>
          </View>
        </View>

      </Modal>
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
            setAboutVisible(true);
          }}>
        <Text style={styles.buttonText}
          title="About">About This App</Text>
         
       
      </TouchableHighlight>
      </View>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    lineHeight: 40,
    fontSize: 18
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textLink: {
    color: '#0645AD',
    textDecorationLine: 'underline',

  }
});
