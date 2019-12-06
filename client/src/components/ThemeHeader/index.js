import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
const { Row, Column } = Grid;

function ThemeHeader (props) {
  return (
    <Grid textAlign='center'>
      <Row>
        <Column style={styles.px}>
          <Header as='h2' disabled>
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
    background: '#f6f6f6',
    paddingTop: '3em',
    paddingBottom: '1em'
  }
};

export default ThemeHeader;
