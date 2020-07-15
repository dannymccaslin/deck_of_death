import React, { useState } from 'react';
import { TextInput, 
        Button, 
        Text , 
        View,
        StyleSheet} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Home = ({navigation}) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <View>
            <Text>This is Home</Text>
            <TouchableHighlight
            
                style={styles.buttonStyle}
                >
                <Button
                    title="Assign Exercises to Suits"
                    onPress={() => navigation.navigate('Assign Suits')} 
                />
                </TouchableHighlight>
            <TouchableHighlight
                style={styles.buttonStyle}
                >
                <Button
                    title="Change Settings"
                    onPress={() => navigation.navigate('Settings')} 
            />
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.buttonStyle}
                >
                <Button
                    title="See Creator Name"
                    onPress={() => {setIsVisible(true)}} 
            />
            </TouchableHighlight>
            {isVisible ? <Text>Danny McCaslin</Text>: <Text>Alt</Text>}
        </View>
    )
}
export default Home;

const styles = StyleSheet.create({
    buttonStyle: {
        padding: 10,
        marginTop: 10,
        alignItems: "center"
    }
})