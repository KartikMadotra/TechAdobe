import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import TabViewExample from "./components/tabview";
import Header from "./components/header";
import {
  SafeAreaProvider,
  initialWindowMetrics,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <View style={styles.container}>
        <Header />
        <TabViewExample />
      </View>
    </SafeAreaProvider>
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
