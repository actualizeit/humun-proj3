import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Form, Input, Message, Header } from 'semantic-ui-react';
import SplashTemplate from './../components/SplashTemplate';
import API from '../utils/Api';
import Cookies from 'universal-cookie';
import bg from './../assets/images/bg-crowd.jpg';

const cookies = new Cookies();

class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      profileRedirect: false,
      impactRedirect: false,
      emailErr: null,
      pwErr: null,
      loginSuccess: false
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  login = () => {
    this.setState({ emailErr: null, pwErr: null });
    const { email, password } = this.state;
    API.login({
      email: email,
      password: password
    })
      .then(res => {
        if (res.data.success) {
          cookies.set('jwt', res.data.token, { path: '/' });
          this.setState({ loginSuccess: true });
          // need to add success alert before redirect
          const that = this;
          console.log(res.data);
          setTimeout(function () {
            if (res.data.user.initialSetup) {
              that.setState({ profileRedirect: true });
            } else {
              that.setState({ impactRedirect: true });
            }
          }, 3000);
        } else {
          // add error alert
          res.data.errors.forEach(error => {
            if (error.email) {
              this.setState({ emailErr: { content: error.email, pointing: 'below' } });
            }
            if (error.password) {
              this.setState({ pwErr: { content: error.password, pointing: 'below' } });
            }
          });
        }
      });
  };

  getdata = event => {
    event.preventDefault();
    API.getdata()
      .then(res => {
        console.log(res);
      });
  }

  savedata = event => {
    event.preventDefault();
    API.savedata()
      .then(res => {
        console.log(res);
      });
  }

  loginSuccess = () => {
    return (
      <Message loginSuccess={true}
        success
        header='Login successful'
        content='You will now be redirected'
      />
    );
  }

  redirectToDashboard = () => {
    return <Redirect push to='/dashboard' />;
  }

  redirectToImpact = () => {
    return <Redirect push to='/impact' />;
  }

  render () {
    return (
      <SplashTemplate
        title='humun'
        titleSize='large'
        bgImage={bg}
        blendMode='soft-light'
      >
        {this.state.impactRedirect && this.redirectToImpact()}
        {this.state.profileRedirect && this.redirectToDashboard()}
        <Form success inverted>
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
          <Button inverted basic type='submit' onClick={this.login} fluid>Submit</Button>
          <Header as='h6' floated='right' inverted style={{ marginTop: '1em' }}><a href='/reset' style={{ color: 'white' }}>Forgot Password? Reset Password →</a></Header>
          <Header as='h6' floated='left' inverted style={{ marginTop: '1em' }}><a href='/create' style={{ color: 'white' }}>New User? Create Account →</a></Header>

        </Form>
        {this.state.loginSuccess && this.loginSuccess()}
      </SplashTemplate>
    );
  }
}

export default Login;
