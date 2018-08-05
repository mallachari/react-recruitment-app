import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import styles from './../../../components/Retro/Search/Search.styles';
import Search from './../../../components/Retro/Search/Search';

export const SEARCH_FORM = 'searchForm';

const formSelector = formValueSelector(SEARCH_FORM);

const mapStateToProps = state => ({
  search: formSelector(state, 'search') || ''
});

export default withStyles(styles)(
  connect(mapStateToProps)(
    reduxForm({
      form: SEARCH_FORM,
      initialValues: {
        search: ''
      }
    })(Search)
  )
);
