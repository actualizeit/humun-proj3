import React, { Component } from "react";
import { Header, Segment, Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeSlider from "./../components/Slider";
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';

class Causes extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            redirect: false
        }
    }

    handleCauses = () => {
        console.log('clicked');

        // if successful redirect to review page
        this.setRedirect();
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/review' />
        }
    }


    render(){
        return (
            <div>
                <ThemeHeader text='Your Causes' />
                <ThemeBody>
                    <Header as='h4' textAlign='center'>
                        Which is more important to you?
                    </Header>
                    <Form>
                        <Segment>
                            Is it more important to make a significant Causes near you or greater a global Causes?
                            <Header as='h4'>
                                Pollution Prevention {'&'} Clean-up
                            </Header>
                            <ThemeSlider />

                            <Header as='h4'>
                                Habitat Preservation {'&'} Biodiversity
                            </Header>
                            <ThemeSlider />

                            <Header as='h4'>
                                Climate Change Mitigation
                            </Header>
                            <ThemeSlider />
                        </Segment>
                        <Segment>
                            Is it more important to have smaller effects in the near-term or larger uncertain effects in the long-term?
                            <ThemeSlider />

                        </Segment>
                        <Button type='submit' onClick={this.handleCauses} primary fluid>Submit</Button>
                    </Form>
                </ThemeBody>
            </div>
        );
    }
};

export default Causes;