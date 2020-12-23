import React from "react";
import { StyleSheet, Image } from "react-native";

import OfflineMultiPlayer from "./src/views/OfflineMultiPlayer";
import Login from "./src/views/Login";
import SinglePlayer from "./src/views/SinglePlayer";
import Settings from "./src/views/Settings";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import StoreProvider from "./src/store";
import { createStackNavigator } from "@react-navigation/stack";
import Entry from "./src/views/Entry";
import PlayerList from "./src/views/PlayerList";
import OnlineMultiPlayer from "./src/views/OnlineMultiPlayer";

const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <StoreProvider>
        <Stack.Navigator
          screenOptions={{
            title: "Baaghchal",
            headerRight: () => null,
            headerTintColor: "#234144",
          }}
        >
          <Stack.Screen name="Entry" component={Entry} />
          <Stack.Screen
            name="OfflineMultiPlayer"
            component={OfflineMultiPlayer}
          />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="OnlineMultiPlayer"
            component={OnlineMultiPlayer}
          />
          <Stack.Screen name="PlayerList" component={PlayerList} />
          <Stack.Screen name="SinglePlayer" component={SinglePlayer} />
        </Stack.Navigator>
      </StoreProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
