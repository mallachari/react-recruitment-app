import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import enzyme from '../../services/test/enzymeWithProviders';
import Column from './Column';

const mockProps = {
  column: {
    name: 'colummn2',
    id: '999'
  },
  search: 'st2',
  editColumn: () => {},
  addCard: () => {},
  editCard: () => {},
  addMessage: () => {},
  classes: {
    column: 'column',
    columnTitle: 'columnTitle',
    addCardIcon: 'addCardIcon',
    addCardContainer: 'addCardContainer'
  }
};

const mockStore = configureMockStore([thunk]);

const mockContext = {
  socket: {},
  store: mockStore({
    retro: {
      id: '1',
      name: 'test',
      step: 'vote',
      columns: [
        { id: '888', name: 'column1', icon: 'positive' },
        { id: '999', name: 'column2', icon: 'positive' }
      ],
      cards: [
        { id: '123', text: 'test', columnId: '999', votes: ['111'], authors: [{ id: '111', name: 'Abc' }] },
        { id: '321', text: 'test2', columnId: '999', votes: ['111', '111'], authors: [{ id: '111', name: 'Abc' }] },
        { id: '333', text: 'test3', columnId: '888', votes: ['111'], authors: [{ id: '111', name: 'Abc' }] }
      ],
      voteLimit: 3,
      editColumn: { status: 'notReady' },
      addCard: { status: 'notReady' },
      editCard: { status: 'notReady' },
      removeCard: { status: 'notReady' }
    },
    user: { userId: '111' }
  })
};

const childContextTypes = {
  socket: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

const getWrapper = props => (
  enzyme.mount(
    <BrowserRouter>
      <Column {...props} />
    </BrowserRouter>,
    { context: mockContext, childContextTypes })
);

describe(`${Column.name} container`, () => {
  it('renders cards', () => {
    const wrapper = getWrapper(mockProps);

    expect(wrapper.find('div.column')).to.have.length(1);
    expect(wrapper.find('Card')).to.have.length(4); // doubled value because it finds also MaterialCard
  });

  it('does not render cards when they are hidden', () => {
    const wrapper = getWrapper(mockProps);

    expect(wrapper.find('Card')).to.have.length(4);
    wrapper.find('Column').instance().setState({ hidden: true });
    wrapper.update();
    expect(wrapper.find('Card')).to.have.length(0);
  });

  it('renders cards in vote order', () => {
    const wrapper = getWrapper(mockProps);

    expect(wrapper.find('Card').at(0).props().card.id).to.equal('123');
    wrapper.find('Column').instance().setState({ sorting: true });
    wrapper.update();
    expect(wrapper.find('Card').at(0).props().card.id).to.equal('321');
  });
});
