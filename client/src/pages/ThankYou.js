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
      donation: false,
      transactions: false,
      redirect: false,
      splashRedirect: false
    };
  }

  handleChange = (event) => {
    const donation = event.target.value.trim();
    this.state.donation = donation;
    console.log(this.state.donation);
  }

  componentDidMount = () => {
    this.checkLogin();
    API
      .get()
      .then(res => {
        console.log('==================');
        console.log('APIget: ', res.data.user.transactions);
        this.state.transactions = res.data.user.transactions;
        // const { allocations } = res.data.user;
        // this.setState({
        //   allocations
        // });
      });
  }

  checkLogin () {
    API.test()
      .then(res => {
        console.log('loggedin');
      })
      .catch(() => {
        this.setState({ splashRedirect: true });
      });
  }

  handleSubmit = () => {
    API
      .get()
      .then(res => {
        const oldTransactions = res.data.user.transactions;
        const newTrans = {
          date: new Date(),
          donation: this.state.donation
        };
        oldTransactions.push(newTrans);
        API.post({
          transactions: oldTransactions
        });
      });
    this.setState({
      redirect: true
    });
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
              max={1000}
              onChange={this.handleChange}
            />
            <Button type='submit' basic fluid content='Submit' onClick={this.handleSubmit} icon='right arrow' labelPosition='right' />
          </Form>
        </ThemeBody>
      </ThemeContainer>
    );
  }
}

export default ThankYou;
