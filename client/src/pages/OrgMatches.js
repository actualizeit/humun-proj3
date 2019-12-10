import React, { Component } from 'react';
import { Input, Button, Message, Modal, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeContainer from './../components/ThemeContainer';
import ThemeBody from './../components/ThemeBody';
import ThemeCard from './../components/ThemeCard';
import API from './../utils/Api';

let allocations = [];

class OrgMatches extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: false,
      redirectLoc: '',
      isLoaded: false
    };
  }

  componentDidMount () {
    this.checkLogin();
    API.allocation()
      .then(res => {
        allocations = Object.values(res.data.user.allocations);
        console.log('allocations: ', allocations);
        this.setState({
          isLoaded: true
        });
      });
  }

  checkLogin () {
    API.test()
      .then(res => {
        console.log('loggedin');
      })
      .catch(() => {
        this.setState({ splashRedirect: true });
      });
  }

    handleOrgMatches = (redirect) => {
      // if OrgMatches is approved redirect to matches page
      this.setRedirect(redirect);
    }

    setRedirect = (redirect) => {
      this.setState({
        redirect: true,
        redirectLoc: redirect
      });
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to={this.state.redirectLoc} />;
      }
    }

    render () {
      if (this.state.splashRedirect) {
        return <Redirect push to="/" />;
      }
      return (
        <div>
          { this.renderRedirect() }
          <ThemeContainer text='Congratulations!' />
          <ThemeBody>
            <Header as='h4' textAlign='center'>
                        We’ve matched you to these organizations:
            </Header>
            {/* Map through all of charities in the state and display them onto the page */}
            <div>
              {this.state.isLoaded &&
            allocations.map(charity => (
              <div key={charity.ein}>
                <ThemeCard
                  title={charity.name}
                  link={charity.link}
                  tagLine={charity.description}
                  EIN={charity.ein}
                  cause={charity.category}
                  city={charity.charityCity}
                  state={charity.charityState}
                  portion={charity.portion.toFixed(1) + '%' }
                >
                </ThemeCard>
              </div>
            ))
              }
            </div>
            <Header as='h4' textAlign='center'>
                        You can donate one time to this basket of causes now, save your Dashboard and donate later, or you can set up a recurring donation to support these causes over time.
            </Header>
            <Header as='h4' textAlign='center'>
                        In all cases Humun will adjust the target organizations as data becomes available and you can update your contribution Dashboard at any time.
            </Header>

            <Button onClick={() => this.handleOrgMatches('/dashboard')} primary fluid>To Dashboard</Button>
          </ThemeBody>
        </div>
      );
    }
}

export default OrgMatches;
