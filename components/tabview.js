import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  useWindowDimensions,
  Dimensions,
  Platform,
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

const TabViewExample = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [switchStates, setSwitchStates] = useState({
    drawingone: false,
    drawingtwo: false,
    drawingthree: false,
    drawingfour: false,
    drawingfive: false,
    drawingsix: false,
    drawingseven: false,
    drawingeight: false,
    laser: false,
  });

  useEffect(() => {
    const switchesRef = ref(db);

    // Fetch the initial values from Firebase for all switches
    onValue(switchesRef, (snapshot) => {
      const data = snapshot.val();

      if (data !== null && data !== undefined) {
        setSwitchStates({
          drawingone: data.drawingone === "on",
          drawingtwo: data.drawingtwo === "on",
          drawingthree: data.drawingthree === "on",
          drawingfour: data.drawingfour === "on",
          drawingfive: data.drawingfive === "on",
          drawingsix: data.drawingsix === "on",
          drawingseven: data.drawingseven === "on",
          drawingeight: data.drawingeight === "on",
          laser: data.laser === "on",
        });
      }
    });
  }, []);

  const handleSwitchToggle = (key) => {
    // Update the Firebase database when the switch is toggled
    const switchesRef = ref(db);
    update(switchesRef, { [key]: switchStates[key] ? "off" : "on" });

    // Update the local state to reflect the change
    setSwitchStates((prevSwitchStates) => ({
      ...prevSwitchStates,
      [key]: !prevSwitchStates[key],
    }));

    // Send Expo Notification if the switch is turned on
    if (!switchStates[key]) {
      sendNotification(`Switch ${key} is turned on!`);
    }
  };

  const sendNotification = async (message) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Switch On",
        body: message,
      },
      trigger: null,
    });
  };

  const getChartLabels = () => {
    const currentDate = new Date();
    const today = formatDate(currentDate);

    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);
    const yesterday = formatDate(yesterdayDate);

    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const tomorrow = formatDate(tomorrowDate);

    return [today, yesterday, "March", "April", "May", tomorrow];
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const LightsScreen = () => {
    return (
      <View style={styles.lightsContainer}>
        <LightSection label="Drawing Light" switchKey="drawingone" />
        <LightSection label="Drawing Light" switchKey="drawingtwo" />
        <LightSection label="Light 1" switchKey="drawingthree" />
        <LightSection label="Light 2" switchKey="drawingfour" />
        <LightSection label="Light 3" switchKey="drawingfive" />
        <LightSection label="Light 4" switchKey="drawingsix" />
        <LightSection label="Light 5" switchKey="drawingseven" />

        <View style={styles.bottomSection}>{/* Content below Lights */}</View>
      </View>
    );
  };

  const SecurityScreen = () => {
    return (
      <View style={styles.lightsContainer}>
        <LightSection label="Security Light 1" switchKey="drawingeight" />
        <LightSection label="Security Light 2" switchKey="laser" />
        {/* Add more Security Lights if needed */}
        <View style={styles.bottomSection}>
          {/* Content below Security Lights */}
        </View>
      </View>
    );
  };

  const GardenScreen = () => {
    return (
      <View style={styles.lightsContainer}>
        <LightSection label="Garden Light 1" switchKey="laser" />
        {/* Add more Garden Lights if needed */}
        <View style={styles.bottomSection}>
          {/* Content below Garden Lights */}
        </View>

        <View>
          <Text>Bezier Line Chart</Text>

          {/* <AnimatedGaugeProgress
            size={200}
            width={15}
            fill={100}
            rotation={90}
            cropDegree={90}
            tintColor="#4682b4"
            delay={0}
            backgroundColor="#b0c4de"
            stroke={[2, 2]} //For a equaly dashed line
            strokeCap="circle"
          /> */}
          {/* <LineChart
            data={{
              labels: getChartLabels(),
              datasets: [
                {
                  data: [98, 98, 98, 98, 98, 98],
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          /> */}

          {/* <Gauge
            size={75}
            progress={0.5}
            animated={true}
            alwaysUseEndAngle={true}
            endAngle={0}
            unfilledEndAngle={0.5}
            thickness={4}
            borderWidth={1}
            needleWidth={3}
            needleHeight={20}
            needleBorderRadius={25}
          /> */}
        </View>
      </View>
    );
  };

  const renderScene = SceneMap({
    Lights: LightsScreen,
    Security: SecurityScreen,
    Garden: GardenScreen,
  });

  const LightSection = ({ label, switchKey }) => {
    return (
      <View style={styles.lightContainer}>
        <View style={styles.topLeftSection}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.topRightSection}>
          <Switch
            trackColor={{ false: "#060f40", true: "#11d396" }}
            thumbColor={switchStates[switchKey] ? "#fff" : "#fff"}
            onValueChange={() => handleSwitchToggle(switchKey)}
            value={switchStates[switchKey]}
            style={styles.switch}
          />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    lightsContainer: {
      backgroundColor: "#0d1344",
      paddingHorizontal: 16,
      paddingTop: 16,
      flex: 1,
      overflow: "hidden",
    },

    lightContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 14,
      paddingBottom: 17,

      borderBottomWidth: 1,
      overflow: "hidden",
      borderBottomColor: "#ccc",
    },
    topLeftSection: {
      flex: 1,
    },
    topRightSection: {
      marginLeft: "auto",
    },
    label: {
      fontSize: 18,
      color: "#ffffff",
    },
    switch: {
      height: 20,
      width: 40,
      borderRadius: 20,
      transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
    bottomSection: {
      // Styles for the content below Lights
    },
    sceneContainer: {
      flex: 1,
      backgroundColor: "#0d1344",
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 16, // Adjust padding as needed
    },
    tabView: {
      backgroundColor: "#0d1344",
      ...Platform.select({
        android: {
          bottom: -40,
          width: 370,
          left: -30,
        },
      }),
    },
    tabBar: {
      backgroundColor: "#0d1344",
      width: "auto",
    },
    scrollIndicator: {
      backgroundColor: "#2e345e", // Set your preferred color
      borderRadius: 18, // Set your preferred border radius
    },
  });

  const routes = [
    { key: "Lights", title: "Lights" },
    { key: "Security", title: "Security" },
    { key: "Garden", title: "Garden" },
  ];

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={styles.tabView}
      sceneContainerStyle={styles.sceneContainer}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={styles.scrollIndicator}
          style={styles.tabBar}
          activeColor="#fff"
          inactiveColor="#c0c0c0"
        />
      )}
    />
  );
};

export default TabViewExample;
