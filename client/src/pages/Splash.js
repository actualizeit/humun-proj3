import React, { Component } from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import API from './../utils/Api';
import { Redirect } from 'react-router-dom';

let counter = 0;

const sectionStyle = {
  backgroundImage: 'url("https://images.pexels.com/photos/793166/pexels-photo-793166.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

const { Row, Column } = Grid;

class Splash2 extends Component {
  constructor (props) {
    super(props);

    this.state = {
      text: 'Humun is an app that empowers you to contribute in the most effective ways to the causes you care about, and makes it easier than ever to maintain and enhance your positive impact over time.',
      profileRedirect: false,
      showMore: true
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

  componentDidMount () {
    this.checkLogin();
  }

  checkLogin () {
    API.test()
      .then(res => {
        console.log('test');
        this.setState({ profileRedirect: true });
      })
      .catch(() => {
        console.log('fail');
      });
  }

  render () {
    if (this.state.profileRedirect) {
      return <Redirect push to="/dashboard" />;
    }
    return (
      <Grid verticalAlign="middle" centered stackable columns={3} style={{ height: '100vh' }}>
        <Row color='blue' style={ sectionStyle }>
          <Column textAlign='center'>
            <Header as='h1' inverted>humun</Header>
            <p>{this.state.text}</p>
            {this.state.showMore &&
            <p><Button basic inverted color='white' onClick={this.moreInfo}>More Info</Button></p>
            }
            <p><Button color='white' fluid href='/create'>Create an Account</Button></p>
            <p><Button color='blue' fluid href='/login'>Login</Button></p>
          </Column>
        </Row>
      </Grid>
    );
  }
}

export default Splash2;
