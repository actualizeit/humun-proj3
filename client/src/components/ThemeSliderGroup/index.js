import React, { Component } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { Header } from 'semantic-ui-react';
import API from './../../utils/Api';

// min of 1 is important, if 0 min the sliders will fail when one bar hits 0
const step = 1;
const min = 1;

// dynamically creates state object
const createState = (arr, max) => {
  const obj = {};
  const num = max / arr.length;
  for (const x of arr) {
    obj[x] = [num];
  }
  return obj;
};

// takes user's settings and reinterprets them to set the sliders
const createInitialState = (user, arr, steps, min) => {
  const obj = {};
  for (const x of arr) {
    obj[x] = [Math.floor(((user[x] / 100) * steps) + min)];
  }
  const adjusted = exactCalc(obj, steps, min);
  return adjusted;
};

// makes sure final format is out of 100 for saving
const calculateNum = (result, steps) => {
  const num = ((result) / steps) * 100;
  return num;
};

// Sets decimals to two places
const fixNum = (num) => {
  return parseFloat(num.toFixed(2));
};

// creates object to send to parent - makes sure it exactly totals 100
const renderResults = (result, steps, cb) => {
  const obj = {};
  const keys = Object.keys(result);
  const testArr = [];

  for (const x of keys) {
    const num = cb(result[x][0], steps);
    obj[x] = fixNum(num);
    testArr.push(fixNum(num));
  }

  const test = testArr.reduce((acc, cur) => {
    return acc + cur;
  });

  // to ensure totals add up to exactly 100%
  const adjustment = fixNum(100 - test);
  const toAdjust = keys[0];

  // add difference onto first number
  obj[toAdjust] = fixNum(obj[toAdjust] + adjustment);

  return obj;
};

// adjusts totals to exactly equal steps + (keys.length * min)
const exactCalc = (obj, steps, min) => {
  const adjusted = { ...obj };
  const keys = Object.keys(obj);
  const values = keys.map((x) => obj[x][0]);
  const currentTotal = values.reduce((acc, cur) => acc + cur);
  const idealTotal = steps;
  const difference = idealTotal - currentTotal;
  const toChange = keys[0];
  adjusted[toChange] = [obj[toChange][0] + difference];
  for (const x of keys) {
    adjusted[x] = [adjusted[x][0] + min];
  }
  return adjusted;
}

// Adjusts other thumbs based on thumb being adjusted
const adjustThumbs = (key, value, state, max, min) => {
  const adjustedVal = value[0] - min;

  // declare return obj
  const obj = { [key]: [adjustedVal] };

  // get all sliders
  const keys = Object.keys(state);

  // how much of total remains
  const remaining = max - min - adjustedVal;

  // keys to be manipulated
  const filtered = keys.filter(x => x !== key);

  // values of other keys
  const otherValues = filtered.map(x => state[x][0]);

  // total of other keys
  const otherValuesTotal = otherValues.reduce((acc, cur) => acc + cur);

  // take proportion of specific key value * remaining of total.
  for (const x of filtered) {
    const num = Math.floor((state[x] / otherValuesTotal) * remaining) || 0;
    obj[x] = [num];
  }

  // adjusts totals to exactly equal steps + (keys.length * min)
  const adjusted = exactCalc(obj, max - min, min);
  return adjusted;
};

class ThemeSliderGroup extends Component {
  constructor (props) {
    super(props);

    // set default/initial state
    const { values, steps } = this.props;
    const state = createState(values, steps);
    this.state = {
      ...state
    };

    const forParent = renderResults(state, steps, calculateNum);

    // set initial slider states with parent
    this.props.stateHandler(this.props.stateKey, forParent);
  }

  componentDidMount () {
    // get user values
    const { values, steps } = this.props;
    API
      .get()
      .then(res => {
        const { profileData } = res.data.user;
        const userState = createInitialState(profileData, values, steps, min);
        this.setState(userState);
        const forParentWithData = renderResults(userState, steps, calculateNum);
        this.props.stateHandler(this.props.stateKey, forParentWithData);
      });
  }

  render () {
    const { values, steps, titles } = this.props;
    const max = min + steps;

    return (
      <div>
        {
          values.map((x, i) => {
            return (
              <div key={i} style={{ marginTop: '1.5em' }}>
                <Header sub>{titles[i]}</Header>
                <div key={i} style={{ ...styles.wrapper }}>
                  <Range
                    values={this.state[x]}
                    step={step}
                    min={min}
                    max={max}
                    // maintains local state
                    onChange={value => {
                      const obj = adjustThumbs(x, value, this.state, max, min);
                      this.setState(obj);
                    }}
                    // sends slider states back to parent
                    onFinalChange={() => {
                      const results = renderResults(this.state, steps, calculateNum);
                      this.props.stateHandler(this.props.stateKey, results);
                    }}
                    renderTrack={({ props, children }) => (
                      <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{ ...props.style, ...styles.rangeInner }}
                      >
                        <div
                          ref={props.ref}
                          style={{
                            ...styles.track,
                            background: getTrackBackground({
                              // updates background of track
                              values: this.state[x],
                              colors: ['#548BF4', '#ccc'],
                              min: min,
                              max: max
                            })
                          }}
                        >
                          {children}
                        </div>
                      </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                      <div
                        {...props}
                        style={{ ...props.style, ...styles.thumb }}
                      >
                        <div
                          style={{
                            ...styles.thumbInner,
                            backgroundColor: isDragged ? '#548BF4' : '#CCC'
                          }}
                        />
                      </div>
                    )}
                  />

                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  rangeInner: {
    height: '36px',
    display: 'flex',
    width: '100%'
  },
  track: {
    height: '5px',
    width: '100%',
    borderRadius: '4px',
    alignSelf: 'center'
  },
  thumb: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30px',
    width: '30px',
    borderRadius: '4px',
    backgroundColor: '#FFF',
    boxShadow: '0px 2px 6px #AAA'
  },
  thumbInner: {
    height: '16px',
    width: '5px'
  }
};

export default ThemeSliderGroup;
