import firebase from "firebase";
const db = firebase.database();
type MatchType = any;
type MatchesType = Array<MatchType>;
export interface MatchInterface {
  get:(opponentId:string,requestingUserId:string)=> MatchType;
  create:(waitingUserId:string,requestingUserId:string,data:any)=>void;
  remove:(matchId:string)=>void,
  startMatchListener : (waitingUserId:string,requestingUserId:string)=>void,
  endMatchListener : (waitingUserId:string,requestingUserId:string)=>void
}

class Match implements MatchInterface {
  constructor() {

  }
  
  get = (waitingUserId:string,requestingUserId:string)=>{
    //waiting user means the user who clicks waiting in the app and whose data is saved in the database users collection
    let matchesRef= db.ref(`users/${waitingUserId}/matches/${requestingUserId}`);

  }

  startMatchListener = (waitingUserId:string,requestingUserId:string)=>{
    let matchesRef = db.ref(`users/${waitingUserId}/matches/${requestingUserId}`);
     matchesRef.on("child_changed",function(childSnapshot,prevChildKey){
      console.log("match listener",childSnapshot);
    })
    matchesRef.on("child_added",function(childSnapshot,prevChildKey){
      console.log("match listener added",childSnapshot);
    })
  }

  endMatchListener = (waitingUserId:string,requestingUserId:string)=>{
    let matchesRef = db.ref(`users/${waitingUserId}/matches/${requestingUserId}`);
    matchesRef.off("child_changed",()=>{})
    matchesRef.off("child_added",()=>{})

  }

  create = (waitingUserId:string,requestingUserId:string,data:any) => {
  
    let matchesRef = db.ref(`users/${waitingUserId}/matches/${requestingUserId}`);
    matchesRef.set(data);

  };

  
  
  remove = (userId:string)=>{
    return db.ref(`/users/${userId}`).remove();
  }

}

const matches: MatchInterface = new Match();
export default matches;
