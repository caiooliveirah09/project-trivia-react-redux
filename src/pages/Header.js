import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { getImage } from '../redux/actions';

class Header extends React.Component {
    state = {
      imgSRC: '',
    }

    componentDidMount() {
      this.gravatar();
    }

    gravatar = () => {
      const { gravatarEmail, getImageDispatch } = this.props;
      const hash = md5(gravatarEmail).toString();
      const requisicao = `https://www.gravatar.com/avatar/${hash}`;
      this.setState({ imgSRC: requisicao });
      getImageDispatch(requisicao);
    }

    render() {
      const { imgSRC } = this.state;
      const { name, score } = this.props;
      return (
        <header>
          <img
            src={ imgSRC }
            alt="imageFromGravatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{score}</p>
        </header>
      );
    }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.player,
});

const mapDispatchToProps = (dispatch) => ({
  getImageDispatch: (payload) => dispatch(getImage(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
