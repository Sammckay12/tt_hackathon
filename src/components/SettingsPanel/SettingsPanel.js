import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Search from '../Search/Search';
import { InputLabel, Input, DatePicker } from 'legoland-ui';
import UserCarousel from '../UserCarousel/UserCarousel';
import users from '../../data/users';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './SettingsPanel.css';

class SettingsPanel extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      startTime: moment(),
      user: {...this.props.user},
      selectedUserIndex: this.props.selectedUserIndex,
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(this.props.user, nextProps.user) || this.props.selectedUserIndex !== nextProps.selectedUserIndex) {
      this.setState({user: {...nextProps.user}, selectedUserIndex: nextProps.selectedUserIndex});
    }
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleTimeChange(time) {
    this.setState({
      startTime: time
    });
  }

  render () {
    const { user, selectedUserIndex } = this.state;
    const {
      destination,
      onLocationSelect,
      onUserChange,
      onSearchClear
    } = this.props;

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
           onChange={onUserChange}
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
            <DatePicker
              timeIntervals={15}
              dateFormat="LT"
              timeCaption="Time"
              showTimeSelect
              showTimeSelectOnly
              selected={this.state.startTime}
              onChange={this.handleTimeChange}
            />
            {/*  <Input
               type="string"
               step="1"
               name="userWeight"
//               value={userWeight}
               onChange={this.onFieldChange}
               /> */}
          </div>
          <div className="mb-20">
            <InputLabel>
              Day
            </InputLabel>
            <DatePicker
              dateFormat="DD/MM/YYYY"
              selected={this.state.startDate}
              onChange={this.handleDateChange}
            />
          {/*  <Input
               type="string"
               name="currentChargeInkWh"
               value={currentChargeInkWh}
               onChange={this.onFieldChange}
               /> */}
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
        ></div>
        <div className="search-section">
          <h1>Set location</h1>
          <div>
            <Search
              value={destination ? destination.address.freeformAddress : ''}
              searchFn={this.onSearch}
              onSelect={onLocationSelect}
              onClear={onSearchClear}
              />
          </div>
        </div>
      </div>
    );
  }

  // onUserChange = (index) => {
  //   this.setState({selectedUserIndex: index, user: users[index]});
  // }

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

  createDateTimeString = () => {
    const { startDate, startTime } = this.state;
    let date = startDate.format('YYYY-MM-DD')
    let time = startTime.format('hh:mm:ss')

    return date + 'T' + time
  }



  onApply = () => {
    const { user, selectedUserIndex } = this.state;
    // console.log('user', user);
    let dayTimeString = this.createDateTimeString();
    this.props.predictRoutes(dayTimeString)
    // user.coordinates = this.props.user.coordinates;
    //
    // this.props.onUserChange(user, selectedUserIndex);
    // this.props.onBack();
  }

  onDefaultSettings = () => {
    const user = users[this.state.selectedUserIndex];
    this.setState({user});
  }

  onSearch = (query) => {
    return this.props.searchFn(query)
      .catch(e => {
        console.log(e.message);
      });
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
  searchFn: PropTypes.func.isRequired,
  onLocationSelect: PropTypes.func,
  onActiveRouteChange: PropTypes.func,
  onSearchClear: PropTypes.func,
  onUserChange: PropTypes.func.isRequired
};

export default SettingsPanel;
