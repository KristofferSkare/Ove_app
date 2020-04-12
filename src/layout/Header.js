import React from 'react';
import {NavLink, Link, withRouter} from 'react-router-dom';
import './Header.css';
import logoFace from "../res/Ec-play icons/EC_Logo-V1.png";
import logoText from "../res/EC_Logo_Tekst-1.png";
import * as ROUTES from '../utils/routing/routes';
import {withAuthentication} from "../utils/session";
import {compose} from "recompose";

class NavigationButton extends React.Component {

    render() {
        if (this.props.bare) {
            return (
                <Link to={this.props.to} className="navigation_button navigation_button_bare">
                    {this.props.children}
                </Link>
            );
        }

        return (
            <NavLink className="nav-link" activeClassName="navigation_button_selected" to={this.props.to}>
                <div className="text_navigation_margin">{this.props.children}</div>
            </NavLink>
        )
    }
}

class Header extends React.Component {

    onAccountButtonClicked = () => {
        const {authUser} = this.props;
        if(authUser)
            this.props.history.push(ROUTES.HOME);
        else
            this.props.history.push(ROUTES.OLE);
    };

    render() {
        const {authUser} = this.props;

        function logo() {
            return (
                <div id="nav-item navigation_logo">
                    <img id="header_logo_face" className="header_img" src={logoFace} alt="logo"/>
                    <img className="header_img" src={logoText} alt="logo_text"/>
                </div>
            );
        }

        let right_bar =
            <div className={"nav-item"}>
                <button
                    className="btn btn-lg btn-outline-secondary text-dark text-nowrap"
                    type="button"
                    onClick={_ => this.onAccountButtonClicked()}>

                    {authUser ? authUser.email : "Sign in"}
                </button>
            </div>;

        return (
            <nav className="navbar navbar-expand-lg nav-pills navbar-light bg-light justify-content-between">
                <div className="container-fluid">
                    <div className={"navbar-header"}>
                        <div className="navbar-brand">
                            <NavigationButton bare={true} to={"/"}>{logo()}</NavigationButton>
                        </div>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation_header" aria-controls="navigation_header" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={"collapse navbar-collapse"} id={"navigation_header"}>
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className={"nav-item"}>
                                <NavigationButton to={ROUTES.EVENTS}>Events</NavigationButton>
                            </li>
                            <li className={"nav-item"}>
                                <NavigationButton to={ROUTES.OLE}>Ole</NavigationButton>
                            </li>
                            <li className={"nav-item"}>
                                <NavigationButton to={ROUTES.THOMAS}>Thomas</NavigationButton>
                            </li>
                            <li className={"nav-item"}>
                                <NavigationButton to={ROUTES.KRISTOFFER}>Kristoffer</NavigationButton>
                            </li>
                        </ul>
                        <div className={"d-inline float-left my-2 my-lg-0"}>
                            {right_bar}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default compose(
    withRouter,
    withAuthentication)(Header);
