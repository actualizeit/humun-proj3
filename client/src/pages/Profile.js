import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Header, Segment, Icon, Grid, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeBody from './../components/ThemeBody';
import API from './../utils/Api';
const { Row, Column } = Grid;

class Profile extends Component {
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      redirect: false
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
      .catch(err => console.log(err));
  }

  checkLogin () {
    API.test()
      .then(res => {
        console.log('loggedin');
      })
      .catch(() => {
        this.setState({ redirect: true });
      });
  }

  logout () {
    API.logout();
    this.checkLogin();
  }

  render () {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    // getting variables from userInfo, since it's a nested object in one state it's a little tricky
    const { firstName, lastName } = { ...this.state.userInfo };
    return (
      <div>
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
                <Header.Content>{firstName} {lastName}</Header.Content>
              </Header>
            </Segment>
            <Segment vertical>Member Since -Date-</Segment>
          </div>

          <Header as='h5' attached='top'>Allocations</Header>
          <Segment attached='bottom'>
            <p>Allocations Here</p>
          </Segment>

          <Header as='h5' attached='top'>Donation History</Header>
          <Segment attached='bottom'>
            <p>Donations Here</p>
          </Segment>
          <Button fluid onClick={this.logout}>Logout</Button>

        </ThemeBody>
      </div>
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
