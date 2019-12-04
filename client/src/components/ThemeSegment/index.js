import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

function ThemeSegment (props) {
  return (
    <div>
      <Segment attached='top' textAlign='center' raised>
        <Header as='h5'>
          {props.title}
        </Header>
      </Segment>
      <Segment attached='bottom' secondary raised>
        {props.children}
      </Segment>
    </div>
  );
}

export default ThemeSegment;
