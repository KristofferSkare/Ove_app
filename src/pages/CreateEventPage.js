
import React from 'react';
import './CreateEventPage.css';
import {withFirebase} from "../utils/fb";
import {withAuthentication, withAuthorization} from "../utils/session";
import {compose} from "recompose";

class EventPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: "",
			desc: "",
			date: "",
			time: "",
			locId: "",
			teachId: ""
		};

	}

	MakeEvent = e => {
		const {name, desc, date, time, locId, teachId} = this.state;
		let {firebase} = this.props;
		const {authUser} = this.props;
		let eventId= "";
		firebase.db.collection("events").add({
			host: authUser.uid,
			title: name,
			location: locId,
			registered: 0,
			description: desc,
			date: date,
			time: time,
			teacherId: teachId
		}).then( (doc) => {
			eventId = doc.id;
		} )
		firebase.db.collection("users").doc(authUser.uid).collection("events").doc(eventId).set({role: "host"});
		firebase.db.collection("users").doc(teachId).collection("events").doc(eventId).set({role: "teacher"});



	}
	render() {
		const {
			title,
			locId,
			desc,
			date,
			time,
			teacherId
		} = this.state;

		const isInvalid =
			desc === '' ||
			title === '' ||
			date === '' ||
			time === '';

		return (
			<form id="usersignup" onSubmit={this.onSubmit}>
				<input
					name="title"
					value={title}
					onChange={this.onChange}
					type="text"
					placeholder="Title"

				/>
				<input
					name="description"
					value={desc}
					onChange={this.onChange}
					type="text"
					placeholder="Description"
				/>
				<input
					name="date"
					value={date}
					onChange={this.onChange}
					type="date"
					placeholder="Date"
				/>
				<input
					name="time"
					value={time}
					onChange={this.onChange}
					type="time"
					placeholder="Time"
				/>
				<button type="submit">Make Event</button>
			</form>
		);
	}

}

const condition = authUser => !!authUser;
export default compose(withFirebase, withAuthentication, withAuthorization(condition))(EventPage);

