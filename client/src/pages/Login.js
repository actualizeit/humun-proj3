import React, { Component } from "react";
import { Button, Form, Input } from 'semantic-ui-react';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';

class Login extends Component {
    constructor(props){
        super(props);
        
        this.state = {
        }
    }

    render(){
        return (
            <div>
                <ThemeHeader text='Login' />
                <ThemeBody>
                    <Form>
                        <Form.Field
                            id='form-input-control-email'
                            control={Input}
                            label='Email'
                            placeholder='name@example.com'
                            required
                        />
                         <Form.Field
                            id='form-input-control-pw'
                            control={Input}
                            label='Password'
                            placeholder='******'
                            required
                        />
                        <Button type='submit' onClick={this.props.authHandler} primary fluid>Submit</Button>
                    </Form>
                </ThemeBody>
            </div>
        );
    }
};

export default Login;