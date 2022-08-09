import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { activateNextButtonAction,
  decrementTimeAction, toggleDisableAction } from '../redux/actions';

class Timer extends React.Component {
  componentDidUpdate() {
    const { statePlayer: { timer } } = this.props;
    const MAX_TIMER = 30;
    if (timer === 0) {
      clearInterval(this.interval);
    }
    if (timer === MAX_TIMER) {
      const MAX_INTERVAL = 99999;
      const intervalId = window.setInterval(() => {}, MAX_INTERVAL);
      for (let number = 0; number < intervalId; number += 1) {
        window.clearInterval(number);
      }
      const ONE_SECOND = 1000;
      const THIRTY_SECONDS = 30000;
      const { decrementTime, disableButtons } = this.props;
      this.interval = setInterval(() => {
        decrementTime();
      }, ONE_SECOND);

      this.timeOut = setTimeout(() => {
        disableButtons();
      }, THIRTY_SECONDS);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.timeOut);
  }

  render() {
    const { statePlayer: { timer } } = this.props;
    return (
      <div>
        {timer}
      </div>
    );
  }
}

Timer.propTypes = ({
  decrementTime: PropTypes.func,
  disableButtons: PropTypes.func,
  statePlayer: PropTypes.any,
}).isRequired;

const mapStateToProps = (state) => ({
  statePlayer: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  decrementTime: () => dispatch(decrementTimeAction()),
  disableButtons: () => dispatch(toggleDisableAction()),
  activateNextButton: () => dispatch(activateNextButtonAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
