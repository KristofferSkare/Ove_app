import React from 'react';
import GoogleLogin from 'react-google-login';



class Google extends React.Component {
    state = {
        isLoggedIn: false,
        userID: '',
        googleID: '',
        name: '',
        email: '',
        picture: '',
        default: true
    }





    responseGoogle = response =>{
        console.log(response);
        this.setState({name:response.profileObj.name,email:response.profileObj.email,picture:response.profileObj.imageUrl,googleID:response.profileObj.googleId});
        console.log(this.state);
    }

    render(){


        let GContent;

        if(this.state.isLoggedIn){
            GContent=null;
        }
        else{
            GContent= (<GoogleLogin
                clientId="261432021182-8akdp71j1vmv5eud0auqab224hupeu3q.apps.googleusercontent.com"
                buttonText={"SIGN IN WITH GOOGLE"}
                //theme={"dark"}
                //style={GoogleButtonStyle}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}


            />);
        }

        return (
            <div>
                <script type="text/javascript"> /* this is dummy */ </script>
                <div>{GContent}</div>
            </div>


        );
    }
}

export default Google;