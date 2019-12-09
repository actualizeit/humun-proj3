import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ThemeContainer from './../components/ThemeContainer';
import ThemeBody from './../components/ThemeBody';
import ThemeCard from './../components/ThemeCard';
import API from './../utils/Api';

class OrgMatches extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: false,
      redirectLoc: ''
    };
  }

  componentDidMount () {
    this.checkLogin();
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

            <ThemeCard image={'https://dummyimage.com/300/000/fff&text=logo'} title='Example Company'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repudiandae error? Optio quam vero corrupti asperiores ipsum amet voluptates facere! Consequuntur eveniet incidunt dicta vel recusandae ducimus eligendi modi nihil.
            </ThemeCard>
            <ThemeCard image={'https://dummyimage.com/300/000/fff&text=company'} title='Example Company 2'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repudiandae error? Optio quam vero corrupti asperiores ipsum amet voluptates facere! Consequuntur eveniet incidunt dicta vel recusandae ducimus eligendi modi nihil.
            </ThemeCard>
            <ThemeCard image={'https://dummyimage.com/300/000/fff&text=lorem'} title='Example Company 3'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, repudiandae error? Optio quam vero corrupti asperiores ipsum amet voluptates facere! Consequuntur eveniet incidunt dicta vel recusandae ducimus eligendi modi nihil.
            </ThemeCard>

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
