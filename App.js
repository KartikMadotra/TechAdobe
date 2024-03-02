import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import TabViewExample from "./components/tabview";
import Header from "./components/header";

const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <TabViewExample />
      {/* <StatusBar style="light" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    paddingHorizontal: 20, // Adjusted padding value
    backgroundColor: "#0d1344",
  },
});

export default App;
