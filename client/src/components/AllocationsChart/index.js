import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class AllocationsChart extends Component {
  constructor (props) {
    super(props);
    const allocations = Object.values(this.props.allocations);
    const donationsArray = allocations.map(charity => charity.portion.toFixed(1));
    const colorsArray = ['#F0EE92', '#89C229', '#B5E4FE', '#179BE8', '#30499E', '#FF6A5A', '#FFB325'];
    const labelsArray = allocations.map(charity => charity.name);

    this.state = {
      dataObject: {
        datasets: [{
          data: donationsArray,
          backgroundColor: colorsArray
        }],
        labels: labelsArray
      }
    };
  }

  render () {
    return (
      <div>
        <Doughnut width={100} height={400} data={this.state.dataObject} options={{ cutoutPercentage: '25', maintainAspectRatio: false }} />
      </div>
    );
  }
}

export default AllocationsChart;
