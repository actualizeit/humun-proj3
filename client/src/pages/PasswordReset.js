import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Button } from 'semantic-ui-react';
import API from './../utils/Api';

class Review extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  componentDidMount () {
    console.log(this.props.match.params.jsontoken);
  }

  resetPW = () => {
    API.resetPW({ test: 'test' })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getResetToken = () => {
    API.getResetToken({ test: 'test' })
      .then(res => {
        console.log(res);
      });
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/matches' />;
    }
  }

  render () {
    return (
      <div>
        <Button fluid onClick={this.resetPW}>Reset</Button>
        <Button fluid onClick={this.getResetToken}>Reset</Button>
      </div>
    );
  }
}

export default Review;
