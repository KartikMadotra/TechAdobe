"use strict";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Dimensions,
  Platform,
} from "react-native";
import TabViewExample from "./components/tabview";
import Header from "./components/header";
// import Mic from "./components/mic";
// import { ViewPager } from "@react-native-community/viewpager";

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <TabViewExample />
      {/* <Mic /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 40, // Fixed padding value
    overflow: "hidden",
    backgroundColor: "#0d1344",
  },
  heading: {
    fontSize: 24, // Removed dynamic font size
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
    borderRadius: 10, // Fixed border radius
    elevation: 3,
  },
  switchLabel: {
    fontSize: 18, // Removed dynamic font size
    marginRight: 10, // Fixed margin value
    color: "#ffffff",
  },
  humidityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20, // Removed dynamic margin value
  },
  humidityLabel: {
    fontSize: 18, // Removed dynamic font size
    marginRight: 10, // Fixed margin value
    color: "#ffffff",
  },
  humidityValue: {
    fontSize: 18, // Removed dynamic font size
    fontWeight: "bold",
    color: "#ffffff",
  },
  switch: {},
});

export default App;
