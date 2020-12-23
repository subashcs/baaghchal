import firebase from "firebase";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyAAy5K_K1aBTm53s_SpVLMPZYpkLamWpQ8",
  authDomain: "subashcs-a641f.firebaseapp.com",
  databaseURL: "https://subashcs-a641f.firebaseio.com",
  projectId: "subashcs-a641f",
  storageBucket: "subashcs-a641f.appspot.com",
  messagingSenderId: "315179412456",
  appId: "1:315179412456:web:f5fb5a0c427516c5e4525d",
  measurementId: "G-22H722954T",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
