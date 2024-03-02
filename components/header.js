import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import * as Location from "expo-location";
import {
  SafeAreaProvider,
  initialWindowMetrics,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
const WeatherHeader = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: "24",
    date: "25 Dec 2023",
    description: "Thunderstorm",
    windSpeed: "5 m/s",
    humidity: "75%",
    icon: "https://cdn3d.iconscout.com/3d/premium/thumb/thunderstorm-rain-with-sun-6263759-5122295.png", // Default icon
  });

  useEffect(() => {
    fetchWeatherData();
  }, []);
  const fetchWeatherData = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const API_KEY = "e10fc976aa128e69f22bc2b935eec3dc";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      const { main, weather, wind, dt } = data;
      const temperature = Math.round(Number(main.temp));
      const humidity = main.humidity;

      const description = weather[0].description;
      const date = new Date(dt * 1000).toDateString();
      const icon = getWeatherIcon(description);
      const windSpeed = wind.speed + " m/s";

      setWeatherData({
        temperature,
        date,
        description,
        windSpeed,
        humidity,
        icon,
      });
    } catch (error) {
      console.error("Error fetching location or weather:", error);
    }
  };

  const getWeatherIcon = (description) => {
    const lowerCaseDescription = description.toLowerCase();

    if (lowerCaseDescription.includes("rain")) {
      return "https://static.vecteezy.com/system/resources/previews/022/030/103/original/3d-weather-icon-of-rain-white-cloud-with-blue-rain-drops-on-it-rain-cloud-with-water-drops-png.png";
    } else if (
      lowerCaseDescription.includes("haze") ||
      lowerCaseDescription.includes("fog")
    ) {
      return "https://static.vecteezy.com/system/resources/previews/012/806/417/original/3d-cartoon-weather-fog-cloud-and-fog-sign-isolated-on-transparent-background-3d-render-illustration-png.png";
    } else if (lowerCaseDescription.includes("clouds")) {
      return "https://cdn3d.iconscout.com/3d/premium/thumb/cloudy-weather-8323002-6634087.png?f=webp";
    } else {
      const weatherIcons = {
        fog: "https://static.vecteezy.com/system/resources/previews/012/806/417/original/3d-cartoon-weather-fog-cloud-and-fog-sign-isolated-on-transparent-background-3d-render-illustration-png.png",
        haze: "https://static.vecteezy.com/system/resources/previews/012/806/417/original/3d-cartoon-weather-fog-cloud-and-fog-sign-isolated-on-transparent-background-3d-render-illustration-png.png",
        thunderstorm:
          "https://cdn3d.iconscout.com/3d/premium/thumb/thunderstorm-rain-with-sun-6263759-5122295.png",
        drizzle:
          "https://cdn3d.iconscout.com/3d/premium/thumb/rainy-day-7096841-5753017.png",
        rain: "https://static.vecteezy.com/system/resources/previews/022/030/103/original/3d-weather-icon-of-rain-white-cloud-with-blue-rain-drops-on-it-rain-cloud-with-water-drops-png.png",
        snow: "https://static.vecteezy.com/system/resources/previews/024/683/829/original/3d-icon-cloudy-snow-weather-forecast-illustration-concept-icon-render-free-png.png",
        clear:
          "https://p.turbosquid.com/ts-thumb/km/h3TiNP/rc/15/jpg/1679470218/600x600/fit_q87/e8e30a5c08bf4ed2b8adffd237e1b02ae98eb716/15.jpg",
        cloudy:
          "https://cdn3d.iconscout.com/3d/premium/thumb/weather-6546350-5376613.png",
        clouds:
          "https://cdn3d.iconscout.com/3d/premium/thumb/weather-6546350-5376613.png",
        default:
          "https://p.turbosquid.com/ts-thumb/km/h3TiNP/rc/15/jpg/1679470218/600x600/fit_q87/e8e30a5c08bf4ed2b8adffd237e1b02ae98eb716/15.jpg", // Default icon if description doesn't match
      };

      return weatherIcons[lowerCaseDescription] || weatherIcons.default;
    }
  };

  const insets = useSafeAreaInsets();
  const scaledFontSize = (baseSize) => {
    const scaleFactor = 1600; // Width of iPhone 6/7/8
    const width = Dimensions.get("window").width;
    const scale = width / width;
    const scaledSize = baseSize * scale;
    return scaledSize;
  };

  const scaledImageSize = (baseSize) => {
    const scaleFactor = 1600; // Width of iPhone 6/7/8
    const width = Dimensions.get("window").width;
    const scale = width / scaleFactor;
    const scaledSize = baseSize * scale;
    return scaledSize;
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.jaiShriRamContainer}>
          <Text style={[styles.jaiShriRam, { fontSize: scaledFontSize(28) }]}>
            Jai Shri Ram
          </Text>
          <Image
            source={{
              uri: "https://i.postimg.cc/6qTYLN5g/pngtree-shri-ram-vector-design-image-for-cards-png-image-3942240-removebg-preview.png",
            }}
            style={[
              styles.smallIcon,
              { width: scaledImageSize(50), height: scaledImageSize(50) },
            ]}
          />
        </View>
        <Image source={{ uri: weatherData.icon }} style={styles.weatherIcon} />
        <View style={styles.textContainer}>
          <Text style={[styles.temperature, { fontSize: scaledFontSize(48) }]}>
            {weatherData.temperature}°C
          </Text>
          <Text style={[styles.date, { fontSize: scaledFontSize(18) }]}>
            {weatherData.date}
          </Text>
          <Text style={[styles.description, { fontSize: scaledFontSize(22) }]}>
            {weatherData.description}
          </Text>
          <Text style={[styles.wind, { fontSize: scaledFontSize(18) }]}>
            Wind: {weatherData.windSpeed}
          </Text>
          <Text style={[styles.humidity, { fontSize: scaledFontSize(18) }]}>
            Humidity: {weatherData.humidity}
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3E4095",
    borderRadius: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  jaiShriRam: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFA500",
    marginBottom: 10,
    textAlign: "center",
  },
  jaiShriRamContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallIcon: {
    width: 50,
    height: 50,
    marginLeft: 5,
  },
  weatherIcon: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginVertical: 20,
  },
  textContainer: {
    alignItems: "center",
  },
  date: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
  },
  description: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  temperature: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "bold",
  },
  wind: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
  },
  humidity: {
    fontSize: 18,
    color: "#fff",
  },
});

export default WeatherHeader;
