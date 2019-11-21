import React, { Component } from "react";
import { Button, Form, Input } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';
import API from "../utils/Api";

class CreateAccount extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            redirect: false,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password2: "",
            email2: "",
            password3: ""
        }
    }

    handleCreate = () => {
        console.log('clicked');
        let { firstName, lastName, email, password, password2 } = this.state;
        API.register({ firstName, lastName, email, password, password2 })
        .then(res => {
            console.log(res)
            if (res.data.errors) {
                console.log(res.data.errors)
            } else if(res.data.success){
                console.log('success')
                this.setRedirect();
            } else {
              console.log(res.data)
            }
        })
        .catch(err => console.log(err));
        // if successfully created redirect to impacts page
        
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

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
                            name='firstName'
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                            // required
                        />
                        <Form.Field
                            id='form-input-control-last-name'
                            control={Input}
                            label='Last name'
                            placeholder='Last name'
                            name='lastName'
                            value={this.state.lastName}
                            onChange={this.handleInputChange}
                            // required
                        />
                        <Form.Field
                            id='form-input-control-email'
                            control={Input}
                            label='Email'
                            placeholder='name@example.com'
                            name='email'
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            // required
                        />
                         <Form.Field
                            id='form-input-control-pw'
                            control={Input}
                            label='Password'
                            placeholder='******'
                            name='password'
                            type='password'
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            // required
                        />
                        <Form.Field
                            id='form-input-control-pw2'
                            control={Input}
                            label='Confirm Password'
                            placeholder='******'
                            name='password2'
                            type='password'
                            value={this.state.password2}
                            onChange={this.handleInputChange}
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