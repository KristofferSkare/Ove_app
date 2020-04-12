import React from 'react';
import './CreateEventPage.css';
import {withFirebase} from "../utils/fb";
import {withAuthentication, withAuthorization} from "../utils/session";
import {compose} from "recompose";

class EventPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "Cool event",
            desc: "hei",
            year: "2020",
            month: "02",
            day: "02",
            time: "19.00",
            locId: "XGhmDW3URBEZ3iqDb02i",
            teachId: "1j7HNZqPHVUP7qyoGXLn8CWDyDx1"
        };

    }
    MakeEvent = e => {
        const {name, desc, year, month, day, time, locId, teachId} = this.state;
        let {firebase} = this.props;
        const {authUser} = this.props;
        const date = day +"." +month + "." + year;
        const test=false;
        if(test) {
            firebase.db.collection("events").add({
                host: authUser.uid,
                title: name,
                location: locId,
                registered: 0,
                description: desc,
                date: date,
                time: time,
                teacherId: teachId
            })
        }

        let _this=this;
        let eventId= "";
        let userEvents=[];
        let inUserEvents= true;
        firebase.db.collection("users").doc(authUser.uid).collection("events").onSnapshot( (snapshot) =>{
            snapshot.forEach( function(input) {
                    userEvents.push(input.id);
                }
            )
        });




        firebase.db.collection("events").onSnapshot( (snapshot) =>{
            snapshot.forEach( function(doc){
                if (doc.data().host==authUser.uid) {
                    inUserEvents= false;
                    if (userEvents.length!==0){
                        for (let i=0; i<userEvents.length; i++){
                            if(doc.id==userEvents[i]){// mulig å legge inn flere skjekker så blir det sikrere
                                inUserEvents=true;
                            }
                        }
                    }
                    if(!inUserEvents){
                        eventId=doc.id;
                        firebase.db.collection("users").doc(authUser.uid).collection("events").doc(doc.id).set({role: "host"});
                    }
                }
            })
        })
        console.log(eventId);
        if(!inUserEvents) {
            //firebase.db.collection("users").doc(teachId).collection("events").doc(eventId).set({role: "teacher"});
            //firebase.db.collection("locations").doc(locId).collection("events").doc(eventId).set({status: "taken"});
        }
    }


    render() {
        this.MakeEvent();
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
export default compose(withFirebase, withAuthentication, withAuthorization(condition))(EventPage);
