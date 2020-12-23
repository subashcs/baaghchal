import React, { useState } from "react";
import { View } from "react-native";
import { Button, Icon, Text, Card } from "react-native-elements";

export interface EntryProps {
  navigation: any;
}

const Entry: React.FC = (props: any) => {
  let { navigation } = props;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      }}
    >
      <Card title={"Player Options"} >
        <Card>
          <Button
            type={"solid"}
            raised
            title="Offline Multiplayer"
            icon={
              <Icon
                name="heartbeat"
                size={15}
                style={{ margin: 5 }}
                color="blue"
                type={"font-awesome"}
              />
            }
            onPress={() => {
              navigation.navigate("OfflineMultiPlayer");
            }}
          />
        </Card>

        <Card>
          <Button
            type={"outline"}
            raised
            title="Online Multiplayer"
            icon={
              <Icon
                name="heartbeat"
                size={15}
                style={{ margin: 5 }}
                color="blue"
                type={"font-awesome"}
              />
            }
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
        </Card>
        <Card>
          <Button
            type={"outline"}
            title="Single Player"
            icon={
              <Icon
                name="book"
                size={15}
                style={{ margin: 5 }}
                color="blue"
                type={"font-awesome"}
              />
            }
            onPress={() => {
              navigation.navigate("SinglePlayer");
            }}
          />
        </Card>
        <Card>
          <Button
            type={"outline"}
            title="Settings"
            icon={
              <Icon
                name="home"
                size={15}
                style={{ margin: 5 }}
                color="blue"
                type={"font-awesome"}
              />
            }
            onPress={() => {
              navigation.navigate("Settings");
            }}
          />
        </Card>
      </Card>
    </View>
  );
};
export default Entry;
