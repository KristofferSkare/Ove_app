import React from 'react';
import './EventsPage.css';
import {withFirebase} from "../utils/fb";

class EventPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			event: undefined,
			location: undefined
		};

		const {match: {params}} = this.props;
		const {firebase} = this.props;
		let _this = this;

		firebase.db.collection('events').doc(params.id).onSnapshot(doc => {
			_this.setState({event: doc.data()});
			if (doc.data().location) {
				firebase.db.collection('locations').doc(doc.data().location).onSnapshot(doc => {
					_this.setState({location: doc.data()});
				});
			}
		});
	}

	render() {
		const {match: {params}} = this.props;
		let {event, location} = this.state;

		return (
			<div className={"container"}>
				<h2>{event && event.title}</h2>
				<div>{location && "Location: " + location.name}</div>
			</div>
		)
	}
}

export default withFirebase(EventPage);
