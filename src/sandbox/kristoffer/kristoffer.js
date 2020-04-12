
import React from 'react';
import Googlebutton from '../../components/Googlebutton.js';
import HomePage from '../../pages/HomePage.js';
import StartView from '../../pages/StartView';
import {compose} from "recompose";
import {withFirebase} from "../../utils/fb";
import {withAuthentication, withAuthorization} from "../../utils/session";
import AddToHomescreen from 'react-add-to-homescreen';



export class SandboxKristoffer extends React.Component {
    constructor(props) {
        super(props);


        }

    handleAddToHomescreenClick = () => {
        alert(`
    1. Open Share menu
    2. Tap on "Add to Home Screen" button`);
    };

    render() {
        return (
            <div><AddToHomescreen onAddToHomescreenClick={this.handleAddToHomescreenClick} /></div>
        );
    }
}

export default compose(withFirebase, withAuthentication) (SandboxKristoffer);



