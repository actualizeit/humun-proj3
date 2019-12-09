import React, { Component } from 'react';
import { Header, Button, Accordion, Icon, Segment } from 'semantic-ui-react';
import SplashTemplate from './../components/SplashTemplate';

let counter = 0;

class Splash2 extends Component {
  constructor (props) {
    super(props);

    this.state = {
      text: 'Humun is an app that empowers you to contribute in the most effective ways to the causes you care about, and makes it easier than ever to maintain and enhance your positive impact over time.',
      showMore: true,
      activeIndex: -1
    };
  }

  moreInfo = () => {
    switch (counter) {
      case 0:
        this.setState({
          text: 'By automating the process of finding and donating to quaility charities that match your values, you can ensure you are doing the most good that you can, while saving time and effort.'
        });
        counter++;
        console.log('counter: ' + counter);
        break;
      case 1:
        this.setState({
          text: 'After answering some basic questions about your values, you will be paired with charities in differeent impact areas that match your priorities.'
        });
        counter++;
        break;
      case 2:
        this.setState({
          text: 'Charities are vetted for efficicacy and will be updated over time if either more effective charities, or charities that better match your prioirities, are added.'
        });
        counter++;
        break;
      case 3:
        this.setState({
          text: 'If there is an organization you would particularly like to support, you can also select a charity to donate to alongside the automatic recommendations.'
        });
        counter++;
        break;
      case 4:
        this.setState({
          text: 'Click "Create an Account" below to get started!',
          showMore: false
        });
        counter++;
        break;
      default: console.log('Summin gon wrong!');
    }
  }

  handleAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  render () {
    return (
      <SplashTemplate
        title='humun'
        bgImage='https://images.pexels.com/photos/793166/pexels-photo-793166.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      >
        <p style={{ color: 'white' }}>{this.state.text}</p>
        {/* {this.state.showMore &&
            <p><Button basic inverted color='white' onClick={this.moreInfo}>More Info</Button></p>
            } */}

        <Accordion fluid inverted style={{ marginBottom: '1em', color: 'white' }}>
          <Accordion.Title
            active={this.state.activeIndex === 0}
            index={0}
            onClick={this.handleAccordion}
          >
            <Icon name='dropdown' />
            About Humun
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIndex === 0}>
            <p>
              By automating the process of finding and donating to quaility charities that match your values, you can ensure you are doing the most good that you can, while saving time and effort.
            </p>
            <p>
              After answering some basic questions about your values, you will be paired with charities in differeent impact areas that match your priorities.
            </p>
            <p>
              Charities are vetted for efficicacy and will be updated over time if either more effective charities, or charities that better match your prioirities, are added.
            </p>
            <p>
              If there is an organization you would particularly like to support, you can also select a charity to donate to alongside the automatic recommendations.
            </p>
            <p>
              Click 'Create an Account' below to get started!
            </p>
          </Accordion.Content>
        </Accordion>
        <Button color='white' href='/create' fluid basic inverted>Create an Account</Button>
        <Header as='h6' floated='right' style={{ marginTop: '1em' }}>
          <a href='/login' style={{ color: 'white' }}>Already a member? Login →</a>
        </Header>
      </SplashTemplate>
    );
  }
}

export default Splash2;
