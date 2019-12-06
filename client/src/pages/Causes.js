import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeSegment from './../components/ThemeSegment';
import ThemeContainer from './../components/ThemeContainer';
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
        const { socialVenvironmental } = res.data.user;
        this.setState({
          socialVenvironmental: [socialVenvironmental]
        });
      });
  }

  handleChange = (key, result) => {
    this.setState({
      [key]: result
    });
  }

  handleCauses = () => {
    const { environment, social, socialVenvironmental } = this.state;
    const obj = {
      ...environment,
      ...social,
      socialVenvironmental: socialVenvironmental[0]
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
        <ThemeContainer text='Your Causes'>
          <ThemeBody>
            <Form>
              <ThemeSegment title='Are social or environmental issues more important to you?'>
                <ThemeSlider stateKey='socialVenvironmental' value={this.state.socialVenvironmental} stateHandler={this.handleChange} leftLabel='social' rightLabel='environmental' />
              </ThemeSegment>

              <ThemeSegment title='Which environmental issues do you care most about?'>
                <ThemeSliderGroupContainer>
                  <ThemeSliderGroup values={['pollution', 'habitat', 'climateChange']} userValues={this.state.user} titles={['Pollution Prevention & Clean-up', 'Habitat Preservation & Biodiversity', 'Climate Change Mitigation']} stateKey='environment' stateHandler={this.handleChange} steps={sliderSteps}/>
                </ThemeSliderGroupContainer>
              </ThemeSegment>

              <ThemeSegment title='Which social issues do you care most about?'>
                <ThemeSliderGroupContainer>
                  <ThemeSliderGroup values={['basicNeeds', 'education', 'globalHealth']} userValues={this.state.user} titles={['Basic Needs (Nutrition, Shelter, Safety, Water)', 'Education & Opportunity', 'Global Health']} stateKey='social' stateHandler={this.handleChange} steps={sliderSteps}/>
                </ThemeSliderGroupContainer>
              </ThemeSegment>
              <Button basic type='submit' onClick={this.handleCauses} content='Review' icon='right arrow' labelPosition='right' fluid />
            </Form>
          </ThemeBody>
        </ThemeContainer>
      </div>
    );
  }
}

export default Causes;
