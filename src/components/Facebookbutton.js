import React from 'react';
import FacebookLogin from 'react-facebook-login';


class Facebook extends React.Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: '',
        defult: true
    }

    responseFacebook = response =>{
        console.log(response);
        this.setState({name: response.name, email: response.email, picure: response.picture.data.url});
        console.log(this.state);
    }

    componentClicked = () => console.log("clicked");

    render() {


        let fbContent;

        if(this.state.isLoggedIn){
            fbContent=null;
        }
        else{
            fbContent= (<FacebookLogin
                //cssClass={"FacebookButtonStyle"}
                textButton={"SIGN IN WITH FACEBOOK"}
                appId="1098013447254107"

                autoLoad={false}
                fields={"name,email,picture"}
                onClick={this.componentClicked}
                callback={this.responseFacebook}/>);
        }

        return (
            <div>
            <script type="text/javascript"> /* this is dummy */ </script>
            <div>{fbContent}</div>
            </div>


        );
    }
}

export default Facebook;
