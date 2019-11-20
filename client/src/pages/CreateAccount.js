import React, { Component } from "react";
import { Button, Form, Input } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';

class CreateAccount extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            redirect: false
        }
    }

    handleCreate = () => {
        console.log('clicked');

        // if successfully created redirect to impacts page
        this.setRedirect();
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/impact' />
        }
    }

    render(){
        return (
            <div>
                { this.renderRedirect() }
                <ThemeHeader text='Create an Account' />
                <ThemeBody>
                    <Form>
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='First name'
                            placeholder='First name'
                            // required
                        />
                        <Form.Field
                            id='form-input-control-last-name'
                            control={Input}
                            label='Last name'
                            placeholder='Last name'
                            // required
                        />
                        <Form.Field
                            id='form-input-control-email'
                            control={Input}
                            label='Email'
                            placeholder='name@example.com'
                            // required
                        />
                         <Form.Field
                            id='form-input-control-pw'
                            control={Input}
                            label='Password'
                            placeholder='******'
                            // required
                        />
                        <Button type='submit' onClick={this.handleCreate} primary fluid>Submit</Button>
                    </Form>
                </ThemeBody>
            </div>
        );
    }
};

export default CreateAccount;