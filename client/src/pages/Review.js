import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';
import ThemeCard from './../components/ThemeCard';
import API from '../utils/Api';

class Review extends Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: false,
      firstName: ''
    };
  }

 loadUser = () => {

 }

 componentDidMount () {
   console.log('allocationCalc: ' + JSON.stringify(API.allocation()));
   API.allocation()
     .then(user =>
       this.setState({
         firstName: [user.firstName],
         lastName: [user.lastName],
         impact: [user.impact],
         shortVlongTerm: [user.shortVlongTerm],
         basicNeeds: [user.basicNeeds],
         climateChange: [user.climateChange],
         education: [user.education],
         globalHealth: [user.globalHealth],
         habitat: [user.habitat],
         pollution: [user.pollution],
         socialVenvironmental: [user.socialVenvironmental]
       })
     );
   //  console.log(this.state.firstName);
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
    const {
      firstName,
      lastName,
      impact,
      shortVlongTerm,
      basicNeeds,
      climateChange,
      education,
      globalHealth,
      habitat,
      pollution,
      socialVenvironmental
    } = { ...this.state.userInfo };

    return (
      <div>
        {this.renderRedirect()}
        <ThemeHeader text='Review' />
        <ThemeBody>
          <Header as='h4' textAlign='center'>
            <p>Great!</p>
            <p>Please review your contribution profile:</p>
            <p>firstName: {this.state.firstName}</p>
          </Header>
          <ThemeCard>
          </ThemeCard>
          {/* content here */}
          <Button type='submit' onClick={this.handleReview} primary fluid>Next</Button>
        </ThemeBody>
      </div>
    );
  }
}

export default Review;
