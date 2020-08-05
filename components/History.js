import React, { useEffect,useState, BackHandler} from 'react';
import {Text,StyleSheet,View} from 'react-native';
import Accordian from './Accordian';
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
  
    
    const renderAccordion = (array) => {
        const items = [];
        for ( var item of array) {
            const dateNum = parseInt(item.title);
            const date = new Date(dateNum);
            const dateFormat = moment(date).format('MMMM Do YYYY, h:mm a');
            console.log(item.title);
            items.push(
                <Accordian key={item.title} 
                style={styles.accordian}
                id = {item.title}
                onDelete={(e) => deleteItem(e)}
                title = {dateFormat}
                data = {item.data}
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