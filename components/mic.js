import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  useWindowDimensions,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { db } from "./config";
import { update, ref, onValue } from "firebase/database";
import * as Notifications from "expo-notifications";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import Gauge from "react-native-gauge";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const Mic = () => {
  return (
    <View>
      <Image source={require("../assest/sun.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 34,
    width: 34,
  },
});

export default Mic;
