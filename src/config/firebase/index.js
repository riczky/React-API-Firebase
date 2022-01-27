import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getAnalytics} from 'firebase/analytics';
import { getDatabase } from "firebase/database";



// import 'firebase/auth';

// import 'firebase/auth';
// import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB2bzrMN7JR6aQdgs1uDtZkDKbYSu9T43A",
    authDomain: "simple-notes-firebase-f4bd9.firebaseapp.com",
    projectId: "simple-notes-firebase-f4bd9",
    storageBucket: "simple-notes-firebase-f4bd9.appspot.com",
    messagingSenderId: "223325193019",
    appId: "1:223325193019:web:0345a963363dca1cdb2d1e",
    measurementId: "G-GLECFZ8QHN"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export  const database = getDatabase(app);
  

  export default firebase;