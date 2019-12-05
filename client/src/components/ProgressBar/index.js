import React from 'react';
import Grid from 'semantic-ui-react';
const { Row, Column } = Grid;

function ProgressBar(props) {

  const generateColumns = (total) => {
    const arr = [];
    for (let i = 0; i < total; i++) {
      arr.push(i);
    }
    return arr;
  };

  const columns = generateColumns(props.total);

  return (
    <Grid columns={props.total}>
      <Row>
          {
            columns.map((x, i) => {
              return i <= props.step ? <Column color='blue' /> : <Column />
            });
          }
      </Row>
    </Grid>
  );
}

export default ProgressBar;