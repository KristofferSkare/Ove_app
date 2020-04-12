import React from 'react';
import AuthUserContext from './context';
import {withFirebase} from "../fb";

class AuthenticationProviderBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null
        }
    }

    componentDidMount() {
        const {firebase} = this.props;

        this.listener = firebase.auth.onAuthStateChanged(
            authUser => {
                authUser
                    ? this.setState({authUser})
                    : this.setState({authUser: null});
            }
        );
    }

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return (
            <AuthUserContext.Provider value={this.state.authUser}>
                {this.props.children}
            </AuthUserContext.Provider>
        );
    }
}

export const AuthenticationProvider = withFirebase(AuthenticationProviderBase);

export const withAuthentication = Component => props => (
    <AuthUserContext.Consumer>
        {authUser => <Component {...props} authUser={authUser}/>}
    </AuthUserContext.Consumer>
);
