// Import necessary modules
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "./config";

// Define the Header component
const Header = () => {
  const [weather, setWeather] = useState({
    temperature: "24",
    date: "25 Dec 2023",
    description: "Mostly Cloudy",
  });

  useEffect(() => {
    // Reference the root of your Firebase database
    const databaseRef = ref(db);

    // Fetch the initial weather data from Firebase
    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();

      if (data !== null && data !== undefined && data) {
        setWeather({
          temperature: data.temperature || "24",
          date: data.date || "25 Dec 2023",
          description: data.description || "Cloudy",
        });
      }
    });
  }, []);

  // Determine the image source based on weather description
  let img = require("../assest/sun.png"); // Default image
  if (
    weather.description &&
    weather.description.toLowerCase().includes("cloudy")
  ) {
    img = require("../assest/cloud.png");
  }

  // Render the Header component
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Ram Ram, Bhai</Text>
      <Image source={img} style={styles.weather_icon} />
      <Text style={styles.date}>{weather.date}</Text>
      <Text style={styles.description}>{weather.description}</Text>
      <Text style={styles.temp}>{weather.temperature}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      web: {
        backgroundColor: "#7308ea",
        width: "100%",
        opacity: 1,
        borderRadius: 40,
        height: 210,
        padding: 8,
        overflow: "hidden",
        position: "relative",
      },
      android: {
        backgroundColor: "#7308ea",
        width: "117%",
        opacity: 1,
        borderRadius: 40,
        height: 160,
        top: 38,
        right: 26,
      },
    }),
  },
  weather_icon: {
    ...Platform.select({
      web: {
        height: 210,
        width: 210,
        right: -15,
        alignItems: "right",
      },
      android: {
        height: 120,
        width: 120,
        right: 2,
      },
    }),
  },
  greeting: {
    fontSize: 21,
    right: -40,
    color: "#fff",
  },
  date: {
    ...Platform.select({
      web: {
        fontSize: 19,
        left: 230,
        bottom: 115,
      },
      android: {
        fontSize: 14,
        left: 125,
        bottom: 85,
      },
    }),
    color: "#fff",
  },
  description: {
    fontSize: 19,
    ...Platform.select({
      web: {
        left: 230,
        bottom: 105,
      },
      android: {
        fontSize: 14,
        left: 125,
        bottom: 77,
      },
    }),
    color: "#fff",
  },
  temp: {
    ...Platform.select({
      web: {
        fontSize: 119,
        left: 1300,
        bottom: 205,
      },
      android: {
        fontSize: 73,
        left: 237,
        bottom: 170,
      },
    }),
    color: "#fff",
  },
});

export default Header;
