import React, { Component } from 'react';
import { Header, Segment, Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';
import ThemeSlider from './../components/ThemeSlider';
import ThemeSliderGroup from './../components/ThemeSliderGroup';
import ThemeSliderGroupContainer from './../components/ThemeSliderGroup/ThemeSliderGroupContainer';
import API from './../utils/Api';

const sliderSteps = 120;

class Causes extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: false,
      environment: false,
      social: false,
      user: false,
      socialVenvironmental: [3]
    };
  }

  componentDidMount () {
    API
      .get()
      .then(res => {
        const { socialVenvironmental, impactLoc, shortVlongTerm } = res.data.user.profileData;
        this.setState({
          socialVenvironmental: [socialVenvironmental],
          impactLoc: [impactLoc],
          shortVlongTerm: [shortVlongTerm]
        });
      });
  }

  handleChange = (key, result) => {
    this.setState({
      [key]: result
    });
  }

  handleCauses = () => {
    const { environment, social, socialVenvironmental, impactLoc, shortVlongTerm } = this.state;
    const obj = {
      profileData: {
        ...environment,
        ...social,
        socialVenvironmental: socialVenvironmental[0],
        impactLoc: impactLoc[0],
        shortVlongTerm: shortVlongTerm[0]
      }
    };

    // Post to db, if successful redirect to review page
    API
      .post(obj)
      .then(() => this.setRedirect())
      .catch(err => console.log(err));
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/review' />;
    }
  }

  render () {
    return (
      <div>
        {this.renderRedirect()}
        <ThemeHeader text='Your Causes' />
        <ThemeBody>
          <Form>
            <Header as='h4' attached='top' textAlign='center'>
              Are social or environmental issues more important to you?
            </Header>
            <Segment attached='bottom'>
              <ThemeSlider stateKey='socialVenvironmental' value={this.state.socialVenvironmental} stateHandler={this.handleChange} leftLabel='social' rightLabel='environmental' />
            </Segment>

            <Header as='h4' attached='top' textAlign='center'>
              Which environmental issues do you care most about?
            </Header>
            <Segment attached='bottom'>
              <ThemeSliderGroupContainer>
                <ThemeSliderGroup values={['pollution', 'habitat', 'climateChange']} userValues={this.state.user} titles={['Pollution Prevention & Clean-up', 'Habitat Preservation & Biodiversity', 'Climate Change Mitigation']} stateKey='environment' stateHandler={this.handleChange} steps={sliderSteps}/>
              </ThemeSliderGroupContainer>
            </Segment>

            <Header as='h4' attached='top' textAlign='center'>
              Which social issues do you care most about?
            </Header>
            <Segment attached='bottom'>
              <ThemeSliderGroupContainer>
                <ThemeSliderGroup values={['basicNeeds', 'education', 'globalHealth']} userValues={this.state.user} titles={['Basic Needs (Nutrition, Shelter, Safety, Water)', 'Education & Opportunity', 'Global Health']} stateKey='social' stateHandler={this.handleChange} steps={sliderSteps}/>
              </ThemeSliderGroupContainer>
            </Segment>

            <Button type='submit' onClick={this.handleCauses} primary fluid>Submit</Button>
          </Form>
        </ThemeBody>
      </div>
    );
  }
}

export default Causes;
