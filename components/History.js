import React from 'react';
import {Text,StyleSheet,View} from 'react-native';
import Accordian from './Accordion';
import { Card } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const History = () => {
    let menu = [
        { 
        title: 'Non Veg Biryanis', 
        data: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
        },
        { 
        title: 'Pizzas',
        data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.'
        },
        { 
        title: 'Drinks',
        data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.'
        },
        { 
        title: 'Deserts',
        data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire'
        },
    ]
    
    const fetchAllItems = async () => {
        try{
            let hist = [];
            let keys;
            let values;
             keys = await  AsyncStorage.getAllKeys();
             keys.forEach(key => {
                values = await AsyncStorage.getItem(keys);
                hist.push(
                    {
                    title: key,
                    data: value
                    }
                    );
             } )
             
             console.log('Keys: ', keys);
            
             return hist;

        }
            catch (error) {
                console.log('Oopsie! ', error);
            }    
        }
    
    renderAccordion = (array) => {
        const items = [];
        for ( item of array) {
            items.push(
                <Accordian key={item.title} onDelete={deleteItem(item.title)}
                title = {item.title}
                data = {item.data}
            />
            );

        }
        return items;
    }

    deleteItem = (e) => {
        console.log('delete', e);
    }


    return (
        <View style={styles.container}>
            <Text>Nothing Here</Text>
            {renderAccordion(menu)}
            {renderAccordion(fetchAllItems())}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: 'center'
      },
})
export default History;