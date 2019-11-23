import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Header, Segment, Icon, Grid, Button } from 'semantic-ui-react';
import ThemeBody from './../components/ThemeBody';
import API from './../utils/Api';
const { Row, Column } = Grid;

class Profile extends Component {
  constructor (props) {
    super(props);

    this.state = {
    };
  }

  render () {
    return (
      <div>
        <Grid textAlign='center'>
          <Row>
            <Column color='blue' className={css(styles.pt)}>
              <Header as='h6' className={css(styles.white)}>
              </Header>
            </Column>
          </Row>
        </Grid>
        <ThemeBody>
          <div>
            <Segment vertical>
              <Header as='h2' icon textAlign='center'>
                <Icon name='user' circular />
                <Header.Content>Jane Doe</Header.Content>
              </Header>
            </Segment>
            <Segment vertical>Member Since -Date-</Segment>
          </div>

          <Header as='h5' attached='top'>Impacts</Header>
          <Segment attached='bottom'>
            <p>Impacts Here</p>
          </Segment>

          <Header as='h5' attached='top'>Allocations</Header>
          <Segment attached='bottom'>
            <p>Allocations Here</p>
          </Segment>

          <Header as='h5' attached='top'>Donation History</Header>
          <Segment attached='bottom'>
            <p>Donations Here</p>
          </Segment>
          <Button fluid onClick={() => API.logout()}>Logout</Button>

        </ThemeBody>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  white: {
    color: 'white'
  },
  pt: {
    paddingTop: '2em'
  }
});

export default Profile;
