import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBlKMeqUZBR_en-Kv7JyWlx19doH4Iwne8",
  authDomain: "disney-clon-f8e9c.firebaseapp.com",
  projectId: "disney-clon-f8e9c",
  storageBucket: "disney-clon-f8e9c.appspot.com",
  messagingSenderId: "13191843148",
  appId: "1:13191843148:web:f45a4ad01b32f94d17d3e9",
  measurementId: "G-BH409TLSV6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;