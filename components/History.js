import React, { useEffect,useState, BackHandler} from 'react';
import {Text,StyleSheet,View} from 'react-native';
import Accordian from './Accordian';
import { Card } from "react-native-paper";
import AsyncStorage from '@react-native-community/async-storage';
import { set } from 'react-native-reanimated';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from "@react-navigation/native";


const History = ({navigation}) => {
    const [hist, setHist] = useState([]);
    // let menu = [
    //     { 
    //     title: 'Non Veg Biryanis', 
    //     data: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
    //     },
    //     { 
    //     title: 'Pizzas',
    //     data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.'
    //     },
    //     { 
    //     title: 'Drinks',
    //     data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.'
    //     },
    //     { 
    //     title: 'Deserts',
    //     data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire'
    //     },
    // ]
    useEffect(() => {
        async function fetchAllData() {
            try{
                let keys = [];
                let values;
                keys = await  AsyncStorage.getAllKeys();
                keys.forEach( async key => {
                    values =  await AsyncStorage.getItem(key);
                    
                    let hObject ={
                        title: key,
                        data: values
                        };
                    setHist(hist => hist.concat(hObject));
                });           

            }
                catch (error) {
                    console.log('Oopsie! ', error);
                }    
        }
        fetchAllData();
        }, []);

        // useFocusEffect( 
        //     React.useCallback(() => {
        //       const onBackPress = () => {
        //         navigation.navigate('Home')
        //       };
        //       BackHandler.addEventListener('hardwareBackPress', onBackPress);

        //       return () =>
        // BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        //     })
        //   )
        const timeView = (time) => {
            let secs = ("0" + (Math.floor(time / 1) % 60)).slice(-2);
            let minutes = ("0" + (Math.floor(time / 60) % 60)).slice(-2);
            return (
                <Text>{minutes}:{secs}</Text>
            );
            };

        const cardMap = (array) => {
            let totalTime = 0;
            let spadesTime = 0;
            let clubsTime = 0;
            let diamondsTime = 0;
            let heartsTime = 0;
            let jokersTime = 0;
            array.map((cardres) => {
            const cardName = cardres.card;
            const cardTime = cardres.time;
            const cardSuit = cardres.suit;
            
            totalTime += cardTime;
                switch (cardSuit) {
                case "Spades":
                    spadesTime += cardTime;
                    break;
                case "Clubs":
                    clubsTime += cardTime;
                    break;
                case "Diamonds":
                    diamondsTime += cardTime;
                    break;
                case "Hearts":
                    heartsTime += cardTime;
                    break;
                case "jokers":
                    jokersTime += cardTime;
                default:
                    break;
                }
             });
            return (
                <View>
                    <Text>Spades: {timeView(spadesTime)}</Text>
                    <Text>Clubs: {timeView(clubsTime)}</Text>
                    <Text>Diamonds: {timeView(diamondsTime)}</Text>
                    <Text>Hearts: {timeView(heartsTime)}</Text>
                    <Text>Total: {timeView(totalTime)}</Text>
                    </View>
            );
            }
    const renderAccordion = (array) => {
        const items = [];
        for ( var item of array) {
            const dateNum = parseInt(item.title);
            const date = new Date(dateNum);
            const dateFormat = moment(date).format('MMMM Do YYYY, h:mm a');
            console.log(item.title);        
            
            const data = JSON.parse(item.data)
            items.push(
                <Accordian key={item.title} 
                style={styles.accordian}
                id = {item.title}
                onDelete={(e) => deleteItem(e)}
                title = {dateFormat}
                data = {cardMap(data)}
            />
            );

        }
        // console.log('Length of items: ',items.length);
        return items;
    }

    const deleteItem = async (e) => {
        console.log('delete', e);
        try {
        await AsyncStorage.removeItem(e);

        }
        catch(error) {
            console.log(error);
        }
        var newArray = [...hist];
        for (var i = 0; i < newArray.length; i++) {
            if (newArray[i].title === e) {
                newArray.splice(i,1);
            }
        }
        setHist(newArray);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>Tap on a date to see a summary of that workout. Long-press the date to delete that workout. (Note: Deleted workouts CANNOT be recovered.)</Text>
                <View style={styles.row}>
                { hist ? renderAccordion(hist) : 
                <View>
                    <Text>Nothing Here!</Text>
                    <Text>Complete a workout or two to add to your history.</Text>
                </View>
                }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
      },
    row: {
    },
    accordian: {
        width: '30%' ,
        borderWidth: 1
        }
})
export default History;