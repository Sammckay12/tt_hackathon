import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './Search.css';

class Search extends Component {

  constructor (props) {
    super(props);

    this.state = {
      query: '',
      searchResults: null
    };
  }

  render () {
    const { value, placeholder } = this.props;
    const { query, searchResults } = this.state;
    const showClearButton = !_.isEmpty(query) || !_.isEmpty(value);

    return (
      <div>
        <div className="Search">
          <span className="fa fa-search"></span>
          <input
             className="Search-input"
             value={query || value}
             placeholder={placeholder}
             onChange={this.onChange}
             ref={node => this.input = node}
             />
          {showClearButton && (
            <button className="Search-clear" onClick={this.onClear}>+</button>
          )}
        </div>
        {searchResults && this.renderSearchResults()}
      </div>
    );
  }

  renderSearchResults () {
    const { searchResults } = this.state;
    const searchRows = searchResults.map((result, i) => {
      return (
        <div
          key={`search-result-${i}`}
          className="Search-result"
          onMouseDown={() => this.onSelect(result)}
        >
          {result.address.freeformAddress}
        </div>
      );
    });

    return (
      <div
         className="Search-results"
      >
        {searchRows}
      </div>
    );
  }

  search (query) {
    const { searchFn } = this.props;

    if (searchFn && query) {
      return searchFn(query)
        .then(response => {
          if (this.state.query) { // input may have been cleared after request was invoked
            this.setState({
              searchResults: response
            });
          }
        });
    }
    return null;
  }

  onChange = (e) => {
    const { value } = e.target;
    const searchResults = value.length ? this.state.searchResults : null;
    this.setState({query: value, searchResults});
    this.search(value);
  }

  onClear = () => {
    this.setState({query: '', searchResults: null});
    this.input.focus();
    this.props.onClear && this.props.onClear();
  }

  onSelect = (result) => {
    this.props.onSelect && this.props.onSelect(result);
    this.setState({query: '', searchResults: null});
  }
}

Search.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  searchFn: PropTypes.func,
  onSelect: PropTypes.func,
  onClear: PropTypes.func
};

Search.defaultProps = {
  placeholder: 'Search'
};

export default Search;
