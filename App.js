"use strict";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import TabViewExample from "./components/tabview";
import Header from "./components/header";
import Mic from "./components/mic";
const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <TabViewExample />
      <Mic />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",

    paddingHorizontal: 40,
    overflow: "hidden",
    backgroundColor: "#0d1344",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#1a2e87",
    borderRadius: 10,
    elevation: 3,
  },
  switchLabel: {
    fontSize: 18,
    marginRight: 10,
    color: "#ffffff",
  },
  humidityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  humidityLabel: {
    fontSize: 18,
    marginRight: 10,
    color: "#ffffff",
  },
  humidityValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  switch: {},
});
