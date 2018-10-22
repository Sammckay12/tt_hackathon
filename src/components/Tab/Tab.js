import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Tab.css';

const Tab = ({label, active, onClick}) => {
  const classes = classnames(
    'TabButton',
    !active || 'active'
  );

  return (
    <div className={classes} onClick={onClick}>{label}</div>
  );
};

Tab.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func
};

export default Tab;
