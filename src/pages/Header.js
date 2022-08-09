import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
    state = {
      imgSRC: '',
    }

    componentDidMount() {
      this.gravatar();
    }

    gravatar = async () => {
      const { gravatarEmail } = this.props;
      const hash = md5(gravatarEmail).toString();
      const requisicao = `https://www.gravatar.com/avatar/${hash}`;

      const result = await fetch(hash);
      console.log(result.url);
      this.setState({ imgSRC: requisicao });
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

export default connect(mapStateToProps)(Header);
