import React, { Component } from "react";
import { Button, Form, Input } from 'semantic-ui-react';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';
import API from "../utils/Api";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Login extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            email: "",
            password: ""
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    login = event => {
        event.preventDefault();
        console.log('test')
        let { email, password } = this.state;
        API.login({
          email: email,
          password: password
        })
        .then(res => {
            if(res.data.success){
                cookies.set('jwt', res.data.token, { path: '/' });
                this.props.authHandler();
            } else (
                console.log(res.data.msg)
            )
        })
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
                            name='email'
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                         <Form.Field
                            id='form-input-control-pw'
                            control={Input}
                            label='Password'
                            placeholder='******'
                            required
                            name='password'
                            type='password'
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                        <Button type='submit' onClick={this.login} primary fluid>Submit</Button>
                    </Form>
                </ThemeBody>
            </div>
        );
    }
};

export default Login;