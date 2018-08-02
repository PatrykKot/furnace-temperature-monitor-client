import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()
firestore.settings({
    timestampsInSnapshots: true
});

export default firestore