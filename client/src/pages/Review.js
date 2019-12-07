import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeContainer from './../components/ThemeContainer';
import ThemeBody from './../components/ThemeBody';
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
    API.allocation()
      .then(res => {
        const allocations = res.data.user.allocations;
        const profileData = res.data.user.profileData;
        this.setState({
          firstName: [res.data.user.firstName],
          lastName: [res.data.user.lastName],
          date: [res.data.user.date],
          email: [res.data.user.email],
          impactLoc: [profileData.impactLoc],
          shortVlongTerm: [profileData.shortVlongTerm],
          basicNeeds: [profileData.basicNeeds],
          climateChange: [profileData.climateChange],
          education: [profileData.education],
          globalHealth: [profileData.globalHealth],
          habitat: [profileData.habitat],
          pollution: [profileData.pollution],
          socialVenvironmental: [profileData.socialVenvironmental]
          //  allocations: [allocations]
        });
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
              <p>firstName: {this.state.firstName}</p>
              <p>lastName: {this.state.lastName}</p>
              <p>date: {this.state.date}</p>
              <p>email: {this.state.email}</p>
              <p>impactLoc: {this.state.impactLoc}</p>
              <p>shortVlongTerm: {this.state.shortVlongTerm}</p>
              <p>basicNeeds: {this.state.basicNeeds}</p>
              <p>climateChange: {this.state.climateChange}</p>
              <p>education: {this.state.education}</p>
              <p>globalHealth: {this.state.globalHealth}</p>
              <p>habitat: {this.state.habitat}</p>
              <p>pollution: {this.state.pollution}</p>
              <p>socialVenvironmental: {this.state.socialVenvironmental}</p>
              {/* <p>allocations: {this.state.allocations}</p> */}
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
