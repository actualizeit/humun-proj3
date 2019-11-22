import React, { Component } from "react";
import { Header, Segment, Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
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
                    <Form>
                        <Segment>
                            <Header as='h4'>Environmental</Header>
                            {/* <TempSlider id='pollution' label={'Pollution Prevention & Clean-up'} />
                            <TempSlider id='preservation' label={'Habitat Preservation & Biodiversity'}/>
                            <TempSlider id='climate' label='Climate Change Mitigation'/> */}
                        </Segment>
                        <Segment>
                            <Header as='h4'>Social</Header>
                            {/* <TempSlider id='needs' label='Basic Needs (Nutrition, Shelter, Safety, Water)'/>
                            <TempSlider id='education' label={'Education & Opportunity'}/>
                            <TempSlider id='health' label={'Global Health (Healthcare & Family Planning'}/> */}
                        </Segment>
                        <Button type='submit' onClick={this.handleCauses} primary fluid>Submit</Button>
                    </Form>
                </ThemeBody>
            </div>
        );
    }
};

export default Causes;