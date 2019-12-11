import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Header, Segment, Grid, Button, Message, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeContainer from '../components/ThemeContainer';
import ThemeSegment from './../components/ThemeSegment';
import ThemeBody from '../components/ThemeBody';
// import ThemeCard from './../components/ThemeCard';
import AllocationsChart from './../components/AllocationsChart';
import AllocationsCard from './../components/AllocationsCard';
import API from '../utils/Api';
import Payment from '../components/Paypal/payment';
const { Row, Column } = Grid;

class Dashboard extends Component {
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.confirmationEmail = this.confirmationEmail.bind(this);
    this.state = {
      userInfo: null,
      splashRedirect: false,
      emailConfirmationMessage: false,
      activeIndex: -1,
      allocationsArr: [],
      allocations: false
    };
  }

  componentDidMount () {
    this.checkLogin();
    API
      .get()
      .then(res => {
        const arr = Object.values(res.data.user.allocations);
        const allocationsArr = [...arr].sort((a, b) => {
          return b.portion - a.portion;
        });
        this.setState({
          userInfo: res.data.user,
          allocations: res.data.user.allocations,
          allocationsArr: allocationsArr
        });
        console.log(res.data.user.allocations);
        if (!this.state.userInfo.emailSetUp) {
          this.setState({ emailConfirmationMessage: true });
        }
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
        console.log('test')
        // console.log(res);
      })
      .catch(() => {
        console.log('test')
        this.setState({ splashRedirect: true });
      });
  }

  confirmationEmail () {
    // console.log(this.state.userInfo);
    API.getEmailToken({ email: this.state.userInfo.email })
      .then(res => {
        // console.log(res);
      });
  }

  logout () {
    API.logout();
    this.checkLogin();
  }

  render () {
    const {
      firstName,
      causesSetUp,
      impactsSetUp
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
              <Header as='h2' textAlign='center'>
                {/* <Icon name='user' circular /> */}
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
            {this.state.allocations && <AllocationsChart allocations={this.state.allocations} />}
          </ThemeSegment>
          <ThemeSegment title='Matched Charities'>
            {/* <Accordion fluid style={{ marginBottom: '1em', color: 'black' }}>
              <Accordion.Title
                active={this.state.activeIndex === 0}
                index={0}
                onClick={this.handleAccordion}
              >
                <Icon name='dropdown' />
                Show Charities
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === 0}>
                <div>
                  { this.state.allocationsArr.map(charity => (
                    <div key={charity.ein}>
                      <ThemeCard
                        title={charity.name}
                        link={charity.link}
                        tagLine={charity.description}
                        EIN={charity.ein}
                        cause={charity.category}
                        city={charity.city}
                        state={charity.state}
                        portion={charity.portion.toFixed(1) + '%' }
                      >
                      </ThemeCard>
                    </div>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion> */}
            {
              this.state.allocationsArr.map((charity, i) => {
                return (
                  <AllocationsCard charity={charity} key={i} />
                );
              })
            }
            <Message info>
              {this.state.allocations.userSelected && <p>You currently have chosen {this.state.allocations.userSelected.name} to receive a portion of your contribution. You may select one custom charity at a time. If you would like to change your charity, click the button below:</p>}
              {!this.state.allocations.userSelected && <p>If you would like, you can specify one charity to receive a portion of your contribution.</p>}
              <Button basic fluid color='teal' href='/search'>Search Charities</Button>
            </Message>
          </ThemeSegment>
          <ThemeSegment title='Contributions'>
            <Payment />
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="EDE9PRLKP23VE" />
              <Button type="submit" value='Donate' fluid color='facebook' border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" ><Icon name='paypal' /> Donate</Button>
              <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
            </form>
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
