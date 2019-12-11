import React from 'react';
import { Icon, Card, List, Divider } from 'semantic-ui-react';

function AllocationsCard (props) {
  let cardColor = '';
  let cardIcon = '';
  switch (props.charity.category) {
    case 'basicNeeds':
    case 'globalHealth':
    case 'education':
      cardColor = 'blue';
      cardIcon = 'users';
      break;
    case 'climateChange':
    case 'pollution':
    case 'habitat':
      cardColor = 'olive';
      cardIcon = 'envira';
      break;
    case 'userSelected':
      cardColor = 'orange';
      cardIcon = 'user';
      break;
    default:
      cardColor = 'grey';
      cardIcon = 'question';
      break;
  }

  return (
    <Card
      link
      key={props.charity.ein}
      color={cardColor}
      fluid
    >
      <Card.Content>
        <Card.Header>
          {props.charity.name}
          <Icon circular name={cardIcon} inverted color={cardColor} style={{ float: 'right' }} size='small' />
        </Card.Header>
        <Divider />
        <Card.Description>
          <List>
            <List.Item>
              <List.Icon name='quote left' />
              <List.Content>{props.charity.description}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='marker' />
              <List.Content>{props.charity.city}, {props.charity.state}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='external' />
              <List.Content>
                <a href={props.charity.link} target='_blank' rel="noopener noreferrer">{props.charity.link}</a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name='pie chart' />
              <List.Content>
                {props.charity.portion.toFixed(2)}%
              </List.Content>
            </List.Item>
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default AllocationsCard;
