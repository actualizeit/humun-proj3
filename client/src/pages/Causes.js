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
                { this.renderRedirect() }
                <ThemeHeader text='Your Causes' />
                <ThemeBody>
                    <Header as='h4' textAlign='center'>
                        Which is more important to you?
                    </Header>
                    <Form>
                        <Segment>
                            <p>
                                Is it more important to make a significant Causes near you or greater a global Causes?
                            </p>
                            <ThemeSlider id='pollution' label={'Pollution Prevention & Clean-up'} />
                            <ThemeSlider id='preservation' label={'Habitat Preservation & Biodiversity'}/>
                            <ThemeSlider id='climate' label='Climate Change Mitigation'/>
                        </Segment>
                        <Segment>
                            <p>
                                Is it more important to have smaller effects in the near-term or larger uncertain effects in the long-term?
                            </p>
                            <ThemeSlider id='needs' label='Basic Needs (Nutrition, Shelter, Safety, Water)'/>
                            <ThemeSlider id='education' label={'Education & Opportunity'}/>
                            <ThemeSlider id='health' label={'Global Health (Healthcare & Family Planning'}/>
                        </Segment>
                        <Button type='submit' onClick={this.handleCauses} primary fluid>Submit</Button>
                    </Form>
                </ThemeBody>
            </div>
        );
    }
};

export default Causes;