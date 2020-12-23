import  React , {useEffect,useContext} from "react";
import { View } from "react-native";
import Game from "./Game";
import Match from '../db/matches';
import allowedMoves, { TIGER, GOAT } from "../constants";
import { Store } from "../store";
import firebase from "../setup/firebase";

interface IOnlineMultiPlayerProps {
  user: string;
  opponent: string;
  navigation:any,
  route:any
}
type GameState = {
  scale: any;
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
  const { state, dispatch } = useContext(Store);

  let {inviter,opponent} = props.route.params;
  let initialBoardState = Array(25).fill(null);
  initialBoardState[0] = TIGER;
  initialBoardState[4] = TIGER;
  initialBoardState[20] = TIGER;
  initialBoardState[24] = TIGER;
  
  let initailGameState = { 
    boardState:initialBoardState,
    tigerTurn:true,
    goatsAvailable:state.goats,
    tigersAvailable:4,
    goatsKilled:0
  };

  const [ gameState,setGameState] = React.useState(initailGameState);

  React.useEffect(()=>{
    console.log("OnlineMultiplayer Props",props);
    if(inviter?.requestFrom){
      let opponent = firebase.auth().currentUser;
      if(!opponent) return;
      let waitingUser = opponent?.uid;
      let requestingUserId = inviter?.uid;
      //create match in database
      Match.create(waitingUser,inviter.requestFrom,initailGameState);

      startMatchListener(waitingUser,requestingUserId);

    }
    if(opponent?.uid){
      let inviter = firebase.auth().currentUser;
      if(!inviter){
        return;
      }
      let waitingUser = opponent.uid;
      let requestingUserId = inviter.uid;
      startMatchListener(waitingUser,requestingUserId);
    }
    
  },[])

  const startMatchListener = (waitingUserId:string,requestingUserId:string)=>{
    let db= firebase.database();
    let matchesRef = db.ref(`users/${waitingUserId}/matches/`);
     matchesRef.on("child_changed",(childSnapshot,prevChildKey)=>{
      console.log("match listener",childSnapshot);
      let data = childSnapshot.val();
      let tempBoardState = Array(25).fill(null);
      let boardStateKeys = Object.keys(data.boardState);
      boardStateKeys.map(key=>{
        tempBoardState[parseInt(key)]=data.boardState[key];
      })
     
      console.log(data,gameState,tempBoardState); 
      setGameState({
          tigerTurn:data.tigerTurn,
          boardState:tempBoardState,
          goatsAvailable:data.goatsAvailable,
          tigersAvailable:data.tigersAvailable,
          goatsKilled:data.goatsKilled})
    })
    // matchesRef.on("child_added",(childSnapshot,prevChildKey)=>{
    //   console.log("match listener child added",childSnapshot);
     
    // })
  }

  const endMatchListener = (waitingUserId:string,requestingUserId:string)=>{
    let db= firebase.database();

    let matchesRef = db.ref(`users/${waitingUserId}/matches/${requestingUserId}`);
    matchesRef.off("child_changed",()=>{})
    matchesRef.off("child_added",()=>{})
  
  }
  
  const handleUpdate = (updatedState: GameState) => {
    console.log("updating",gameState);
    let combinedState = {...gameState,...updatedState}
    console.log("combined for updating",combinedState);
    let requestingUserId ;
    let curUser = firebase.auth().currentUser;
    let waitingUserId;
    if(opponent?.uid){
      requestingUserId = curUser?.uid;
      waitingUserId  = opponent?.uid;
    }
    else{
      requestingUserId = inviter?.requestFrom;
       waitingUserId = curUser?.uid;
    }
    Match.create(waitingUserId,requestingUserId,combinedState);
  };
  
 
  return (
    <View>
      <Game gameState={gameState} opponent = {opponent || inviter} handleUpdate={handleUpdate} />
    </View>
  );
};

export default OnlineMultiPlayer;
