import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
const getSwitchesForCategory = (category) => {
  // Your logic to determine which switches belong to the category
  // For example, you can return an array of switch names
  return ["Switch1", "Switch2", "Switch3"];
};

const CategoryItem = ({ category, switchStates, toggleSwitch }) => {
  return (
    <Collapsible collapsed={false}>
      {/* Initially expanded */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <View style={styles.switchesContainer}>
          {getSwitchesForCategory(category).map((switchName) => (
            <Switch
              key={switchName}
              // ... other props
            />
          ))}
        </View>
      </View>
    </Collapsible>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    // Your styles for the category container
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  categoryTitle: {
    // Your styles for the category title
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  switchesContainer: {
    // Your styles for the switches container
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // Add more styles as needed
});

export default CategoryItem;
