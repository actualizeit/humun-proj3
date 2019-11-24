import * as React from 'react';
import { Grid } from 'semantic-ui-react';
const { Row, Column } = Grid;

function ThemeSliderGroupContainer (props) {
  return (
    <Grid style={{ width: '100%' }} padded>
      <Row columns={1}>
        <Column>
          {props.children}
        </Column>
      </Row>
    </Grid>
  );
}

export default ThemeSliderGroupContainer;
