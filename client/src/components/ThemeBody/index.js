import React from 'react';
import { Grid } from 'semantic-ui-react';
const { Row, Column } = Grid;

function ThemeBody (props) {
  return (
    <Grid stackable columns={2} centered color='blue' style={{ paddingBottom: '2em' }}>
      <Row>
        <Column>
          {props.children}
        </Column>
      </Row>
    </Grid>
  );
}

export default ThemeBody;
