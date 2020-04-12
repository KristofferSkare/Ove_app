import React from 'react';
import {withFirebase} from '../utils/fb';
import {withAuthentication} from "../utils/session";
import {compose} from "recompose";

class SignIn extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			loading: false
		}
	}

	onChange = event => {
		this.setState({[event.target.name]: event.target.value});
	};

	onSubmit = e => {
		e.preventDefault();
		if (this.state.loading)
			return;

		const {email, password} = this.state;
		const {firebase} = this.props;

		let _this = this;
		this.setState({loading: true});
		firebase.doSignInWithEmailAndPassword(email, password)
			.then(user => {
				console.log(user);
				_this.setState({loading: false})
			})
			.catch(err => {
				console.log(err);
				_this.setState({loading: false});
			})
	};

	render() {
		const {email, password} = this.state;
		const {authUser} = this.props;

		return (
			<div className="container">
				<div classname="hei">
					<form onSubmit={this.onSubmit}>
						<div className="form-row">
							<div classname="hei">
								<input name="email" autoComplete={"email"} className="form-control form-control-lg"
									   value={email} onChange={this.onChange} type="text" placeholder={"Email"}/>
							</div>
							<div className="form-group col-md-6">
								<input name="password" autoComplete={"password"}
									   className="form-control form-control-lg" value={password}
									   onChange={this.onChange} type="password" placeholder={"Password"}/>
							</div>
						</div>
						<div className={"form-row"}>
							<button type={"submit"}
									className={"btn btn-primary btn-lg col-md-2 offset-md-5 col-sm-4 offset-sm-8"}>
								{this.state.loading
									?
									<div className="spinner-border" style={{width: "1.5rem", height: "1.5rem"}}
										 role="status">
										<span className="sr-only">Loading...</span>
									</div>
									: "Sign in"}
							</button>
						</div>
					</form>
					{authUser ? "Logged in to " + authUser.uid + "!" : ""}
				</div>
			</div>
		);
	}
}

export default compose(withAuthentication, withFirebase)(SignIn);
