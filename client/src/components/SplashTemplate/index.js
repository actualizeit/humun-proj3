import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import API from '../../utils/Api';
import { Redirect } from 'react-router-dom';

const { Row, Column } = Grid;

class SplashTemplate extends Component {
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
    const sectionStyle = {
      backgroundImage: `url(${this.props.bgImage})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundColor: '#179BE8',
      backgroundBlendMode: 'hard-light'
    };

    return (
      <Grid verticalAlign="middle" centered stackable columns={3} style={{ height: '100vh', ...sectionStyle }}>
        <Row>
          <Column textAlign='center' inverted style={{ backgroundColor: 'rgba(23, 155, 232, .75)', padding: '2em 2em', borderRadius: '8px' }}>

            {/* Redirect if logged in */}
            {this.state.profileRedirect && <Redirect push to="/dashboard" />}

            {/* Page Content */}
            <Header as='h1' inverted>{this.props.title}</Header>
            <p>{this.props.children}</p>
          </Column>
        </Row>
      </Grid>
    );
  }
}

export default SplashTemplate;
