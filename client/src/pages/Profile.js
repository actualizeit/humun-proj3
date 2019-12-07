import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Header, Segment, Icon, Grid, Button } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import ThemeContainer from './../components/ThemeContainer';
import ThemeBody from './../components/ThemeBody';
import API from './../utils/Api';
const { Row, Column } = Grid;


class Profile extends Component {
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      splashRedirect: false
    };
  }

  componentDidMount () {
    this.checkLogin();
    API
      .get()
      .then(res => {
        this.setState({
          userInfo: res.data.user
        });
        console.log(res.data.user);
      })
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

  logout () {
    API.logout();
    this.checkLogin();
  }

  render () {
    const {
      firstName,
      // impact,
      // shortVlongTerm,
      // basicNeeds,
      // climateChange,
      // education,
      // globalHealth,
      // habitat,
      // pollution,
      // socialVenvironmental,
      charities,
      charityName
    } = { ...this.state.userInfo };

    if (this.state.splashRedirect) {
      return <Redirect push to="/" />;
    }

    return (
      <ThemeContainer>
        <Grid textAlign='center'>
          <Row>
            <Column color='blue' className={css(styles.pt)}>
              <Header as='h6' className={css(styles.white)}>
              </Header>
            </Column>
          </Row>
        </Grid>
        <ThemeBody>
          <div>
            <Segment vertical>
              <Header as='h2' icon textAlign='center'>
                <Icon name='user' circular />
                <Header.Content>Welcome {firstName}!</Header.Content>
              </Header>
            </Segment>
            <Segment vertical></Segment>
          </div>

          <Header as='h5' attached='top'>Allocations</Header>
          <Segment attached='bottom'>
            <p>You currently have chosen {charities && charityName} to receive a portion of your contribution.</p>
            <p><Link to='/search'>Change Charity</Link></p>

          </Segment>

          <Header as='h5' attached='top'>Donation History</Header>
          <Segment attached='bottom'>
            <p>Donations Here</p>
          </Segment>
          <Button fluid onClick={this.logout}>Logout</Button>

        </ThemeBody>
      </ThemeContainer>
    );
  }
}

const styles = StyleSheet.create({
  white: {
    color: 'white'
  },
  pt: {
    paddingTop: '2em'
  }
});

export default Profile;
