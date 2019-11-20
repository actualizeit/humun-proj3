import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Causes from "./pages/Causes";
import CreateAccount from "./pages/CreateAccount";
import Donation from "./pages/Donation";
import Impact from "./pages/Impact";
import Login from "./pages/Login";
import OrgMatches from "./pages/OrgMatches";
import Profile from "./pages/Profile";
import Review from "./pages/Review";
import Splash from "./pages/Splash";
import NoMatch from "./pages/NoMatch";

class App extends Component {
  state = {
    auth: false
    // include auth state
  };

  authHandler = () => {
    console.log('clicked');
    // set logged in state
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Splash} />
            <Route exact path="/login">
              <Login authHandler={this.authHandler} />
            </Route>
            
            <Route exact path="/create" component={CreateAccount} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/impact" component={Impact} />
            <Route exact path="/donation" component={Donation} />
            <Route exact path="/matches" component={OrgMatches} />
            <Route exact path="/review" component={Review} />
            <Route exact path="/causes" component={Causes} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
