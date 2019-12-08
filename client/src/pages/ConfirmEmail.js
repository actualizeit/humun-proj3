import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from './../utils/Api';
import { Grid, Header, Form, Message } from 'semantic-ui-react';
const { Row, Column } = Grid;

class Review extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: false,
      tokenErr: false,
      success: false
    };
  }

  componentDidMount () {
    API.confirmEmail({ token: this.props.match.params.jsontoken })
      .then(res => {
        if (res.data.success) {
          this.setState({ success: true });
        } else {
          this.setState({ tokenErr: true });
        }
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
      <Grid verticalAlign="middle" centered stackable columns={3} style={{ height: '100vh' }}>
        <Row color='green'>
          <Column textAlign='center'>
            <Header as='h1' inverted>humun</Header>
            <Form success error>
              {this.state.tokenErr &&
                <Message error>
                  <p>Your web token has expired. Return to dashboard to resend confirmation email. </p><a href="/dashboard">Dashboard</a>
                </Message>
              }
              {this.state.success &&
                <Message success>
                  <p>Email Confirmed. </p><a href="/dashboard">Return to Dashboard</a>
                </Message>
              }
            </Form>
          </Column>
        </Row>
      </Grid>
    );
  }
}

export default Review;
