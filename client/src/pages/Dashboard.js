import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Accordion, Header, Segment, Icon, Grid, Button, Message } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import ThemeContainer from '../components/ThemeContainer';
import ThemeSegment from './../components/ThemeSegment';
import ThemeBody from '../components/ThemeBody';
import ThemeCard from './../components/ThemeCard';
import { Doughnut } from 'react-chartjs-2';
import API from '../utils/Api';
const { Row, Column } = Grid;

const donationsArray = [];
const colorArray = ['#F0EE92', '#89C229', '#B5E4FE', '#179BE8', '#30499E', '#FF6A5A', '#FFB325'];
const colorArray2 = [];
const labelArray = [];

class Dashboard extends Component {
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.confirmationEmail = this.confirmationEmail.bind(this);
    this.state = {
      userInfo: null,
      splashRedirect: false,
      emailConfirmationMessage: false,
      dataObject: {},
      activeIndex: -1,
      allocations: {}
    };
  }

  componentDidMount () {
    this.checkLogin();
    API
      .get()
      .then(res => {
        console.log(res.data.user);
        this.setState({
          userInfo: res.data.user
        });
        if (!this.state.userInfo.emailSetUp) {
          this.setState({ emailConfirmationMessage: true });
        }
        console.log(res.data.user);
      });
    API.allocation()
      .then(res => {
        const allocations = Object.values(res.data.user.allocations);
        this.setState({ aloocations: Object.values(res.data.user.allocations) });
        console.log('allocations: ', Object.values(allocations));
        allocations.forEach((charity, i) => {
          console.log(charity);
          colorArray2.push(colorArray[i]);
          donationsArray.push(charity.portion.toFixed(1));
          labelArray.push(charity.name);
        });
        this.setState({ dataObject: {
          datasets: [{
            data: donationsArray,
            backgroundColor: colorArray2
          }],
          labels: labelArray
        } });
      });
  }

  handleAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
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

  confirmationEmail () {
    console.log(this.state.userInfo);
    API.getEmailToken({ email: this.state.userInfo.email })
      .then(res => {
        console.log(res);
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
      charities,
      charityName
    } = { ...this.state.userInfo };

    if (this.state.splashRedirect) {
      return <Redirect push to="/" />;
    }

    const isSetUp = () => {
      if (causesSetUp && impactsSetUp) {
        return true;
      }
      return false;
    };

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
                  {!impactsSetUp && <Button basic color='teal' href='/impact'>Set Your Impacts</Button>}
                  {!causesSetUp && <Button basic color='teal' href='/causes'>Choose Your Causes</Button>}
                </Button.Group>
              </Message>
              {this.state.emailConfirmationMessage && <Message info>
                <p>You haven't confirmed your email yet.</p>
                <p><Button basic color='teal' fluid onClick={this.confirmationEmail}>Send Confirmation Email</Button></p>
              </Message>}
            </div>
          }

          {/* { isSetUp() &&
              Change settings
          } */}

          <ThemeSegment title='Allocations'>
            {charities && <p>You currently have chosen {charityName} to receive a portion of your contribution.</p>}
            {!charities && <p>If you would like, you can specify one charity to receive a portion of your contribution.</p>}
            <p><Link to='/search'>Search Charities</Link></p>
            <Doughnut data={this.state.dataObject} options={{ cutoutPercentage: '25' }}/>
          </ThemeSegment>
          <ThemeSegment title='Allocations'>
            <Accordion fluid inverted style={{ marginBottom: '1em', color: 'black' }}>
              <Accordion.Title
                active={this.state.activeIndex === 0}
                index={0}
                onClick={this.handleAccordion}
              >
                <Icon name='dropdown' />
            About Humun
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === 0}>
                <div>
                  {this.state.allocations.map(charity => (
                    <div key={charity.ein}>
                      <ThemeCard
                        title={charity.name}
                        link={charity.link}
                        tagLine={charity.description}
                        EIN={charity.ein}
                        cause={charity.category}
                        city={charity.charityCity}
                        state={charity.charityState}
                        portion={charity.portion.toFixed(1) + '%' }
                      >
                      </ThemeCard>
                    </div>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion>
          </ThemeSegment>
          <ThemeSegment title='Contributions'>
            Contributions - add paypal button
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
