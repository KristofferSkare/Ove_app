import React from 'react';
import './EventsPage.css';
import {withFirebase} from "../utils/fb";
import {Link} from "react-router-dom";

import * as ROUTES from '../utils/routing/routes';

class EventsPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			events: [],
			locations: []
		};

		let _this = this;

		let {firebase} = this.props;
		firebase.db.collection('events').onSnapshot((snapshot) => {
			let newEvents = [];
			snapshot.forEach(function (doc) {
				let index = newEvents.length;
				let newDoc = {id: doc.id, data: doc.data()};
				newEvents.push(newDoc);

				firebase.db.collection('locations').doc(newDoc.data.location).get().then(doc => {

					let newLocations = _this.state.locations;
					newLocations[index] = doc.data();
					_this.setState({locations: newLocations})
				})
			});
			_this.setState({events: newEvents});
		})
	}

	render() {
		let {events, locations} = this.state;

		let eventsList = events.map((v, i) => {
			return (
				<li key={v.id}
					className={"list-group-item d-flex justify-content-between align-items-center"}>
					{v.data.title}
					<span>
                        <span className="mr-3">{v.data.registered}/{locations[i] && locations[i].capacity}</span>
						<Link className="btn btn-outline-primary" to={ROUTES.EVENT_BASE + "/" + v.id}><i className="fa fa-chevron-right" aria-label={"Go to event"}></i></Link>
					</span>
				</li>
			)
		});

		return (
			<div className={"container"}>
				<div>Event count: {events.length}</div>
				<ul className={"list-group text-dark"}>{eventsList}</ul>
				<div><Link className="btn btn-primary" to={ROUTES.CREATE_EVENT}><i className="fa fa-plus" aria-hidden={"true"}></i> Add event</Link></div>
			</div>
		)
	}
}

export default withFirebase(EventsPage);
