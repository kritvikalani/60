import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD1iJw9XZV-OvtFsNOHc0hofdeaoOZB0xU",
    authDomain: "school-attendance-b5439.firebaseapp.com",
    databaseURL: "https://school-attendance-b5439-default-rtdb.firebaseio.com",
    projectId: "school-attendance-b5439",
    storageBucket: "school-attendance-b5439.appspot.com",
    messagingSenderId: "865763961825",
    appId: "1:865763961825:web:80abc19a84f148e01040a0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.database();