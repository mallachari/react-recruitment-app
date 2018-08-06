import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import enzyme from '../../../services/test/enzymeWithProviders';
import Search, { SEARCH_FORM } from './Search';

const mockProps = {
  classes: {
    searchbox: 'searchbox'
  }
};

const mockContext = {
  store: configureMockStore()({
    form: {
      [SEARCH_FORM]: {
        values: {
          search: 'test'
        }
      }
    }
  })
};

const childContextTypes = {
  store: PropTypes.object.isRequired
};

const getWrapper = props => (
  enzyme.mount(
    <Search {...props} />,
    { context: mockContext, childContextTypes })
);

describe(`${Search.name} component`, () => {
  it('renders without crashing', () => {
    const wrapper = getWrapper(mockProps);
    expect(wrapper.find('input.searchbox')).to.have.length(1);
  });

  it('renders with input value from store', () => {
    const wrapper = getWrapper(mockProps);
    expect(wrapper.find('input').props().value).to.equal('test');
  });

  it('renders with internationalized placeholder', () => {
    const wrapper = getWrapper(mockProps);
    expect(wrapper.find('input').props().placeholder).to.equal('Search');
  });
});
