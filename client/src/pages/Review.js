import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeContainer from './../components/ThemeContainer';
import ThemeBody from './../components/ThemeBody';
import API from '../utils/Api';
import { Doughnut } from 'react-chartjs-2';

const donationsArray = [];
const colorArray = ['gray', 'black', 'lightgrey', 'green', 'blue', 'indigo'];
const colorArray2 = [];
const labelArray = [];

const dataObject = {
  datasets: [{
    data: donationsArray,
    backgroundColor: colorArray2
  }],
  labels: labelArray
};

class Review extends Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: false,
      splashRedirect: false,
      firstName: ''
    };
  }

  componentDidMount () {
    this.checkLogin();
    API.allocation()
      .then(res => {
        const allocations = Object.values(res.data.user.allocations);
        console.log('allocations: ', Object.values(allocations));
        allocations.forEach((charity, i) => {
          colorArray2.push(colorArray[i]);
          donationsArray.push(charity.portion.toFixed(1));
          labelArray.push(charity.name);
        });

        // console.log('allocations: ', allocations);
        // const profileData = res.data.user.profileData;
        this.setState({
          // firstName: [res.data.user.firstName],
          // lastName: [res.data.user.lastName],
          // date: [res.data.user.date],
          // email: [res.data.user.email],
          // impactLoc: [profileData.impactLoc],
          // shortVlongTerm: [profileData.shortVlongTerm],
          // basicNeeds: [profileData.basicNeeds],
          // climateChange: [profileData.climateChange],
          // education: [profileData.education],
          // globalHealth: [profileData.globalHealth],
          // habitat: [profileData.habitat],
          // pollution: [profileData.pollution],
          // socialVenvironmental: [profileData.socialVenvironmental],
          // char1: [allocations.basicNeeds.name]
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
              <div>
                <Doughnut data={dataObject} />
              </div>
              <p>If this all looks good, congrats! Your profile is complete! Click "Next" to proceed to your dashboard where you can donate to your causes.</p>
              <Button type='submit' onClick={this.handleReview} primary fluid>Next</Button>
              <p> Or, if you'd like to make adjustments, you can: </p>
              <Button.Group fluid>
                {<Button basic color='teal' href='/impact'>Change your allocations</Button>}
                {<Button basic color='teal' href='/search'>Select a new charity</Button>}
              </Button.Group>


            </Header>
            {/* <p>firstName: {this.state.firstName}</p>
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
              <p>char1: {this.state.char1}</p> */}

            {/* content here */}
          </ThemeBody>
        </ThemeContainer>
      </div>
    );
  }
}

export default Review;
