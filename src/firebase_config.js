  import firebase from 'firebase/app';
  import 'firebase/firestore'


  var firebaseConfig = {
    apiKey: "AIzaSyAhfBmFqXaSsj78-R6lWr11bRqQnzQat88",
    authDomain: "uploadr-eafc7.firebaseapp.com",
    databaseURL: "https://uploadr-eafc7.firebaseio.com",
    projectId: "uploadr-eafc7",
    storageBucket: "uploadr-eafc7.appspot.com",
    messagingSenderId: "1090532930086",
    appId: "1:1090532930086:web:cec6e44850d2de071cace7"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebaseConfig;
