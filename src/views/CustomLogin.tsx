import * as React from "react";
import { View, Text, Button } from "react-native";
import { Card, Input } from "react-native-elements";
import firebase from "../setup/firebase";

// Initialize Firebase
export interface IAppProps {
  navigation: any;
}

export default class Login extends React.Component<IAppProps> {
  constructor(props: any) {
    super(props);
  }
  fire = () => {
    this.props.navigation.navigate("PlayerList");

    let dbref = firebase.database().ref("/");
    dbref.set({
      members: { test: "hello" },
    });
  };
  public render() {
    return (
      <View>
        <Card title="Login">
          <Input label="username" textContentType={"name"} />
          <Input label="email" textContentType={"emailAddress"} />

          <Button
            title="Firebase Test"
            onPress={() => {
              this.fire();
            }}
          />
        </Card>
      </View>
    );
  }
}
