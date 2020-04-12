import React from 'react';
import {withFirebase} from "../utils/fb";
import {withAuthentication, withAuthorization} from "../utils/session";
import {compose} from "recompose";

class ProfilePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            birthday: "",
            location: "",
            picture: "",
            events: [],
            locations: []
        };
        let userLocations= [];
        let userEvents= [];
        let {firebase} = this.props;
        let {authUser} = this.props;
        firebase.db.collection('users').doc(authUser.uid).onSnapshot((snap) => {
            this.state.name=snap.data().name;
            this.state.email= snap.data().email;
            //add more info here
        })
        firebase.db.collection('users').doc(authUser.uid).collection('events').onSnapshot( (snap) =>{
            snap.forEach( function(doc){
                firebase.db.collection('events').doc(doc.id).onSnapshot( (snapshot) =>{
                    let elem = {id: snapshot.id, data: snapshot.data()}
                    userEvents.push(elem);
                })
            })
        })
        firebase.db.collection('users').doc(authUser.uid).collection('locations').onSnapshot( (snap) =>{
            snap.forEach( function(doc){
                firebase.db.collection('locations').doc(doc.id).onSnapshot( (snapshot) =>{
                    let elem = {id: snapshot.id, data: snapshot.data()}
                    userLocations.push(elem);
                })
            })
        })
        this.state.events = userEvents;
        this.state.locations = userLocations;

    }



    render() {
        return(<div></div>)


    }

}

const condition = authUser => !!authUser;

export default compose(withFirebase, withAuthentication, withAuthorization(condition))(AddLocatonPage);

