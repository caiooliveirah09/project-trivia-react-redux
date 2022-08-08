import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { saveInfosAction, fetchToken } from '../redux/actions';

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

  saveInfos = async () => {
    const { saveInfosDispatch, fetchTokenDispatch,
      history: { push } } = this.props;
    const { name, gravatarEmail } = this.state;

    saveInfosDispatch(name, gravatarEmail);
    const { token } = await fetchTokenDispatch();
    localStorage.setItem('token', token);
    push('/game');
  }

  toSettings = () => {
    const { history: { push } } = this.props;
    push('/configuracoes');
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
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.toSettings }
        >
          Configurações
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveInfosDispatch: (name, email) => dispatch(saveInfosAction(name, email)),
  fetchTokenDispatch: () => dispatch(fetchToken()),
});

const mapStateToProps = (state) => ({
  token: state.player.token,
  isFetch: state.player.isFetch,
});

Login.propTypes = {
  saveInfosDispatch: propTypes.func,
  fetchTokenDispatch: propTypes.func,
  push: propTypes.func,
  token: propTypes.string,
  isFetch: propTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
