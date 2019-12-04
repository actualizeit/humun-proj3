import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

function ThemeSegment (props) {
  return (
    <div>
      <Segment attached='top' textAlign='center' color='blue' style={{ border: 'none' }} inverted raised>
        <Header as='h5' style={{ letterSpacing: '.5px' }}>
          {props.title}
        </Header>
      </Segment>
      <Segment attached='bottom' raised>
        {props.children}
      </Segment>
    </div>
  );
}

export default ThemeSegment;
