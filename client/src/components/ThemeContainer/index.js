import React, { useState } from 'react';
import { Grid, Header, Menu, Icon, Segment, Sidebar } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import API from '../../utils/Api';
const { Row, Column } = Grid;

function LogoutRedirect () {
  return <Redirect push to="/" />;
}

function ThemeContainer (props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const logout = () => {
    API.logout();
    setRedirect(true);
  };

  return (
    <>
      {redirect && <LogoutRedirect />}

      <Sidebar.Pushable as={Segment} style={{ borderRadius: '0' }}>
        <Sidebar
          as={Menu}
          animation='uncover'
          icon='labeled'
          inverted
          onHide={() => setMenuOpen(false)}
          vertical
          visible={menuOpen}
          direction='right'
          width='thin'
        >
          <Menu.Item as='a' href='/dashboard'>
              Dashboard
          </Menu.Item>
          <Menu.Item as='a' onClick={logout}>
            Sign Out
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher style={{ minHeight: '100vh', backgroundColor: '#f6f6f6' }}>
          <Grid>
            <Row>
              <Column>
                <Menu fixed='top'>
                  <Menu.Item>
                    <Link to='/'><Header as='h3'>humun</Header></Link>
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => setMenuOpen(true)}
                    position='right'
                  >
                    <Icon name='bars' />
                    <span style={styles.srOnly}>Menu</span>
                  </Menu.Item>
                </Menu>
              </Column>
            </Row>
            {props.text &&
              <Row>
                <Column style={styles.px}>
                  <Header as='h2' textAlign='center' disabled>
                    {props.text}
                  </Header>
                </Column>
              </Row>
            }
          </Grid>
          {props.children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
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
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: '0'
  }
};

export default ThemeContainer;
