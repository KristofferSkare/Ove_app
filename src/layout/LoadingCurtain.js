import React from 'react';
import {withFirebase} from "../utils/fb";

class LoadingCurtain extends React.Component {

    constructor(props) {
        super(props);
        const {firebase} = this.props;

        this.state = {
            initialized: false
        };

        let _this = this;
        this.authListener = firebase.auth.onAuthStateChanged(authUser => {
            setTimeout(() => { _this.setState({initialized: true}) }, 1000);
            _this.authListener();
        });
    }

    render() {
        if(this.state.initialized) {
            return "";
        }

        return (
            <div className={"loading_curtain"}>
            </div>
        )
    }

}

export default withFirebase(LoadingCurtain);
