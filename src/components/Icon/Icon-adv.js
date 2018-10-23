import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Icon.css';

class Icon extends Component {

  
  constructor (props) {
    super(props);

    this.state = {
      src: "/static/media/emma.bc3f2370.png",
    };
  }

    componentWillReceiveProps = (nextProps) => {
      console.log("this.props.src", this.props.src)
      console.log("nextProps.src", nextProps.src)
      if (nextProps) {
        this.setState({src: this.props.src})
      }
    }

  render() {
    console.log("src state", this.state.src)
    const {
      size,
      shadow
    } = this.props;

    const classes = classnames(
      'Icon',
      !shadow || 'shadow'
    );
    const style = {
      width: size,
      height: size,
      backgroundImage: `url(${this.props.src})`
    };
    return (
      <div className={classes} style={style}></div>
    );
  }
}

Icon.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  src: PropTypes.string,
  shadow: PropTypes.bool
};

Icon.defaultProps = {
  size: 48
};

export default Icon;
