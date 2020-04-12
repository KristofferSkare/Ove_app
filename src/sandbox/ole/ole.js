import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {withFirebase} from "../../utils/fb";
import {withAuthentication} from "../../utils/session";
import {compose} from "recompose";


class ole extends Component {
  constructor(props) {
    super(props);

    this.state = { isSignedIn: false, inDb: false};



  }





  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => {


      }}



};





  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user);
  			    this.props.firebase.db.collection("users").where("email", "==", firebase.auth().currentUser.email).onSnapshot( (snap) => {
  			        if (!(snap.empty)){
  			            console.log("du er i databasen");
                  }else {
                    console.log("ikke i databasen");
                    console.log(this.props);
                    console.log(firebase.auth().currentUser.uid);

                    this.props.firebase.db.collection("users").doc(firebase.auth().currentUser.uid).set({
                      name: firebase.auth().currentUser.displayName,
                      email: firebase.auth().currentUser.email
                    });

                }
                });

    })
  }



  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
          <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    )
  }
}

const ole2 = compose(
  withFirebase,
  withAuthentication,
)(ole);

export default (withFirebase)(ole2);
