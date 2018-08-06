import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import Header from './Header';
import enzymeIntl from '../../../services/test/enzymeWithProviders';

const mockProps = {
  classes: {
    appBar: 'appBar',
    actionButtons: 'actionButtons',
    appLogo: 'appLogo',
    headline: 'headline',
    logoIcon: 'logoIcon',
    icon: 'icon'
  },
  location: {
    pathname: '/retro'
  },
  openChangeNameDialog: () => {},
  leaveRetro: () => {}
};

const mockContext = {
  socket: {},
  store: configureMockStore()({
    retro: {}
  })
};

const childContextTypes = {
  socket: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

describe(`${Header.name} component`, () => {
  it('renders without crashing', () => {
    const wrapper = enzymeIntl.shallow(
      <Header {...mockProps} isOpen>
        <div className="test">Test</div>
      </Header>);

    expect(wrapper.find('div.test'), 'div.test').to.have.length(1);
  });

  it('renders search component for /retro route', () => {
    const wrapper = enzymeIntl.mount(
      <BrowserRouter>
        <Header {...mockProps} isOpen>
          <div className="test">Test</div>
        </Header>
      </BrowserRouter>,
      { context: mockContext, childContextTypes });

    expect(wrapper.find('Search')).to.have.length(1);
  });

  it('does not render search component for other routes than /retro', () => {
    const props = {
      ...mockProps,
      location: {
        pathname: '/other'
      }
    };
    const wrapper = enzymeIntl.mount(
      <BrowserRouter>
        <Header {...props} isOpen>
          <div className="test">Test</div>
        </Header>
      </BrowserRouter>,
      { context: mockContext, childContextTypes });

    expect(wrapper.find('Search')).to.have.length(0);
  });
});
