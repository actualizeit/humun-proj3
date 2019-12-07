import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Header, Segment, Icon, Grid, Button, Message } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import ThemeContainer from '../components/ThemeContainer';
import ThemeSegment from './../components/ThemeSegment';
import ThemeBody from '../components/ThemeBody';
import API from '../utils/Api';
const { Row, Column } = Grid;

class Dashboard extends Component {
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
      causesSetUp,
      impactsSetUp,
      charities
    } = { ...this.state.userInfo };

    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    const isSetUp = () => {
      if (causesSetUp && impactsSetUp) {
        return true;
      }
      return false;
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

          { !isSetUp() &&
            <div style={{ marginBottom: '1.25em' }}>
              <Message icon='exclamation' header='Finish Account Set Up' info attached='top' />
              <Message info attached='bottom'>
                <Button.Group fluid>
                  {!impactsSetUp && <Button basic color='teal' link='/impact'>Set Your Impacts</Button>}
                  {!causesSetUp && <Button basic color='teal' link='/causes'>Choose Your Causes</Button>}
                </Button.Group>
              </Message>
            </div>
          }
          <ThemeSegment title='Allocations'>
            {charities && <p>You currently have chosen {charities[0]} to receive a portion of your contribution.</p>}
            {!charities && <p>If you would like, you can specify one charity to receive a portion of your contribution.</p>}
            <p><Link to='/search'>Search Charities</Link></p>
          </ThemeSegment>

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

export default Dashboard;
