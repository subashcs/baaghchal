import * as React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Avatar, Badge, Text, Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "../setup/firebase";
import User from "../db/user";
import PlayerWaiting from "../components/PlayerWaiting";
import InvitationPane from "../components/InvitationPane";
export interface IPlayerListProps {
  navigation: any;
}
export interface StateProps {
  showPlayers: boolean;
  isOutgoingRequestPending: boolean;
  isInvitationPending: boolean;
  selectedPlayer: { uid: string | null, displayName: string | null };
  inviter: { requestFrom: string | null, displayName: string | null };
  players: Array<UserType> | null
}

type UserType = { displayName: string, email: string, photoURL: string, uid: string } | firebase.User | null;
const db = firebase.database();
export default class PlayerList extends React.Component<
  IPlayerListProps,
  StateProps
> {

  constructor(props: IPlayerListProps) {
    super(props);
    this.state = {
      showPlayers: false,
      selectedPlayer: { uid: "", displayName: "" },
      isInvitationPending: false,
      isOutgoingRequestPending: false,
      players: [],
      inviter: { displayName: "", requestFrom: "" },
    };
  }

  componentDidMount() {
    const userRef = firebase.database().ref("/users");

    userRef.on("child_added", (snapshot) => {
      console.log("key:", snapshot.key, "value:", snapshot.val());
      let players = User.getAll();

      this.setState(() => ({
        players: players,
      }));
      // console.log("snapshot",snapshot,snapshot.val());
      // console.log("Name: " + newPost.name);
      // console.log("Email: " + newPost.email);
      // console.log("Avatar: " + newPost.avatar);
    });
    userRef.on("child_removed", (snapshot) => {
      console.log("key:", snapshot.key, "value:", snapshot.val());
      let players = User.getAll();

      this.setState(() => ({
        players: players,
      }));
    });


  }

  incomingInvitationListener = async (action: string) => {

    let homeUser = firebase.auth().currentUser;
    const openInvitationPane = (snapshot: firebase.database.DataSnapshot) => {
      console.log("requestingUserId", snapshot.key, snapshot.val());

      if (snapshot.key) {
        let key = snapshot.key;
        let value = snapshot.val();

        this.setState(() => ({
          isInvitationPending: true,
          inviter: { ...this.state.inviter, [key]: value },
        }))
      }
    }

    const closeInvitationPane = (snapshot: firebase.database.DataSnapshot) => {

      this.setState(() => ({
        isInvitationPending: false,
        inviter: { ...this.state.inviter, requestFrom: "", displayName: "" },

      }))
    }
    let requestsRef = firebase.database().ref(`users/${homeUser?.uid}/requests`);

    if (action === "OPEN") {
      requestsRef.on("child_added", openInvitationPane);
      requestsRef.on("child_removed", closeInvitationPane);

    }
    else {
      requestsRef.off("child_added", openInvitationPane);
      requestsRef.off("child_removed", closeInvitationPane);

    }

  }

  closePlayerWaitingPane = (snapshot: firebase.database.DataSnapshot) => {
    this.setState(() => ({
      isOutgoingRequestPending: false
    }))
  }

  startMatchListener = (waitingUserId: string, requestingUserId: string) => {

    let matchesRef = db.ref(`users/${waitingUserId}/matches/`);
    matchesRef.on("child_changed", (childSnapshot, prevChildKey) => {
      console.log("match listener", childSnapshot);
    })
    matchesRef.on("child_added", (childSnapshot, prevChildKey) => {
      console.log("match listener child added", childSnapshot);

      this.props.navigation.navigate("OnlineMultiPlayer", { opponent: this.state.selectedPlayer });

    })
  }

  endMatchListener = (waitingUserId: string, requestingUserId: string) => {
    let matchesRef = db.ref(`users/${waitingUserId}/matches/${requestingUserId}`);
    matchesRef.off("child_changed", () => { })
    matchesRef.off("child_added", () => { })

  }

  outgoingInvitationListener = (action: string, userId: string) => {
    let requestedOpponent = userId;
    // let currentUser = firebase.auth().currentUser;



    let requestsRef = firebase.database().ref(`users/${requestedOpponent}/requests/`);


    if (action === "OPEN") {
      requestsRef.on("child_removed", this.closePlayerWaitingPane);

    }
    else {
      requestsRef.off("child_removed", this.closePlayerWaitingPane);

    }

  }

  acceptInvitation = () => {
    this.setState({ isInvitationPending: false });
    let { requestFrom } = this.state.inviter;
    if (!requestFrom) {
      alert("Error!!!");
    }
    this.props.navigation.navigate("OnlineMultiPlayer", { inviter: this.state.inviter });
  }

  rejectInvitation = () => {
    this.setState({ isInvitationPending: false });
    User.rejectInvitation();
  }

  inviteOpponent = (user: UserType) => {
    if (!user) return;
    User.invite(user?.uid);
    this.outgoingInvitationListener("OPEN", user?.uid);
    this.setState(() => ({
      isOutgoingRequestPending: true,
      selectedPlayer: { uid: user?.uid, displayName: user?.displayName }
    }));
    let currentUserId = firebase.auth().currentUser?.uid;
    if (!currentUserId) {
      console.log("auth error");
      return;
    };

    this.startMatchListener(user.uid, currentUserId);
    return true;
  }

  cancelInvitation = () => {
    //cancel sent invitation
    let userId = this.state.selectedPlayer;
    if (!userId) return;

    this.setState(() => ({
      isOutgoingRequestPending: false,
    }));
    User.cancelInvitation(userId);

  }

  startMatch = async ({ homeUser, opponent }: { homeUser: firebase.User | null, opponent: UserType }) => {
    //matches db create match with id `homeUser:opponent` : BoardState
  }

  handleOpponentSelect = async (user: UserType) => {
    //Send play request
    this.inviteOpponent(user);

    // this.props.navigation.navigate("OnlineMultiPlayer");

  };

  showOpponents = () => {
    let players = User.getAll();

    this.setState(() => ({
      players: players,
      showPlayers: true,
    }));
  }

  doNotWaitForOpponent = () => {
    let currentUser = firebase.auth().currentUser;
    if (!currentUser) return;
    this.incomingInvitationListener("CLOSE");

    let { uid } = currentUser;
    User.remove(uid);
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => this.handleOpponentSelect(item)}
    >
      <Avatar
        rounded
        source={{
          uri: item.photoURL
        }}
      />
      <View style={styles.rightInfo}>
        <Text>{item.displayName}</Text>
      </View>
      <Badge containerStyle={{ marginLeft: 10 }} value={"available"} />
    </TouchableOpacity>
  );
  createUser = () => {
    let currentUser: UserType = firebase.auth().currentUser;
    if (!currentUser) return;
    let { displayName, email, photoURL, uid } = currentUser;
    let newUser = { displayName, email, photoURL, uid };
    User.create(newUser);
  }


  public render() {
    console.log(
      "got current user in list of player",
      firebase.auth().currentUser
    );

    const handleWait = () => {
      this.incomingInvitationListener("OPEN");

      this.createUser();
      this.setState(() => ({
        showPlayers: false
      }))
    };




    return (
      <ScrollView contentContainerStyle={styles.container}>

        <InvitationPane modalVisible={this.state.isInvitationPending}
          acceptInvitation={this.acceptInvitation}
          rejectInvitation={this.rejectInvitation}
          inviter={this.state.inviter} />
        { this.state.isOutgoingRequestPending ? <PlayerWaiting isPlayerWaiting={this.state.isOutgoingRequestPending} handleQuit={() => this.cancelInvitation()} /> :
          <View>

            <Button title={"Wait For Invitation"} onPress={handleWait} />
            <Button
              title={"Select Opponent"}
              onPress={() => {
                this.doNotWaitForOpponent();
                this.showOpponents()
              }}
              style={{ marginVertical: 1 }}
            />

            {this.state.showPlayers && (
              <FlatList
                data={this.state.players}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.uid}
              />
            )}
          </View>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  listItem: {
    borderColor: "#000",
    borderWidth: 1,
    marginVertical: 1,
    width: "100%",
    marginHorizontal: "auto",
    padding: 5,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 5,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "yellow",
  },
  rightInfo: {
    paddingLeft: 10,
  },
});
