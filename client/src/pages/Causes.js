import React, { Component } from 'react';
import { Header, Segment, Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';
import ThemeSliderGroup from './../components/ThemeSliderGroup';
import ThemeSliderGroupContainer from './../components/ThemeSliderGroup/ThemeSliderGroupContainer';
import API from './../utils/Api';

const sliderSteps = 120;

class Causes extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: false,
      environment: [],
      social: []
    };
  }

  handleChange = (key, result) => {
    this.setState({
      [key]: result
    });
  }

  handleCauses = () => {
    const { environment, social } = this.state;
    const obj = { ...environment, ...social };
    console.log(obj);
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
              Environmental
            </Header>
            <Segment attached='bottom'>
              <ThemeSliderGroupContainer>
                <ThemeSliderGroup values={['pollution', 'habitat', 'climateChange']} titles={['Pollution Prevention & Clean-up', 'Habitat Preservation & Biodiversity', 'Climate Change Mitigation']} stateKey='environment' stateHandler={this.handleChange} steps={sliderSteps}/>
              </ThemeSliderGroupContainer>
            </Segment>

            <Header as='h4' attached='top' textAlign='center'>
              Social
            </Header>
            <Segment attached='bottom'>
              <ThemeSliderGroupContainer>
                <ThemeSliderGroup values={['basicNeeds', 'education', 'globalHealth']} titles={['Basic Needs (Nutrition, Shelter, Safety, Water)', 'Education & Opportunity', 'Global Health']} stateKey='social' stateHandler={this.handleChange} steps={sliderSteps}/>
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
