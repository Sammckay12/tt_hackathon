import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SlideInOut from '../../transitions/SlideInOut';
import SettingsPanel from '../SettingsPanel/SettingsPanel';

import './Sidebar.css';

class Sidebar extends Component {

  render () {
    const {
      activePanel,
      user,
      selectedUserIndex,
      onUserChange
    } = this.props;

    return (
      <div className="Sidebar">
        <SlideInOut in={activePanel === 'settings'}>
          <SettingsPanel
             user={user}
             selectedUserIndex={selectedUserIndex}
             onBack={this.onBack}
             onUserChange={onUserChange}
             />
        </SlideInOut>
      </div>
    );
  }

  onBack = () => {
    this.props.onActivePanelChange('user');
  }

  onSettings = () => {
    this.props.onActivePanelChange('settings');
  }
}

Sidebar.propTypes = {
  defaultConsumptionModel: PropTypes.object,
  activePanel: PropTypes.string,
  user: PropTypes.object,
  selectedUserIndex: PropTypes.number,
  destination: PropTypes.object,
  routes: PropTypes.object,
  chargingpark: PropTypes.object,
  activeRoute: PropTypes.string,
  errorMessage: PropTypes.string,
  searchFn: PropTypes.func.isRequired,
  onDestinationSelect: PropTypes.func,
  onActiveRouteChange: PropTypes.func,
  onSearchClear: PropTypes.func,
  onUserChange: PropTypes.func,
  onActivePanelChange: PropTypes.func
};

export default Sidebar;
