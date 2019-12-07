import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from './../utils/Api';
import { Grid, Header, Button, Form, Input, Message } from 'semantic-ui-react';
const { Row, Column } = Grid;

class Review extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: false,
      password: '',
      password2: '',
      pwErr: null,
      pw2Err: null,
      tokenErr: false,
      success: false,
      hidePW: false
    };
  }

  componentDidMount () {
    console.log(this.props.match.params.jsontoken);
  }

  resetPW = () => {
    this.setState({ pwErr: null, pw2Err: null });
    const { password, password2 } = this.state;
    API.resetPW({ password, password2, token: this.props.match.params.jsontoken })
      .then(res => {
        if(res.data.success) {
          this.setState({ success: true, hidePW: true });
        } else {
          res.data.errors.forEach(error => {
            if (error.token) {
              this.setState({ tokenErr: true, hidePW: true });
            }
            if (error.password) {
              this.setState({ pwErr: { content: error.password, pointing: 'below' } });
            }
            if (error.password2) {
              this.setState({ pw2Err: { content: error.password2, pointing: 'below' } });
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
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
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/matches' />;
    }
  }

  render () {
    return (
      <Grid verticalAlign="middle" centered stackable columns={3} style={{ height: '100vh' }}>
        <Row color='green'>
          <Column textAlign='center'>
            <Header as='h1' inverted>humun</Header>
            <Form success error>
              {!this.state.hidePW &&
                <>
                  <p>Please enter your new password below.</p>
                  <Form.Field
                    id='form-input-control-pw'
                    control={Input}
                    label='Password'
                    placeholder='******'
                    name='password'
                    type='password'
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    error={this.state.pwErr}
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
                    error={this.state.pw2Err}
                    // required
                  />
                </>
              }
              {this.state.tokenErr &&
                <Message error>
                  <p>Your web token has expired. </p><a href="/reset">Send new reset email</a>
                </Message>
              }
              {this.state.success &&
                <Message success>
                  <p>Reset Successful. </p><a href="/login">Return to login</a>
                </Message>
              }
              <Button type='submit' onClick={this.resetPW} primary fluid>Submit</Button>
            </Form>
          </Column>
        </Row>
      </Grid>
    );
  }
}

export default Review;
