import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
const { Row, Column } = Grid;

function Splash () {
  return (
    <Grid verticalAlign="middle" centered stackable columns={3} style={{ height: '100vh' }}>
      <Row color='blue'>
        <Column textAlign='center'>
          <Header as='h1' inverted>humun</Header>
          <p>Humun is an app that empowers you to contribute in the most effective ways to the causes you care about, and makes it easier than ever to maintain and enhance your positive impact over time.</p>
          <p><Button inverted fluid href='/create'>Create an Account</Button></p>
          <p><Button basic fluid inverted href='/login'>Login</Button></p>
          <p><Button basic fluid inverted href='/reset'>Reset Password</Button></p>
        </Column>
      </Row>
    </Grid>
  );
}

export default Splash;
