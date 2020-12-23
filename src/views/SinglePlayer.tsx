import * as React from "react";
import { View, Text } from "react-native";

export interface IAppProps {}

export default class SinglePlayer extends React.Component<IAppProps> {
  public render() {
    return (
      <View>
        <Text>SinglePlayer </Text>
      </View>
    );
  }
}
