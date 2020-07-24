import React from 'react';
import {Text,AsyncStorage,StyleSheet,View} from 'react-native';
import { Card } from 'react-native-paper';
import { ListItem } from 'react-native-elements';

const History = () => {

    function showKeys (result)  {
        result.map(res => console.log(res));
    };
    function failureCallback(error) {
        console.error( error);
      }

    const fetchAllItems = async () => {
        try{
            const keys =  AsyncStorage.getAllKeys();



            keys.then(showKeys, failureCallback);

        }
        catch (error) {
            console.log('Oopsie! ', error);
        }
    }
    

    console.log(fetchAllItems());

    return (
        <View style={styles.container}>
            <Text>Nothing Here</Text>
            {/* {fetchAllItems()} */}
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