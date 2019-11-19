import React, { Component } from "react";
import { Grid, Header, Button, Form, Input } from 'semantic-ui-react';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';



class CreateAccount extends Component {
    constructor(props){
        super(props);
        
        this.state = {
        }
    }

    handleCreate = () => {
        console.log('clicked');
    }

    render(){
        return (
            <div>
                <ThemeHeader text='Create an Account' />
                <ThemeBody>
                    <Form>
                        <Form.Field
                            id='form-input-control-first-name'
                            control={Input}
                            label='First name'
                            placeholder='First name'
                            required
                        />
                        <Form.Field
                            id='form-input-control-last-name'
                            control={Input}
                            label='Last name'
                            placeholder='Last name'
                            required
                        />
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
                        <Button type='submit' onClick={this.handleCreate}>Submit</Button>
                    </Form>
                </ThemeBody>
            </div>
        );
    }
};

export default CreateAccount;