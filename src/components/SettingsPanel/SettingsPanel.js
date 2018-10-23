import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { InputLabel, Input } from 'legoland-ui';
import UserCarousel from '../UserCarousel/UserCarousel';
import users from '../../data/users';

import 'pure-react-carousel/dist/react-carousel.es.css';
import './SettingsPanel.css';

class SettingsPanel extends Component {

  state = {
    user: {...this.props.user},
    selectedUserIndex: this.props.selectedUserIndex
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(this.props.user, nextProps.user) || this.props.selectedUserIndex !== nextProps.selectedUserIndex) {
      this.setState({user: {...nextProps.user}, selectedUserIndex: nextProps.selectedUserIndex});
    }
  }

  render () {
    const { user, selectedUserIndex } = this.state;

    return (
      <div className="SettingsPanel">
        <div className="SettingsPanel-header">
          {/* <button
             className="SettingsPanel-back-button"
             onClick={this.onBack}
             >
            <BackIcon/>
          </button> */}
          <div className="SettingsPanel-title">{user.name}</div>
        </div>
        <UserCarousel
           users={users}
           currentSlide={selectedUserIndex}
           onChange={this.onUserChange}
           />
        <form ref={node => this.form = node} action="" onSubmit={this.onSubmit}>
          {/* Hidden submit button to enable 'Go' button to submit form under iOS */}
          <Input
             type="submit"
             style={{visibility: 'hidden', position: 'absolute'}}
             />
          <div className="mb-20">
            <InputLabel>
              Time
            </InputLabel>
            <Input
               type="string"
               step="1"
               name="userWeight"
//               value={userWeight}
               onChange={this.onFieldChange}
               />
          </div>
          <div className="mb-20">
            <InputLabel>
              Day
            </InputLabel>
            <Input
               type="string"
               name="currentChargeInkWh"
//               value={currentChargeInkWh}
               onChange={this.onFieldChange}
               />
          </div>
        </form>
        <div className="SettingsPanel-button-bar flex-horizontal flex-flex-end">
          {/* <button
             className="button-ev button-ev-ghost"
             onClick={this.onDefaultSettings}
             >
            <span>Default Settings</span>
          </button> */}
          <button
             className="button-ev button-ev-ghost"
             style={{marginLeft: 10}}
             onClick={this.onApply}
             >
            <span>Apply</span>
          </button>
        </div>
      </div>
    );
  }

  onUserChange = (index) => {
    this.setState({selectedUserIndex: index, user: users[index]});
  }

  onSubmit = (e) => {
    e.preventDefault();
    document.activeElement.blur();
    this.onApply();
  }

  onFieldChange = (e) => {
    const user = {...this.state.user};
    let { target: { value }} = e;
    value = isNaN(value) ? value : parseFloat(value);
    this.setState({user});
  }

  onApply = () => {
    const { user, selectedUserIndex } = this.state;

    user.coordinates = this.props.user.coordinates;

    this.props.onUserChange(user, selectedUserIndex);
    this.props.onBack();
  }

  onDefaultSettings = () => {
    const user = users[this.state.selectedUserIndex];
    this.setState({user});
  }

  onBack = () => {
    this.setState(
      {user: this.props.user, selectedUserIndex: this.props.selectedUserIndex},
      () => this.props.onBack()
    );
  }
}

SettingsPanel.propTypes = {
  user: PropTypes.object.isRequired,
  selectedUserIndex: PropTypes.number,
  onBack: PropTypes.func.isRequired,
  onUserChange: PropTypes.func.isRequired
};

export default SettingsPanel;
