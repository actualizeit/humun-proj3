import React, { Component } from 'react';
import { Input, Button, Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeContainer from './../components/ThemeContainer';
import ThemeBody from './../components/ThemeBody';
import API from './../utils/Api';

class ThankYou extends Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: false,
      splashRedirect: false
    };
  }

  componentDidMount = () => {
    API
      .test()
      .catch(() => {
        console.log('test')
        this.setState({ splashRedirect: true });
      });
  }

  handleSubmit = () => {
    console.log('clicked');
    // this.setState({
    //   redirect: true
    // });
  }

  render () {
    return (
      <ThemeContainer text='Thank you!'>
        <ThemeBody>
          {this.state.splashRedirect && <Redirect to='/' />}
          {this.state.redirect && <Redirect to='/dashboard' />}
          <Form>
            <Form.Field
              id='form-input-control-donation'
              control={Input}
              label='Donation Amount'
              placeholder='Enter Donation Amount'
              type='number'
              max={5}
            />
            <Button type='submit' basic fluid content='Submit' icon='right arrow' labelPosition='right' />
          </Form>
        </ThemeBody>
      </ThemeContainer>
    );
  }
}

export default ThankYou;
