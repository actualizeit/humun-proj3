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
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundColor: '#179BE8',
      backgroundAttachment: 'fixed',
      backgroundBlendMode: `${this.props.blendMode}`
    };

    return (
      <Grid verticalAlign="middle" centered stackable columns={3} style={{ minHeight: '100vh', ...sectionStyle, margin: '0' }}>
        <Row>
          <Column inverted style={{ backgroundColor: 'rgba(23, 155, 232, .75)', padding: '2em 2em', borderRadius: '8px' }}>

            {/* Redirect if logged in */}
            {this.state.profileRedirect && <Redirect to="/dashboard" />}

            {/* Page Content */}
            { this.props.titleSize === 'large' && <Header as='h1' textAlign='center' inverted>{this.props.title}</Header> }
            { this.props.titleSize === 'small' && <Header as='h2' textAlign='center' inverted>{this.props.title}</Header> }
            <div style={{ color: 'white' }}>{this.props.children}</div>
          </Column>
        </Row>
      </Grid>
    );
  }
}

export default SplashTemplate;
