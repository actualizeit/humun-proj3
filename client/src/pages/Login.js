import React, { Component } from "react";
import { Redirect } from 'react-router';
import { Button, Form, Input, Message } from 'semantic-ui-react';
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
            password: "",
            redirect: false,
            emailErr: null,
            pwErr: null,
            loginSuccess: false
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    login = () => {
        this.setState({ emailErr: null, pwErr: null })
        let { email, password } = this.state;
        API.login({
          email: email,
          password: password
        })
        .then(res => {
            if(res.data.success){
                cookies.set('jwt', res.data.token, { path: '/' });
                this.setState({loginSuccess: true});
                // need to add success alert before redirect
                let that = this;
                setTimeout(function(){ 
                    that.setState({ redirect: true });
                }, 3000);
            } else (
                // add error alert 
                res.data.errors.forEach(error => {
                    if(error.email) {
                        this.setState({ emailErr: { content: error.email, pointing: 'below' }})
                    }
                    if(error.password) {
                        this.setState({ pwErr: { content: error.password, pointing: 'below' }})
                    }
                })
            );
        });
    };

    getdata = event => {
        event.preventDefault();
        API.getdata()
        .then(res => {
            console.log(res)
        })
    }

    savedata = event => {
        event.preventDefault();
        API.savedata()
        .then(res => {
            console.log(res)
        })
    }

    render(){
        let loginSuccess;
        if (this.state.loginSuccess) {
            loginSuccess = <Message loginSuccess={true}
                                success
                                header='Login successful'
                                content="You will now be redirected"
                            />
        }
        if (this.state.redirect) {
            return <Redirect push to="/profile" />;
        }
        return (
            <div>
                <ThemeHeader text='Login' />
                <ThemeBody>
                    <Form success>
                        <Form.Field
                            id='form-input-control-email'
                            control={Input}
                            label='Email'
                            placeholder='name@example.com'
                            required
                            name='email'
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            error={this.state.emailErr}
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
                            error={this.state.pwErr}
                        />
                        {loginSuccess}
                        <Button type='submit' onClick={this.login} primary fluid>Submit</Button>
                    </Form>
                </ThemeBody>
            </div>
        );
    }
};

export default Login;