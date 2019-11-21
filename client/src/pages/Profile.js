import React, { Component } from "react";
import { Header } from 'semantic-ui-react';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';

class Profile extends Component {
    constructor(props){
        super(props);
        
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <ThemeHeader text='Congratulations!' />
                <ThemeBody>
                    <Header as='h4' textAlign='center'>
                        Profile                    
                    </Header>
          
                </ThemeBody>
            </div>
        );
    }
};

export default Profile;