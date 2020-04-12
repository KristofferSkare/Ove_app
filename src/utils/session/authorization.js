import React from "react";
import * as ROUTES from '../routing/routes';
import AuthUserContext from "./context"
import {withFirebase} from "../fb";
import {withRouter} from "react-router-dom";
import {compose} from "recompose";

const withAuthorization = condition => Component => {
    class withAuthorization extends React.Component {
        componentDidMount() {
            const {firebase} = this.props;
            this.listener = firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                }
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return <AuthUserContext.Consumer>{authUser => condition(authUser) ? <Component {...this.props} /> : null }</AuthUserContext.Consumer>
        }
    }

    return compose(
        withRouter,
        withFirebase
    )(withAuthorization)
};

export default withAuthorization;
