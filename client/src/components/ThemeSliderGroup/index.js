import React, { Component } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { Header } from 'semantic-ui-react';

// dynamically creates state object
const createState = (arr, max) => {
  const obj = {};
  const num = max / arr.length;
  arr.map(x => {
    obj[x] = [num];
  });
  return obj;
};

const adjustThumbs = (key, value, state, max, min) => {
  // declare return obj
  const obj = { [key]: value };

  // get all sliders
  const keys = Object.keys(state);

  // how much of total remains
  const remaining = max - value + min;

  // keys to be manipulated
  const filtered = keys.filter(x => x !== key);

  // values of other keys
  const otherValues = filtered.map(x => state[x][0]);

  // total of other keys
  const otherValuesTotal = otherValues.reduce((acc, cur) => acc + cur);

  // take proportion of specific key value * remaining of total.
  for (const x of filtered) {
    obj[x] = [Math.floor((state[x] / otherValuesTotal) * remaining) + min];
  }

  return obj;
}

const createParentState = (state, min, max) => {
  const obj = state.map(x => {
    return (state[x][0] - min) / max;
  });
  return obj;
}

class ThemeSliderGroup extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  // depreciated, need to find alternative
  // this.props.values array is used to dynamically create states for each slider
  componentWillMount () {
    const { values, max } = this.props;
    const state = createState(values, max);

    // sets initial slider states
    this.setState(state);

    // set initial slider states with parent
    this.props.stateHandler(this.props.stateKey, state);
  }

  // alternative 1: getDerivedStateFromProps
  // notes: manages to set initial state and render page, but state does not change (sliders do not move):

  // static getDerivedStateFromProps (props, state) {
  //   const { values, max } = props;
  //   const initState = createState(values, max);
  //   return initState;
  // }

  // alternative 2: componentDidMount & async componentDidMount
  // doesn't work, page tries to render before states are dynamically created, page crashes

  // async componentWillMount () {
  //   const { values, max } = this.props;
  //   const state = createState(values, max);
  //   this.setState(state);
  // }

  render () {
    const { values, step, steps, titles } = this.props;

    // important if 0 the sliders will fail when one bar is maxed out
    const min = 1;
    const max = min + steps;

    return (
      <div>
        {
          values.map((x, i) => {
            return (
              <div key={i} style={{marginTop: '1.5em'}}>
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
                      this.props.stateHandler(this.props.stateKey, this.state);
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
