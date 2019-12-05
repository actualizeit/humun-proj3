import React from 'react';
import { Image, Header, Button, List, Segment } from 'semantic-ui-react';

function ThemeCard(props) {
  return (
    <div>
      <Segment style={{ marginTop: '1em', border: 'none' }} attached='top' raised inverted color='blue'>
        <Header as='h4' style={{ letterSpacing: '.5px' }}>
          <Image circular src={props.image} style={{ border: '2px solid black' }} /> {props.title}
        </Header>
      </Segment>
      <Segment attached='bottom' raised>
        <List>
          <List.Item>
            <List.Icon name='quote left' />
            <List.Content>{props.tagLine}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='marker' />
            <List.Content>{props.city}, {props.state}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='linkify' />
            <List.Content>
              <a href={props.link} target='_blank'>{props.link}</a>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='info circle' />
            <List.Content>
              {props.cause}
            </List.Content>
          </List.Item>
        </List>
        <Button basic color='blue' fluid>Select</Button>
      </Segment>
    </div>
  );
}

export default ThemeCard;
