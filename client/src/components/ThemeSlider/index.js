import * as React from 'react';
import { Range, getTrackBackground } from 'react-range';
import { Grid, Icon, Header } from 'semantic-ui-react';
const { Row, Column } = Grid;

const STEP = 1;
const MIN = 0;
const MAX = 6;

class ThemeSlider extends React.Component {
  render () {
    return (
      <Grid style={{ width: '100%' }} padded>
        <Row columns={1}>
          <Column>
            <div style={{ ...styles.wrapper }}>
              <Range
                values={this.props.value}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={values => this.props.stateHandler(this.props.stateKey, values)}
                // onFinalChange={values => this.props.stateHandler(this.props.stateKey, values)}
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
                          values: this.props.value,
                          colors: ['#548BF4', '#ccc'],
                          min: MIN,
                          max: MAX
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
          </Column>

        </Row>
        <Row columns={3} style={{ paddingTop: '0' }}>
          <Column>
            <Header as='h6' style={{ textTransform: 'uppercase' }} disabled>
              {this.props.leftLabel}
            </Header>
          </Column>
          <Column textAlign='center'>
            <Header as='h6' style={{ textTransform: 'uppercase' }} disabled>
              <Icon style={{ marginLeft: '9px' }} name='caret up' />
            </Header>
          </Column>
          <Column textAlign='right'>
            <Header as='h6' style={{ textTransform: 'uppercase' }} disabled>
              {this.props.rightLabel}
            </Header>
          </Column>
        </Row>
      </Grid>
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

export default ThemeSlider;
