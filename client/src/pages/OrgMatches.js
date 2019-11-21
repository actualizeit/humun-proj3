import React, { Component } from "react";
import { Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';

class OrgMatches extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            redirect: false,
            redirectLoc: ''
        }
    }

    handleOrgMatches = (redirect) => { 

        // if OrgMatches is approved redirect to matches page
        this.setRedirect(redirect);
    }

    setRedirect = (redirect) => {
        this.setState({
          redirect: true,
          redirectLoc: redirect
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectLoc} />
        }
    }

    render(){
        return (
            <div>
                { this.renderRedirect() }
                <ThemeHeader text='Congratulations!' />
                <ThemeBody>
                    <Header as='h4' textAlign='center'>
                        We’ve matched you to these organizations:
                    </Header>
          
                    <Button onClick={() => this.handleOrgMatches('/profile')} primary fluid>To Profile</Button>
                </ThemeBody>
            </div>
        );
    }
};

export default OrgMatches;