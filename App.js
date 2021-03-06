import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AssignSuits from "./components/AssignSuits";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Timer from "./components/Timer";
import Results from "./components/Results";
import History from './components/History';
import { SettingsProvider } from "./context/SettingsContext";

export default function App() {
  const [exList, setExList] = useState([]);

  const getExercises = (e) => {
    setExList(e);
  };

  const Stack = createStackNavigator();

  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options={{headerShown: false}} name="Timer" component={Timer} />
          <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
          <Stack.Screen name="Assign Suits" component={AssignSuits} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen options={{headerShown: false}} name="Results" component={Results} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
