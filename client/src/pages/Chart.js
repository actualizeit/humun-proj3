import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import API from './../utils/Api';

let donationObject = [
  {
    name: 'SaveTheSeaLions',
    donationAmount: 25
  },
  {
    name: 'NoCancerHere',
    donationAmount: 40
  },
  {
    name: 'Habitat4Humans',
    donationAmount: 20
  }
];
let donationsArray = [];
let colorArray = ['gray', 'black', 'lightgrey', 'green', 'blue', 'indigo'];
let colorArray2 = [];
let labelArray = [];

donationObject.forEach((charity, i) => {
  colorArray2.push(colorArray[i]);
  donationsArray.push(charity.donationAmount);
  labelArray.push(charity.name);
});

let dataObject = {
  datasets: [{
    data: donationsArray,
    backgroundColor: colorArray2
  }],
  labels: labelArray
};

class Chart extends Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  componentDidMount () {
    API
      .get()
      .then(res => {
        console.log(res.data);
        this.setState({
          userInfo: res.data.user
        });
      })
      .catch(err => console.log(err));
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/matches' />;
    }
  }

  render () {
    return (
      <div>
        <Doughnut data={dataObject} />
      </div>
    );
  }
}

export default Chart;
