import React, { useContext, useState } from "react";
import { View } from "react-native";
import Game from "./Game";
import Match from '../db/matches';
import { TIGER, GOAT } from "../constants";
import { Store } from "../store";
import firebase from "../setup/firebase";

interface IOnlineMultiPlayerProps {
  user: string;
  opponent: string;
  navigation: any,
  route: any
}
interface GameState {
  role?: string,
  goatsAvailable: number;
  tigersAvailable: number;
  goatsKept: number;
  goatsKilled: number;
  boardState: Array<string | null>;
  selected: number | null;
  tigerTurn: boolean;
};

const OnlineMultiPlayer: React.FunctionComponent<IOnlineMultiPlayerProps> = (
  props
) => {
  const { state } = useContext(Store);

  let { inviter, opponent } = props.route.params;
  let initialBoardState = Array(25).fill(null);
  initialBoardState[0] = TIGER;
  initialBoardState[4] = TIGER;
  initialBoardState[20] = TIGER;
  initialBoardState[24] = TIGER;

  let initialGameState = {
    role: TIGER,
    boardState: initialBoardState,
    tigerTurn: true,
    goatsAvailable: state.goats,
    tigersAvailable: 4,
    goatsKilled: 0,
    goatsKept: 0,
    selected: null,
  };

  const [gameState, setGameState] = React.useState<GameState>(initialGameState);

  React.useEffect(() => {

    let waitingUser;
    let requestingUserId
    //if user is the one invited
    if (inviter?.requestFrom) {
      //use to open match listener on opponent
      console.log("i am opponent");


      let opponent = firebase.auth().currentUser;
      if (!opponent) return;
      waitingUser = opponent?.uid;
      requestingUserId = inviter?.uid;


      initialGameState.role = TIGER; //create default role for 

      //create match in database
      Match.create(waitingUser, inviter.requestFrom, initialGameState);
    }

    //if current user is inviter
    if (opponent?.uid) {
      console.log("i am inviter");
      initialGameState.role = GOAT;
      const inviter = firebase.auth().currentUser;
      if (!inviter) {
        return;
      }

      waitingUser = opponent.uid;
      requestingUserId = inviter.uid;
    }

    //start match listener in both case
    startMatchListener(waitingUser, requestingUserId);


  }, [])

  const startMatchListener = (waitingUserId: string, requestingUserId: string) => {
    let db = firebase.database();
    let matchesRef = db.ref(`users/${waitingUserId}/matches/`);
    matchesRef.on("child_changed", (childSnapshot, prevChildKey) => {
      console.log("match listener", childSnapshot);
      let data = childSnapshot.val();
      let tempBoardState = Array(25).fill(null);
      let boardStateKeys = Object.keys(data.boardState);
      boardStateKeys.forEach(key => {
        tempBoardState[parseInt(key)] = data.boardState[key];
      })

      console.log(data, gameState, tempBoardState);
      setGameState((prevState) => ({
        ...prevState,
        tigerTurn: data.tigerTurn,
        boardState: tempBoardState,
        goatsAvailable: data.goatsAvailable,
        tigersAvailable: data.tigersAvailable,
        goatsKilled: data.goatsKilled,
        selected: data.selected
      }))
    })

  }

  const endMatchListener = (waitingUserId: string, requestingUserId: string) => {
    let db = firebase.database();

    let matchesRef = db.ref(`users/${waitingUserId}/matches/${requestingUserId}`);
    matchesRef.off("child_changed", () => { })
    matchesRef.off("child_added", () => { })

  }

  const handleUpdate = (updatedState: GameState) => {
    console.log("updating", gameState);
    let combinedState = { ...gameState, ...updatedState }
    console.log("combined for updating", combinedState);
    let requestingUserId;
    let curUser = firebase.auth().currentUser;
    let waitingUserId;
    if (opponent?.uid) {
      requestingUserId = curUser?.uid;
      waitingUserId = opponent?.uid;
    }
    else {
      requestingUserId = inviter?.requestFrom;
      waitingUserId = curUser?.uid;
    }
    Match.create(waitingUserId, requestingUserId, combinedState);
  };


  return (
    <View>
      <Game gameState={gameState} opponent={opponent || inviter} handleUpdate={handleUpdate} />
    </View>
  );
};

export default OnlineMultiPlayer;
