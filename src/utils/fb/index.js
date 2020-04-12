import FirebaseApp from './app';
import FirebaseContext from './context'
import {withFirebase} from './withFirebase';
import FirebaseProvider from './FirebaseProvider'
import React from "react";
import {AuthenticationProvider} from "../session";

class Firebase extends React.Component {
    render() {
        return (
            <FirebaseProvider>
                <AuthenticationProvider>
                    {this.props.children}
                </AuthenticationProvider>
            </FirebaseProvider>
        );
    }
}

export default FirebaseApp;

export {withFirebase, FirebaseContext, Firebase};
