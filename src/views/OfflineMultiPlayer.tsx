import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import Game from "./Game";

export default function Home(props: any) {
  return (
    <View style={styles.container}>
      <Game />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"rgba(255,255,255,0.01)",

  },
});
