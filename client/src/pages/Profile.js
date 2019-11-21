import React, { Component } from "react";
import { Header, Segment } from 'semantic-ui-react';
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
                <ThemeHeader text='' />
                <ThemeBody>
                    <div>
                        <Segment vertical>
                            <Header as='h3' textAlign='center'>
                                Jane Doe
                            </Header>
                        </Segment>
                        <Segment vertical>Member Since -Date-</Segment>
                    </div>

                    <Header as='h5' attached='top'>Impacts</Header>
                    <Segment attached='bottom'>
                        <p>Impacts Here</p>
                    </Segment>

                    <Header as='h5' attached='top'>Allocations</Header>
                    <Segment attached='bottom'>
                        <p>Allocations Here</p>
                    </Segment>

                    <Header as='h5' attached='top'>Donation History</Header>
                    <Segment attached='bottom'>
                        <p>Donations Here</p>
                    </Segment>
                   

                </ThemeBody>
            </div>
        );
    }
};

export default Profile;