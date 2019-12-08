import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeContainer from './../components/ThemeContainer';
import ThemeBody from './../components/ThemeBody';
import ThemeSegment from './../components/ThemeSegment';
import ThemeSlider from './../components/ThemeSlider';
import API from './../utils/Api';

class Impact extends Component {
  constructor (props) {
    super(props);
    this.state = {
      redirect: false,
      splashRedirect: false,
      impactLoc: [3],
      shortVlongTerm: [3]
    };
  }

  componentDidMount () {
    this.checkLogin();
    API
      .get()
      .then(res => {
        const { profileData } = res.data.user;
        console.log(res.data.user.profileData);
        this.setState({
          impactLoc: [profileData.impactLoc],
          shortVlongTerm: [profileData.shortVlongTerm],
          profileData: [profileData]
        });
      });
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

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  handleImpacts = () => {
    const { impactLoc, shortVlongTerm } = this.state;
    // console.log('svl: ' + shortVlongTerm + ' impact: ' + impactLoc);
    this.state.profileData[0].impactLoc = impactLoc[0];
    this.state.profileData[0].shortVlongTerm = shortVlongTerm[0];
    // console.log('svl: ' + this.state.profileData.shortVlongTerm + ' impact: ' + this.state.profileData.impactLoc);
    console.log(this.state.profileData);
    const profileData = this.state.profileData;
    API
      .post({
        impactLoc: impactLoc[0],
        shortVlongTerm: shortVlongTerm[0],
        impactsSetUp: true,
        profileData: profileData[0]
      })
      .then(() => {
        this.setRedirect();
      })
      .catch(err => console.log(err));
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/causes' />;
    }
  }

  render () {
    if (this.state.splashRedirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div>
        {this.renderRedirect()}
        <ThemeContainer text='Your Impact'>
          <ThemeBody>
            <Form>
              <ThemeSegment title='Is it more important to make a significant impact near you or greater a global impact?'>
                <ThemeSlider stateKey='impactLoc' value={this.state.impactLoc} stateHandler={this.handleChange} leftLabel='local' rightLabel='global' />
              </ThemeSegment>
              <ThemeSegment title='Is it more important to achieve guaranteed smaller effects in the near-term or work toward potentially larger effects in the long-term?'>
                <ThemeSlider stateKey='shortVlongTerm' value={this.state.shortVlongTerm} stateHandler={this.handleChange} leftLabel='short-term' rightLabel='long-term' />
              </ThemeSegment>
              <Button basic type='submit' onClick={this.handleImpacts} content='Your Causes' icon='right arrow' labelPosition='right' fluid />
            </Form>
          </ThemeBody>
        </ThemeContainer>
      </div>
    );
  }
}

export default Impact;
