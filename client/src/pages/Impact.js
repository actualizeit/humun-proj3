import React, { Component } from 'react';
import { Header, Segment, Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';
import ThemeSlider from './../components/ThemeSlider';
import API from './../utils/Api';

class Impact extends Component {
  constructor (props) {
    super(props);

    this.state = {
      id: '',
      redirect: false,
      impact: 3,
      shortVlongTerm: 3,
      socialVenvironmental: 3
    };
  }

  componentDidMount () {
    API
      .get()
      .then(res => {
        console.log(res.data.user);
        this.setState({ id: res.data.user._id });
      })
      .catch(err => console.log(err));
  }

    handleChange = (key, value) => {
      this.setState({
        [key]: value
      });
    }

    handleImpacts = () => {
      const { id, impact, shortVlongTerm, socialVenvironmental } = this.state;
      API
        .update(id, {
          impact,
          shortVlongTerm,
          socialVenvironmental
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
      return (
        <div>
          { this.renderRedirect() }
          <ThemeHeader text='Your Impact' />
          <ThemeBody>
            <Header as='h4' textAlign='center'>
                        Which is more important to you?
            </Header>
            <Form>
              <Segment>
                            Is it more important to make a significant impact near you or greater a global impact?
                <ThemeSlider stateKey='impact' value={this.state.impact} stateHandler={this.handleChange} leftLabel='local' rightLabel='global' />
              </Segment>
              <Segment>
                            Is it more important to achieve guaranteed smaller effects in the near-term or work toward potentially larger effects in the long-term?
                <ThemeSlider stateKey='shortVlongTerm' value={this.state.shortVlongTerm} stateHandler={this.handleChange} leftLabel='short-term' rightLabel='long-term' />
              </Segment>
              <Segment>
                            Are social or environemental issues more important to you?
                <ThemeSlider stateKey='socialVenvironmental' value={this.state.socialVenvironmental} stateHandler={this.handleChange} leftLabel='social' rightLabel='environmental' />
              </Segment>
              <Button type='submit' onClick={this.handleImpacts} primary fluid>Submit</Button>
            </Form>
          </ThemeBody>
        </div>
      );
    }
}

export default Impact;
