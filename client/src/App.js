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

const fixedMenuStyle = {
  backgroundColor: '#ececec',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
};

class App extends Component {
  state = {
    selectedFoods: []
  };

  removeFoodItem = itemIndex => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx
    );
    this.setState({ selectedFoods: filteredFoods });
  };

  addFood = food => {
    const newFoods = this.state.selectedFoods.concat(food);
    this.setState({ selectedFoods: newFoods });
  };

  render() {
    const { selectedFoods } = this.state;

    return (

      <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route exact path="/login" component={Login} />
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

      // <div style={{ padding: '1.2em' }}>
        
      //   <Menu borderless fixed="top" style={fixedMenuStyle}>
      //     <Container fluid>
      //       <Menu.Item>
      //         <Image size="mini" src={logo} />
      //       </Menu.Item>
      //       <Menu.Item header style={{ fontSize: 22 }}>Food Lookup Demo</Menu.Item>
      //     </Container>
      //   </Menu>

      //   <Container fluid style={{ marginTop: '4.6em' }}>
      //     <Grid divided="vertically">
      //       <Grid.Row columns="2">
      //         <Grid.Column>
      //           <FoodSearch onFoodClick={this.addFood} />
      //         </Grid.Column>
      //         <Grid.Column>
      //           <SelectedFoods foods={selectedFoods} onFoodClick={this.removeFoodItem} />
      //         </Grid.Column>
      //       </Grid.Row>
      //     </Grid>
      //   </Container>
      // </div>
    );
  }
}

export default App;
