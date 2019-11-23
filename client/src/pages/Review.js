import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';

class Review extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

    handleReview = () => {
      console.log('clicked');

      // if review is approved redirect to matches page
      this.setRedirect();
    }

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
        <div>
          { this.renderRedirect() }
          <ThemeHeader text='Review' />
          <ThemeBody>
            <Header as='h4' textAlign='center'>
              <p>Great!</p>
              <p>Please review your contribution profile:</p>
            </Header>

            <Button type='submit' onClick={this.handleReview} primary fluid>Next</Button>
          </ThemeBody>
        </div>
      );
    }
}

export default Review;
