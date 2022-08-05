import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { saveInfosAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    gravatarEmail: '',
    disabled: true,
  }

  handleChange = ({ target: { name, value } }) => this.setState(
    { [name]: value },
    this.infoValidation,
  );

  infoValidation = () => {
    const { name, gravatarEmail } = this.state;

    if (name.length > 0
      && gravatarEmail.includes('@' && '.com')
    ) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  saveInfos = () => {
    const { saveInfosDispatch } = this.props;
    const { name, gravatarEmail } = this.state;

    saveInfosDispatch(name, gravatarEmail);
  }

  render() {
    const { name, gravatarEmail, disabled } = this.state;
    return (
      <form>
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          value={ name }
          placeholder="Name"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="input-gravatar-email"
          name="gravatarEmail"
          value={ gravatarEmail }
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.saveInfos }
          disabled={ disabled }
        >
          Play
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveInfosDispatch: (name, email) => dispatch(saveInfosAction(name, email)),
});

Login.propTypes = {
  saveInfosDispatch: propTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
