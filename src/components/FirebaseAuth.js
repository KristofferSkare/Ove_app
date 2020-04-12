
class FirebaseAuth {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);
  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);
  doSignOut = () => this.auth.signOut();
  ...
}
export default FirebaseAuth;
