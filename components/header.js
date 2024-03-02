import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import * as Location from "expo-location";
// import { ViewPager } from "@react-native-community/viewpager";
// import PagerView from "react-native-pager-view";

const Header = () => {
  const [weather, setWeather] = useState({
    temp: "24",
    date: "25 Dec 2023",
    description: "thunderstorm",
  });

  const API_KEY = "29147ff772779bd2b4ce89e97d80c3aa";

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        if (location) {
          const weatherData = await getWeatherData(
            location.coords.latitude,
            location.coords.longitude
          );
          setWeather(weatherData);
        }
      } catch (error) {
        console.error("Error fetching location or weather:", error);
      }
    };

    if (Platform.OS === "android") {
      setErrorMsg(
        "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
      );
      return;
    }

    fetchData();
  }, []);

  const getWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
      );
      const json = await response.json();

      const { main, weather, dt } = json;
      const temp = Math.round(Number(main.temp)); // Round temperature to the nearest integer
      const description = weather[0].description;

      const date = new Date(dt * 1000);
      const formattedDate = date.toDateString();

      return {
        temp,
        description,
        date: formattedDate,
      };
    } catch (error) {
      throw new Error("Error fetching weather data:", error);
    }
  };

  let img = {
    uri: "https://static.vecteezy.com/system/resources/previews/012/177/446/original/weather-rain-weather-forecast-icon-meteorological-sign-3d-render-png.png",
  }; // Default image

  if (weather.description) {
    const lowerCaseDescription = weather.description.toLowerCase();

    if (lowerCaseDescription.includes("cloudy")) {
      img = {
        uri: "https://cdn3d.iconscout.com/3d/premium/thumb/cloudy-weather-3311758-2754892.png?f=webp",
      };
    } else if (
      lowerCaseDescription.includes("fog") ||
      lowerCaseDescription.includes("haze")
    ) {
      img = {
        uri: "https://cdn3d.iconscout.com/3d/premium/thumb/foggy-weather-3311756-2754890.png?f=webp",
      };
    } else if (lowerCaseDescription.includes("rain")) {
      img = {
        uri: "https://static.vecteezy.com/system/resources/previews/012/177/446/original/weather-rain-weather-forecast-icon-meteorological-sign-3d-render-png.png",
      };
    } else if (lowerCaseDescription.includes("thunderstorm")) {
      img = {
        uri: "https://static.vecteezy.com/system/resources/previews/008/854/784/original/thunderstorm-rain-icon-weather-forecast-meteorological-sign-3d-render-png.png",
      };
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Ram Ram, Bhai</Text>
      <Image source={img} style={styles.weatherIcon} />
      <Text style={styles.date}>{weather.date}</Text>
      <Text style={styles.description}>{weather.description}</Text>
      <Text style={styles.temp}>{weather.temp}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7308ea",
    borderRadius: 40,
    padding: 8,
    overflow: "hidden",
    ...Platform.select({
      web: {
        width: "100%",
        height: 210,
        position: "relative",
      },
      android: {
        width: "117%",
        height: 160,
        top: 38,
        right: 26,
      },
    }),
  },
  weatherIcon: {
    height: Platform.select({ web: 210, android: 120 }),
    width: Platform.select({ web: 210, android: 120 }),
    right: Platform.select({ web: -15, android: 2 }),
    // alignItems: "right",
  },
  greeting: {
    fontSize: 21,
    color: "#fff",
    right: -40,
  },
  date: {
    fontSize: Platform.select({ web: 19, android: 14 }),
    color: "#fff",
    left: Platform.select({ web: 230, android: 125 }),
    bottom: Platform.select({ web: 115, android: 85 }),
  },
  description: {
    fontSize: 19,
    color: "#fff",
    left: Platform.select({ web: 230, android: 125 }),
    bottom: Platform.select({ web: 105, android: 77 }),
  },
  temp: {
    fontSize: Platform.select({ web: 119, android: 73 }),
    color: "#fff",
    left: Platform.select({ web: 1220, android: 237 }),
    bottom: Platform.select({ web: 245, android: 170 }),
  },
});

export default Header;
