import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import enzyme from '../../../services/test/enzymeWithProviders';
import Download from './Download';
import {
  retroStartDownload,
  retroStopDownload,
  RETRO_START_DOWNLOAD,
  RETRO_STOP_DOWNLOAD
} from '../../../actions/retro';


const mockStore = configureMockStore([thunk]);

const mockContext = {
  store: mockStore({
    retro: {
      name: 'test',
      columns: [],
      cards: [],
      download: false
    }
  })
};

const childContextTypes = {
  store: PropTypes.object.isRequired
};

const getWrapper = context => (
  enzyme.mount(
    <Download />,
    { context, childContextTypes })
);

describe(`${Download.name} container`, () => {
  it('renders without crashing', () => {
    const wrapper = getWrapper(mockContext);

    expect(wrapper.find('Tooltip')).to.have.length(1);
    expect(wrapper.find('ConfirmDialog')).to.have.length(1);
  });

  it('renders download CSVDomponent when download is started', () => {
    const context = {
      store: mockStore({
        retro: { name: 'test', columns: [], cards: [], download: true }
      })
    };
    const wrapper = getWrapper(context);

    expect(wrapper.find('CSVDownload')).to.have.length(1);
  });

  it('does not render download CSVDomponent when download is stopped', () => {
    const wrapper = getWrapper(mockContext);

    expect(wrapper.find('CSVDownload')).to.have.length(0);
  });

  it('should dispatch start download and stop download action', () => {
    const store = mockStore({});

    store.dispatch(retroStartDownload());
    store.dispatch(retroStopDownload());

    const actions = store.getActions();
    const expectedPayload = [{ type: RETRO_START_DOWNLOAD }, { type: RETRO_STOP_DOWNLOAD }];
    expect(actions).to.deep.equal(expectedPayload);
  });
});
