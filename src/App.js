import React from 'react';
import 'App.css';
import {BrowserRouter as Router} from "react-router-dom";

import Header from "./layout/Header.js"
import PageHandler from "./utils/routing/PageHandler";
import {Firebase} from './utils/fb'
import LoadingCurtain from "./layout/LoadingCurtain";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Firebase>
                    <div className="app">
                        <div className={"scroll_pane"}>
                            <Header/>
                            <PageHandler/>
                        </div>
                        <LoadingCurtain/>
                    </div>
                </Firebase>
            </Router>
        );
    }
}

export default App;
