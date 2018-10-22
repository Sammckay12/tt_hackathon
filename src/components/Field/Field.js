import React from 'react';
import classnames from 'classnames';

import './Field.css';

const Field = ({className, label, children}) => {
  const classes = classnames(
    'Field',
    !className || className
  );

  return (
    <div className={classes}>
      <div className="Field-label">{label}</div>
      <div className="Field-content">
        {children}
      </div>
    </div>
  );
};

export default Field;
