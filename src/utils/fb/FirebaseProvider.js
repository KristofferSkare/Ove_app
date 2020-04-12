import React from "react";
import FirebaseContext from "./withFirebase";
import FirebaseApp from "./app";

class Firebase extends React.Component {
    render() {
        return (
            <FirebaseContext.Provider value={new FirebaseApp()}>
                    {this.props.children}
            </FirebaseContext.Provider>
        );
    }
}

export default Firebase;
