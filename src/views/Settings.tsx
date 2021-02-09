import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Store, Types } from "../store";
import {Picker } from '@react-native-community/picker';
export interface ISettingsProps {}

const Settings: React.FC = (props) => {
  const [goats, setGoats] = useState(21);
  const { state, dispatch } = useContext(Store);
  console.log("got state", state);
  const handleChange = (itemValue: number) => {
    setGoats(itemValue);
    dispatch({ type: Types.UPDATE_GOATS, payload: itemValue });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}> Select Number of Goats</Text>
        <Picker
          selectedValue={goats}
          style={styles.pickerStyle}
          itemStyle={styles.itemStyle}
          onValueChange={(itemValue, itemIndex) => handleChange(itemValue)}
        >
          <Picker.Item label="Twenty (20)" value={20} />
          <Picker.Item label="Twenty One (21)" value={21} />
          <Picker.Item label="Twenty Two (22)" value={22} />
        </Picker>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#a3a7e454",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  label: {
    color: "#3f51b5",
    fontWeight: "800",
    lineHeight: 40,
  },
  pickerStyle: {
    height: 50,
    borderRadius: 5,
    padding: 15,
  },
  itemStyle: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
export default Settings;
