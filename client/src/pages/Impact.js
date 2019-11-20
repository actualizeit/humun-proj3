import React, { Component } from "react";
import { Header, Segment, Form, Button } from 'semantic-ui-react';
import ThemeSlider from "./../components/Slider";
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';

class Impact extends Component {
    constructor(props){
        super(props);
        
        this.state = {
        }
    }
    

    render(){
        return (
            <div>
                <ThemeHeader text='Your Impact' />
                <ThemeBody>
                    <Header as='h4' textAlign='center'>
                        Which is more important to you?
                  </Header>
                    <Form>
                        <Segment>
                            Is it more important to make a significant impact near you or greater a global impact?
                            <ThemeSlider />
                        </Segment>
                        <Segment>
                            Is it more important to have smaller effects in the near-term or larger uncertain effects in the long-term?
                            <ThemeSlider />
                        </Segment>
                        <Button type='submit' onClick={this.props.authHandler} primary fluid>Submit</Button>
                    </Form>
                </ThemeBody>
            </div>
        );
    }
};

export default Impact;