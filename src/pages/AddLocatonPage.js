import React from 'react';

import {withFirebase} from "../utils/fb";
import {withAuthentication, withAuthorization} from "../utils/session";
import {compose} from "recompose";

class AddLocatonPagePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            desc: "",
            cap: 0,
            instruments: "",
            price: 0,
            position: ""
        };

    }

    MakeLocation = e => {
        const {name, desc, cap, instruments, price, position} = this.state;
        let {firebase} = this.props;
        const {authUser} = this.props;
        let locationId = "";
        const test=false;

        firebase.db.collection("location").add({
            owner: authUser.uid,
            title: name,
            description: desc,
            capacity: cap,
            instruments: instruments,
            price: price,
            position: position
           }).then( (call) => {
               locationId=call.id;
        })
        firebase.db.collection("users").doc(authUser.uid).collection("locations").doc(locationId).set({status: "open"});

    }








    render() {

        return (
            <div className="container">
                <div className="mt-4 offset-md-3 col-md-6 d-flex">
                    <input type="text" placeholder={"Title"} className="input text-center flex-fill text-light fancy-input-box" spellCheck="false" />
                </div>
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default compose(withFirebase, withAuthentication, withAuthorization(condition))(AddLocatonPage);

