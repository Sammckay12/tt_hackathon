import React from 'react';
import ReactSwitch from 'react-switch';
import { util } from 'fm-demos-common';

const Switch = (props) => {
  return (
    <ReactSwitch {...props}/>
  );
};

Switch.defaultProps = {
  checkedIcon: false,
  uncheckedIcon: false,
  width: util.isIOS() ? 58 : 42,
  height: util.isIOS() ? 28 : 20,
  offColor: '#666',
  onColor: '#a2ba24',
  onHandleColor: '#eee',
  activeBoxShadow: null
};

export default Switch;
