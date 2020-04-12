import React from 'react';
import {Link} from "react-router-dom";

import * as ROUTES from '../utils/routing/routes';

class NoMatchPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className="text-center">
				<h2>Error 404</h2>
				<p>The requested page could not be found</p>
				<Link className="btn btn-primary" to={ROUTES.LANDING}>Click here to return to the site</Link>
			</div>
		);
	}
}

export default NoMatchPage;
