import firebase from "firebase";
const db = firebase.database();
type UserType = {displayName:string,email:string,photoURL:string,uid:string}  | firebase.User;
type UsersType = Array<UserType>;
export interface UserInterface {
  create: (data: any) => void;
  getAll:()=> UsersType;
  getUserByEmail:(email:String)=>void;
  remove:(uid:string)=>void,
  invite:(userId:string)=>void,
  cancelInvitation:(userId:string)=>void,
  rejectInvitation:()=>void
}

class User implements UserInterface {
  constructor() {
  }
  

  create = (data: UserType) => {
    if(!data.email){
      return ;
    }
    db.ref(`/users/${data.uid}`).set(data);
  };

  getAll = () =>{
    let users:UsersType  =[];
    db.ref("/users").once("value", function(snapshot) {
      console.log("got all" ,snapshot.val());
      let tempUsers = snapshot.val();
      if(tempUsers instanceof Object){
      let userIds = Object.keys(tempUsers);
      for(let i = 0 ; i<userIds.length;i++){
        let tempUser = tempUsers[userIds[i]];
        let tempUid = userIds[i];
        tempUser.uid  = tempUid;

        users.push(tempUser);
      }
      
    }
    },  (errorObject:firebase.FirebaseError)=> {
      console.log("The read failed: " + errorObject.code);
      return []
    });

    return users;
  }

  getUserByEmail = (email:String)=>{
    console.log(db.ref("/users"))
  }

  invite = async (userId:string )   => {
    if(!userId){
      return ;
    }
  let requestTo = userId;
  let requestFrom =firebase.auth().currentUser?.uid;
  let displayName = firebase.auth().currentUser?.displayName;

  const requestRef = firebase.database().ref(`/users/${requestTo}/requests`);
    let containsPendingRequest ;
  await requestRef.once("value", snapshot => {
    if (snapshot.exists()){
       console.log("exists!");
        containsPendingRequest = true;

      }
 });
  if(containsPendingRequest) return;

  let data  = {requestFrom,displayName}
  await requestRef.set(data)
  
}

cancelInvitation = (requestToUserId:string)=>{
  
  // let requestFrom =firebase.auth().currentUser?.uid;
  const requestRef = firebase.database().ref(`/users/${requestToUserId}/requests`);
   requestRef.remove();
}
rejectInvitation = ()=>{
    let currentUser =firebase.auth().currentUser?.uid;
   const requestRef = firebase.database().ref(`/users/${currentUser}/requests`);
   requestRef.remove();
   console.log("rejecting....");
}

  remove = (userId:string)=>{
    return db.ref(`/users/${userId}`).remove();
  }

}

const user: UserInterface = new User();
export default user;
