import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './TabPanel.css';

class TabPanel extends Component{

  onTabClick (index) {
    this.props.onChange && this.props.onChange(index);
  }

  render () {
    const { className, children, activeTab } = this.props;
    const classes = classnames(
      'TabPanel',
      className
    );
    return (
      <div className={classes}>
        <div className="TabPanel-bar">
        {children &&
          children.map((tab, index) => {
            return cloneElement(tab, {
              key: index,
              active: (index === activeTab),
              onClick: () => this.onTabClick(index)
            });
          })
        }
        </div>
        <div className="TabPanel-content">
          {children &&
            children[activeTab] !== undefined && children[activeTab].props.children
          }
        </div>
      </div>
    );
  }
}

TabPanel.propTypes = {
  className: PropTypes.string,
  activeTab: PropTypes.number,
  onChange: PropTypes.func
};

TabPanel.defaultProps = {
  activeTab: 0
};

export default TabPanel;
