import React from 'react';
import { expect } from 'chai';
import enzyme from '../../../services/test/enzymeWithProviders';
import Download from './Download';

const mockProps = {
  name: '',
  columns: [
    { id: '888', name: 'column1' },
    { id: '999', name: 'column2' }
  ],
  cards: [
    { id: 123, text: 'test', columnId: '888', votes: ['111', '222'] },
    { id: 321, text: 'test2', columnId: '999', votes: ['111'] }
  ],
  download: false,
  startDownload: () => {},
  stopDownload: () => {},
  classes: {
    downloadRetroIcon: 'downloadRetroIcon',
    actionIcon: 'actionIcon'
  }
};

describe(`${Download.name} component`, () => {
  it('parses data correctly', () => {
    const wrapper = enzyme.shallow(
      <Download {...mockProps} />);

    expect(wrapper.instance().prepareData()).to.have.length(2);
    expect(wrapper.instance().prepareData()[0].text).to.equal('test');
    expect(wrapper.instance().prepareData()[0].votes).to.equal(2);
    expect(wrapper.instance().prepareData()[1].column).to.equal('column2');
  });
});
