import React, { Component } from 'react';
import { Header, Segment, Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeHeader from './../components/ThemeHeader';
import ThemeBody from './../components/ThemeBody';
import ThemeSegment from './../components/ThemeSegment';
import ThemeSlider from './../components/ThemeSlider';
import API from './../utils/Api';

class Impact extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: false,
      impactLoc: [3],
      shortVlongTerm: [3]
    };
  }

  componentDidMount () {
    API
      .get()
      .then(res => {
        const { impactLoc, shortVlongTerm } = res.data.user;
        this.setState({
          impact: [impactLoc],
          shortVlongTerm: [shortVlongTerm]
        });
      });
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  handleImpacts = () => {
    const { impactLoc, shortVlongTerm } = this.state;
    API
      .post({
        impactLoc: impactLoc[0],
        shortVlongTerm: shortVlongTerm[0]
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
        {this.renderRedirect()}
        <ThemeHeader text='Your Impact' />
        <ThemeBody>
          <Form>
            <ThemeSegment title='Is it more important to make a significant impact near you or greater a global impact?'>
              <ThemeSlider stateKey='impactLoc' value={this.state.impactLoc} stateHandler={this.handleChange} leftLabel='local' rightLabel='global' />
            </ThemeSegment>
            <ThemeSegment title='Is it more important to achieve guaranteed smaller effects in the near-term or work toward potentially larger effects in the long-term?'>
              <ThemeSlider stateKey='shortVlongTerm' value={this.state.shortVlongTerm} stateHandler={this.handleChange} leftLabel='short-term' rightLabel='long-term' />
            </ThemeSegment>
            <Button type='submit' onClick={this.handleImpacts} primary fluid>Submit</Button>
          </Form>
        </ThemeBody>
      </div>
    );
  }
}

export default Impact;
