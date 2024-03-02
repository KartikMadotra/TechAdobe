import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as Location from "expo-location";

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
      console.log(data);
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
    const weatherIcons = {
      fog: "https://static.vecteezy.com/system/resources/previews/012/806/417/original/3d-cartoon-weather-fog-cloud-and-fog-sign-isolated-on-transparent-background-3d-render-illustration-png.png",
      haze: "https://static.vecteezy.com/system/resources/previews/012/806/417/original/3d-cartoon-weather-fog-cloud-and-fog-sign-isolated-on-transparent-background-3d-render-illustration-png.png",
      thunderstorm:
        "https://cdn3d.iconscout.com/3d/premium/thumb/thunderstorm-rain-with-sun-6263759-5122295.png",
      drizzle:
        "https://cdn3d.iconscout.com/3d/premium/thumb/rainy-day-7096841-5753017.png",
      rain: "https://img.freepik.com/premium-psd/3d-rain-with-sun-cloud-as-weather-icon_207199-301.jpg",
      snow: "https://static.vecteezy.com/system/resources/previews/024/683/829/original/3d-icon-cloudy-snow-weather-forecast-illustration-concept-icon-render-free-png.png",
      clear:
        "https://p.turbosquid.com/ts-thumb/km/h3TiNP/rc/15/jpg/1679470218/600x600/fit_q87/e8e30a5c08bf4ed2b8adffd237e1b02ae98eb716/15.jpg",
      clouds:
        "https://cdn3d.iconscout.com/3d/premium/thumb/weather-6546350-5376613.png",
      default:
        "https://p.turbosquid.com/ts-thumb/km/h3TiNP/rc/15/jpg/1679470218/600x600/fit_q87/e8e30a5c08bf4ed2b8adffd237e1b02ae98eb716/15.jpg", // Default icon if description doesn't match
    };

    const lowerCaseDescription = description.toLowerCase();
    return weatherIcons[lowerCaseDescription] || weatherIcons.default;
  };

  return (
    <View style={styles.container}>
      <View style={styles.jaiShriRamContainer}>
        <Text style={styles.jaiShriRam}>Jai Shri Ram</Text>
        <Image
          source={{
            uri: "https://i.postimg.cc/6qTYLN5g/pngtree-shri-ram-vector-design-image-for-cards-png-image-3942240-removebg-preview.png",
          }}
          style={styles.smallIcon}
        />
      </View>
      <Image source={{ uri: weatherData.icon }} style={styles.weatherIcon} />
      <View style={styles.textContainer}>
        <Text style={styles.temperature}>{weatherData.temperature}°C</Text>
        <Text style={styles.date}>{weatherData.date}</Text>
        <Text style={styles.description}>{weatherData.description}</Text>
        <Text style={styles.wind}>Wind: {weatherData.windSpeed}</Text>
        <Text style={styles.humidity}>Humidity: {weatherData.humidity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3E4095",
    borderRadius: 20,
    padding: -180,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  jaiShriRam: {
    fontSize: 28, // Increased font size
    fontWeight: "bold",
    color: "#FFA500", // Saffron color
    marginBottom: 10,
    textAlign: "center",
  },
  jaiShriRamContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallIcon: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    marginLeft: 5, // Adjust the margin as needed
  },
  weatherIcon: {
    width: 150, // Increased image size
    height: 150, // Increased image size
    borderRadius: 10,
    marginVertical: 20,
  },
  textContainer: {
    alignItems: "center",
  },
  date: {
    fontSize: 18, // Increased font size
    color: "#fff",
    marginBottom: 8,
  },
  description: {
    fontSize: 22, // Increased font size
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  temperature: {
    fontSize: 48, // Increased font size
    color: "#fff",
    fontWeight: "bold",
  },
  wind: {
    fontSize: 18, // Increased font size
    color: "#fff",
    marginBottom: 8,
  },
  humidity: {
    fontSize: 18, // Increased font size
    color: "#fff",
  },
});

export default WeatherHeader;
