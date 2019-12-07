import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeContainer from './../components/ThemeContainer';
import ThemeBody from './../components/ThemeBody';
import API from './../utils/Api';

class Review extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  componentDidMount () {
    API
      .get()
      .then(res => {
        this.setState({
          userInfo: res.data.user
        });
      })
      .catch(err => console.log(err));
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
    // const {
    //   firstName,
    //   lastName,
    //   impact,
    //   shortVlongTerm,
    //   basicNeeds,
    //   climateChange,
    //   education,
    //   globalHealth,
    //   habitat,
    //   pollution,
    //   socialVenvironmental
    // } = { ...this.state.userInfo };

    return (
      <div>
        {this.renderRedirect()}
        <ThemeContainer text='Review'>
          <ThemeBody>
            <Header as='h4' textAlign='center'>
              <p>Great!</p>
              <p>Please review your contribution profile:</p>
            </Header>
            {/* content here */}
            <Button type='submit' onClick={this.handleReview} primary fluid>Next</Button>
          </ThemeBody>
        </ThemeContainer>
      </div>
    );
  }
}

export default Review;
