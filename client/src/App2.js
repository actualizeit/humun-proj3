import React, { Component } from "react";
import { Grid, Container, Menu, Image } from 'semantic-ui-react';
import SelectedFoods from "./components/SelectedFoods";
import FoodSearch from "./components/FoodSearch";
import logo from "./assets/images/logo.png";
import API from "./utils/Api";
import Cookies from 'universal-cookie';
const cookies = new Cookies();



const fixedMenuStyle = {
  backgroundColor: '#ececec',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
};

class App extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    email2: "",
    password3: ""
  };

  componentDidMount() {
    console.log(cookies.get('jwt'));
  }
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  register = event => {
    event.preventDefault();
    let { name, email, password, password2 } = this.state;
    console.log(name, email, password, password2);
    API.register({ name, email, password, password2 })
      .then(res => {
        if (res.data.errors) {
          console.log(res.data.errors)
        } else if(res.data.success){
          console.log(res.data)
        } else {
          console.log(res.data)
        }
      })
      .catch(err => console.log(err));
  }

  login = event => {
    event.preventDefault();
    let { email2, password3 } = this.state;
    API.login({
      email: email2,
      password: password3
    })
      .then(res => {
        cookies.set('jwt', res.data.token, { path: '/' });
        
        console.log(res)
      })
  }

  jwtCheck = event => {
    event.preventDefault();
    API.test().then(res => {
      if (res.data.success) {
        console.log(res);
      }
    });
  }

  logOut = event => {
    event.preventDefault();
    cookies.set('jwt', '', { path: '/' });
  }


  render() {
    const { selectedFoods } = this.state;

    return (
      <div style={{ padding: '1.2em' }}>
         <form action="/users/register" method="POST">
        <div className="form-group">
          <label for="name">Name</label>
          <input
            type="name"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter Name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter Email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Create Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label for="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            className="form-control"
            placeholder="Confirm Password"
            value={this.state.password2}
            onChange={this.handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block" onClick={this.register}>
          Register
        </button>
      </form>


      <form action="/users/register" method="POST">
        <div className="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email2"
            className="form-control"
            placeholder="Enter Email"
            value={this.state.email2}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password3"
            className="form-control"
            placeholder="Create Password"
            value={this.state.password3}
            onChange={this.handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block" onClick={this.login}>
          Login
        </button>
        <button type="submit" className="btn btn-primary btn-block" onClick={this.jwtCheck}>
          jwt test
        </button>
        <button type="submit" className="btn btn-primary btn-block" onClick={this.logOut}>
          Log Out
        </button>
      </form>
        
      </div>
    );
  }
}

export default App;
