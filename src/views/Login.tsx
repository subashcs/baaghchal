import * as React from "react";
import { View, Text, Button } from "react-native";
import { Card, Input } from "react-native-elements";
import firebase from "../setup/firebase";
import * as AppAuth from 'expo-app-auth';

// When configured correctly, URLSchemes should contain your REVERSED_CLIENT_ID
const { URLSchemes } = AppAuth;
console.log(URLSchemes);
import * as GoogleSignIn from 'expo-google-sign-in';
// Initialize Firebase

export interface IAppProps {
  navigation: any;
}

export default class Login extends React.Component<IAppProps> {
  provider;
  constructor(props: any) {
    super(props);
    this.state = { user: null };

    if (firebase) {
      this.provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().useDeviceLanguage();
      this.isLoggedIn();
    }
  }

  componentDidMount() {

    this.initAsync();
    this.isLoggedIn();
  }

  initAsync = async () => {
    try {
      await GoogleSignIn.initAsync({
        clientId:
          "client315179412456-6adm42mv84ui609idfan14ijvtm7b3mo.apps.googleusercontent.comId"
      });

    } catch ({ message }) {
      alert("GoogleSignIn.initAsync(): " + message);
    }
  };
  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user });
  };
  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
  };
  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };
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

    if (!firebase) return;

    firebase
      .auth()
      .signInWithPopup(this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result?.credential?.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("got user", user);
        this.props.navigation.navigate("PlayerList");

        // ...
      })
      .catch(function (error) {
        console.log("got error", error);

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
