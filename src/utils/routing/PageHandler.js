import React from 'react'
import {Switch, Route} from "react-router-dom";

import * as ROUTES from './routes';

import StartView from "../../pages/StartView";
import SandboxOle from "../../sandbox/ole/ole";
import SandboxThomas from "../../sandbox/thomas/thomas";
import SandboxKristoffer from "../../sandbox/kristoffer/kristoffer";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
import EventsPage from "../../pages/EventsPage"
import HomePage from "../../pages/HomePage";
import NoMatchPage from "../../pages/NoMatchPage";
import EventPage from "../../pages/EventPage";
import CreateEventPage from "../../pages/CreateEventPage";

class PageNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.pages = (
            <Switch>
                <Route exact path={ROUTES.LANDING} component={StartView}/>
                <Route path={ROUTES.EVENT} component={EventPage}/>
                <Route path={ROUTES.CREATE_EVENT} component={CreateEventPage}/>
                <Route path={ROUTES.EVENTS} component={EventsPage}/>
                <Route path={ROUTES.HOME} component={HomePage}/>
                <Route path={ROUTES.SIGN_IN} component={SignIn}/>
                <Route path={ROUTES.SIGN_UP} component={SignUp}/>
                <Route path={ROUTES.OLE} component={SandboxOle}/>
                <Route path={ROUTES.THOMAS} component={SandboxThomas}/>
                <Route path={ROUTES.KRISTOFFER} component={SandboxKristoffer}/>

                <Route path={ROUTES.NO_MATCH} component={NoMatchPage}/>
            </Switch>
        )
    }

    render() {
        return (
            <Switch>
                {this.pages}
            </Switch>
        );

    }
}

export default PageNavigator;
