import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

const Search = ({ classes }) => (
  <FormattedMessage id="retro.search-form-placeholder">
    { msg => (
      <Field
        className={classes.searchbox}
        name="search"
        component="input"
        margin="dense"
        placeholder={msg}
      />
    )}
  </FormattedMessage>
);

export default Search;

Search.propTypes = {
  // Values
  // Styles
  classes: PropTypes.shape({
    searchbox: PropTypes.string.isRequired
  }).isRequired
};
