import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import ThemeContainer from './../components/ThemeContainer';
import ThemeBody from './../components/ThemeBody';
import API from '../utils/Api';
// import { Doughnut } from 'react-chartjs-2';
import AllocationsChart from './../components/AllocationsChart';

class Review extends Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: false,
      splashRedirect: false,
      allocations: false
    };
  }

  componentDidMount () {
    this.checkLogin();
    API
      .allocation()
      .then(res => {
        const { allocations } = res.data.user;
        this.setState({
          allocations
        });
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

  handleReview = () => {
    console.log('clicked');

    // if review is approved redirect to dashboard
    this.setRedirect();
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/dashboard' />;
    }
  }

  render () {
    if (this.state.splashRedirect) {
      return <Redirect push to="/" />;
    }

    return (
      <div>
        {this.renderRedirect()}
        <ThemeContainer text='Please review your contribution profile:'>
          <ThemeBody>
            {this.state.allocations && <AllocationsChart allocations={this.state.allocations} />}
            <p style={{ marginTop: '1em' }}>
              If this all looks good, congrats! Your profile is complete! Click 'Next' to proceed to your dashboard where you can donate to your causes.
            </p>
            <p>
              Or, if you'd like to make adjustments, you can:
            </p>
            <Link to='/impact'><Button basic content='Change your allocations' icon='left arrow' labelPosition='left' fluid style={{ marginTop: '.5em' }} /></Link>
            <Link to='/search'><Button basic content='Add a specific charity' icon='add' labelPosition='left' fluid style={{ marginTop: '.5em' }} /></Link>
            <Button basic type='submit' onClick={this.handleReview} content='Finish' icon='right arrow' labelPosition='right' fluid style={{ marginTop: '.5em' }} />
          </ThemeBody>
        </ThemeContainer>
      </div>
    );
  }
}

export default Review;
