import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Button,
  useWindowDimensions,
  Platform,
} from "react-native";
// import { ViewPager } from "@react-native-community/viewpager";

import { db } from "./config";
import { update, ref, onValue } from "firebase/database";
import * as Notifications from "expo-notifications";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
// import GaugeChart from "react-gauge-chart";

import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from @expo/vector-icons

const Alert = ({ message, title, onPress }) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <Ionicons
        name="alert-circle"
        size={24}
        color="black"
        style={styles.icon}
      />
      {/* Wrap the message in a Text component */}
      <Text style={styles.text}>{message}</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.button}>OK</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10, // Add padding around the View
    backgroundColor: "#c94c4c", // Red-ish background color for the alert
    borderRadius: 5, // Rounded corners
    margin: 10, // Margin around the View
    alignItems: "center", // Center align items
  },
  title: {
    color: "white", // Title color
    fontWeight: "bold",
    fontSize: 20, // Title text size
    marginBottom: 5, // Spacing between title and message
  },
  icon: {
    marginBottom: 10, // Spacing between icon and message
  },
  text: {
    color: "black", // Text color
    fontSize: 16, // Text size
  },
  button: {
    color: "white", // Button text color
    backgroundColor: "blue", // Button background color
    padding: 10, // Button padding
    textAlign: "center", // Center-align the button text
    marginTop: 10, // Spacing between message and button
  },
});

const TabViewExample = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [switchStates, setSwitchStates] = useState({
    drawingone: false,
    drawingtwo: false,
    drawingfan: false,
    bedroomone: false,
    bedroomtwo: false,
    bedroomfan: false,
    parking: false,
    pump: false,
    laser: false,
    out: false,
    maingate: false,
    gate: false,
    HumidityVal: 23,
    temperature: 13,
    type: "Gas",
    alert: true,
  });

  useEffect(() => {
    const switchesRef = ref(db);

    // Fetch the initial values from Firebase for all switches
    onValue(switchesRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      if (data !== null && data !== undefined) {
        setSwitchStates({
          drawingone: data.drawingone === "on",
          drawingtwo: data.drawingtwo === "on",
          drawingfan: data.drawingfan === "on",
          bedrooomone: data.bedroomone === "on",
          bedroomtwo: data.bedroomtwo === "on",
          bedroomfan: data.bedroomfan === "on",
          parking: data.parking === "on",
          pump: data.pump === "on",
          laser: data.laser === "on",
          out: data.out === "on",
          maingate: data.maingate === "on",
          gate: data.gate === "on",
          HumidityVal: parseFloat(data.Humidity),
          temperature: parseFloat(data.temp),
          soilMoisture: parseFloat(data.soilMoisture),
          type: String(data.type),
          // alert: data.Alert === true,
          // type: "Gas", // Set type as a string
          alert: data.Alert === true,
        });
        // setty=data.type;
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

    // // Send Expo Notification if the switch is turned on
    // if (!switchStates[key]) {
    //   // Notification(`Button Clicked!`, switchStates[key]);
    //   // console.log("Msgh sent!");
    // }
  };
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // Second, call the method
  function Notification(title, body) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: null,
    });
  }

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
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    useEffect(() => {
      setShowAlert(switchStates.alert);
      // Set the alert message based on the type]

      switch (switchStates.type) {
        case "laser":
          setAlertMessage(
            "Alert! Someone has crossed the laser and entered your house"
          );
          if (switchStates.alert) {
            Notification(
              "Alert! Thief",
              "Someone has crossed the laser and entered your house"
            );
          }
          break;
        case "Gas":
          setAlertMessage("Alert! Some type of smoke or gas is leaking");
          if (switchStates.alert) {
            Notification(
              "Alert! Smoke/Gas",
              "Some type of smoke or gas is leaking"
            );
          }
          break;
        case "rain":
          setAlertMessage("Alert! Rain is expected. Please take precautions");
          if (switchStates.alert) {
            Notification(
              "Alert! Rain",
              "Rain is expected. Please take precautions"
            );
          }
          break;
        default:
          setAlertMessage("Default Alert Message");
          break;
      }
    }, [switchStates.alert, switchStates.type]);

    return (
      <View style={styles.lightsContainer}>
        <LightSection label="Drawing Light 01" switchKey="drawingone" />
        <LightSection label="Drawing Light 02" switchKey="drawingtwo" />
        <LightSection label="Drawing Fan" switchKey="drawingfan" />
        <LightSection label="Bedroom Light 01" switchKey="bedroomone" />
        <LightSection label="Bedroom Light 02" switchKey="bedroomtwo" />
        <LightSection label="Bedroom Fan" switchKey="bedroomfan" />
        <LightSection label="Parking Light" switchKey="parking" />

        {showAlert && <Alert message={alertMessage} />}
        {/* <Alert></Alert> */}
        <View style={styles.bottomSection}>{/* Content below Lights */}</View>
      </View>
    );
  };

  const SecurityScreen = () => {
    return (
      <View style={styles.lightsContainer}>
        <LightSection label="Going out For Vacation" switchKey="out" />
        <LightSection
          label="Advanced Security (Laser Security)"
          switchKey="laser"
        />
        <LightSection label="Main Gate" switchKey="maingate" />
        <LightSection label="Secondry Gate" switchKey="gate" />
        <View style={styles.bottomSection}>
          {/* Content below Security Lights */}
        </View>
      </View>
    );
  };

  const GardenScreen = () => {
    return (
      <View style={styles.lightsContainer}>
        <View style={styles.dataContainerWithShadow}>
          <Text style={styles.bigText}>{`${switchStates.HumidityVal}%`}</Text>
          <Text style={styles.smallText}>Humidity</Text>
        </View>

        <View style={styles.dataContainerWithShadow}>
          <Text style={styles.bigText}>{`${switchStates.temperature}°C`}</Text>
          <Text style={styles.smallText}>Temperature</Text>
        </View>
        <View style={styles.dataContainerWithShadow}>
          <Text style={styles.bigText}>{`${switchStates.soilMoisture}%`}</Text>
          <Text style={styles.smallText}>SoilMoisture</Text>
        </View>
        <LightSection label="Garden Pump" switchKey="pump" />
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
    gaugeContainer: {
      alignItems: "center",
      marginBottom: 20,
    },
    gaugeLabelContainer: {
      marginTop: 10,
    },
    gaugeLabel: {
      color: "#ffffff",
      fontSize: 18,
    },
    dataContainerWithShadow: {
      backgroundColor: "#0d1344",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      padding: 20,
      marginVertical: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    bigText: {
      color: "#ffffff",
      fontSize: 32,
      marginBottom: 10,
    },
    smallText: {
      color: "#ffffff",
      fontSize: 18,
    },
    ssmallText: {
      color: "#ffffff",
      fontSize: 18,
      bottom: 434,
    },
    dataContainer: {
      backgroundColor: "#0d1344",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      padding: 20,
      marginVertical: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    bigText: {
      color: "#ffffff",
      fontSize: 24,
      marginBottom: 10,
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
