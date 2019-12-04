import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
const { Row, Column } = Grid;

function ThemeHeader (props) {
  return (
    <Grid textAlign='center'>
      <Row>
        <Column color='blue' style={styles.px}>
          <Header as='h2' style={styles.white}>
            {props.text}
          </Header>
        </Column>
      </Row>
    </Grid>
  );
}

const styles = {
  white: {
    color: 'white'
  },
  px: {
    paddingTop: '3em',
    paddingBottom: '2em'
  }
};

export default ThemeHeader;
