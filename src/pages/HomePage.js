import React from "react";
import {withAuthentication, withAuthorization} from "../utils/session";
import {compose} from "recompose";
import {withFirebase} from "../utils/fb";
import {Link, withRouter} from "react-router-dom";
import * as ROUTES from '../utils/routing/routes';

class HomePage extends React.Component {


    constructor(props){
        super(props);

        this.state= {
            name: "",
            events: [],
            locations: [],
            email: ""
        }
        let {firebase}=this.props;



        let _this=this;
        const {authUser} = this.props;
        firebase.db.collection('users').doc(authUser.uid).get().then(doc => {
            _this.setState({name: doc.data().name, email: doc.data().email});

            firebase.db.collection('users').doc(authUser.uid).collection('locations').onSnapshot((snapshot) => {
                let newLocId = [];
                snapshot.forEach(function (doc) {
                    let newDoc = {id: doc.id, data: doc.data()};
                    newLocId.push(newDoc);
                })
                var i;
                let LocList=[];
                for (i=0; i<newLocId.length; i++){
                    firebase.db.collection('locations').doc(newLocId[i].id).get().then(doc => {
                        let newDoc= {id: doc.id, data: doc.data()};
                        LocList.push(newDoc);
                    })
                }

                this.setState({locations: LocList});
            })


        })
    }
    goTo(e, target){
        e.preventDefault();
        this.props.history.push(target);
    }

    signOut = (e) => {
        e.preventDefault();
        const {firebase, history} = this.props;

        history.push(ROUTES.LANDING);
        firebase.doSignOut();
    };








    render() {
        return (
            <div className={"container-fluid "}>
                <div className={"col .row-lg-offset-3 .row-md-offset-3 .row-sm-offset-0"}>
                <h1>Home page to {this.state.name}, {this.state.email}</h1>
                <p>The Home Page is accessible by every signed in user.</p>
                <div className={"eventContainer col-md-6"}>
                    <h3>Event name</h3>
                </div>
                <button type={"button"} className={"btn btn-primary md-2"} onClick={e => this.goTo(e, ROUTES.EVENTS)}>Find New Events</button>

                <button className={"btn btn-primary btn-lg offset-2"} onClick={this.signOut}>Sign out</button>
                </div>
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default compose(withRouter, withFirebase, withAuthentication, withAuthorization(condition))(HomePage);
