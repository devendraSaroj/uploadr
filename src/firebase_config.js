  import firebase from 'firebase/app';
  import 'firebase/firestore'




  var firebaseConfig = {
    apiKey: "AIzaSyCNC8ZPDnTikKHsGyRGTyWRzkVCM11WrXY",
    authDomain: "uploadr-aad62.firebaseapp.com",
    databaseURL: "https://uploadr-aad62.firebaseio.com",
    projectId: "uploadr-aad62",
    storageBucket: "uploadr-aad62.appspot.com",
    messagingSenderId: "827240999669",
    appId: "1:827240999669:web:bd4c63ce88a0d2aeeaf3bc"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebaseConfig;
