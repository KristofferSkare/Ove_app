import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const form = document.querySelector("#usersignup")

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class FirebaseApp {
    constructor() {
        if (!firebase.apps.length)
            this.firebaseApp = firebase.initializeApp(config);
        else
            this.firebaseApp = firebase.app();

        this.auth = this.firebaseApp.auth();
        this.db = this.firebaseApp.firestore();
        this.initialized = false;
        let _this = this;
        this.authListener = this.auth.onAuthStateChanged(authUser => {
            _this.initialized = true;
            _this.authListener();
        });
    }

    events = () =>
        this.db.collection("events");

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    isInitialized = () => {
        return this.initialized;
    };
}


export default FirebaseApp;
