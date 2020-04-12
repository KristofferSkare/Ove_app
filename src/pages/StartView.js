import React from 'react';
import './StartView.css';
import {withRouter} from 'react-router-dom'
import {compose} from "recompose";
import {SIGN_IN} from "../utils/routing/routes";
import * as ROUTES from '../utils/routing/routes';
import {withAuthentication} from "../utils/session";


export class StartView extends React.Component {
    constructor(props) {
        super(props);
        this.goTo = this.goTo.bind(this);
    }

    goTo(e, target) {
        e.preventDefault();
        this.props.history.push(target);
    }

    render() {
        const {authUser} = this.props;
        if(authUser!=null){
          this.props.history.push(ROUTES.HOME);
        }

        /*Hvis ikke logga in sendes til siden under*/
        return (







            <div className="wrapper">
                <div className="inner_wrappers">
                    <div className="title_box">
                        EVERYONE CAN PLAY
                    </div>
                    <div className="text_box">
                        The EC-Play app offers an easy, motivating and fun music teaching
                        <br/>
                        tool for playing a musical instrument, singing and dancing.
                    </div>
                    <div className="buttons_box">
                        <div className="sign_in_box">

                            <button type="button" className="btn btn-primary col-md-4 col-sm-4 col-xs-4" onClick={e => this.goTo(e, ROUTES.SIGN_IN)}>
                                Sign in
                            </button>
                        </div>
                        <div className="download_box">
                            <button type="button" className="btn btn-info col-md-4 col-sm-4 col-xs-4">
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(withRouter, withAuthentication)(StartView);
