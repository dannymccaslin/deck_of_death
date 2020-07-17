import React from 'react';
import {Text,AsyncStorage,StyleSheet,View} from 'react-native';
import { Card } from 'react-native-paper';

const History = () => {
    const allKeys = AsyncStorage.getAllKeys((err, keys) => {
        keys.map((key) => {
            console.log(key);
            return (
            <Card key={key}>{key}</Card>
            )
        });
    });
    console.log(allKeys.length);

    return (
        <View style={styles.container}>
            <Text>Nothing Here</Text>
            {allKeys}
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