import React, { Component } from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import API from './../utils/Api';
import { Redirect } from 'react-router-dom';

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
      profileRedirect: false
    };
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
            <p>Humun is an app that empowers you to contribute in the most effective ways to the causes you care about, and makes it easier than ever to maintain and enhance your positive impact over time.</p>
            <p><Button color='white' fluid href='/create'>Create an Account</Button></p>
            <p><Button color='blue' fluid href='/login'>Login</Button></p>
          </Column>
        </Row>
      </Grid>
    );
  }
}

export default Splash2;
