import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decrementTimeAction, toggleDisableAction } from '../redux/actions';

class Timer extends React.Component {
  componentDidMount() {
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

  componentDidUpdate() {
    const { statePlayer: { timer } } = this.props;
    if (timer === 0) {
      clearInterval(this.interval);
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
