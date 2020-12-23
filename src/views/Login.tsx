import * as React from "react";
import { View, Text, Button } from "react-native";
import { Card, Input } from "react-native-elements";
import firebase from "../setup/firebase";
// Initialize Firebase

export interface IAppProps {
  navigation: any;
}

export default class Login extends React.Component<IAppProps> {
  provider;
  constructor(props: any) {
    super(props);

    if (firebase) {
      this.provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().useDeviceLanguage();
      this.isLoggedIn();
    }
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn = () => {
    let user = firebase.auth().currentUser;

    if (user) {
      console.log("logged in", user);
      this.props.navigation.navigate("PlayerList");
    } else {
      console.log("not logged in", user);
    }
  };

  fire = () => {
    // this.props.navigation.navigate("PlayerList");

    // let dbref = firebase.database().ref("/");
    // dbref.set({
    //   members: { test: "hello" },
    // });
    console.log("firing");
    if (!firebase) return;
    firebase
      .auth()
      .signInWithPopup(this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result?.credential?.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("got user", user);
        this.props.navigation.navigate("PlayerList");

        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  public render() {
    this.isLoggedIn();
    return (
      <View>
        <Card title="Login">
          <Button
            title="Login With Google"
            onPress={() => {
              this.fire();
            }}
          />
        </Card>
      </View>
    );
  }
}
