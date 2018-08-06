import React from 'react';
import { expect } from 'chai';
import enzyme from '../../services/test/enzymeWithProviders';
import { Card } from './Card';

const mockProps = {
  userId: '111',
  users: [],
  card: { id: '321', text: 'test2', columnId: '999', votes: ['111', '111'], authors: [{ id: '111', name: 'Abc' }] },
  retroStep: 'write',
  editColumnQuery: { status: 'notReady' },
  editCardQuery: { status: 'notReady' },
  removeCardQuery: { status: 'notReady' },
  votes: 3,
  userSubmmitedVotes: 0,
  search: '',
  removeCard: () => {},
  editCard: () => {},
  addMessage: () => {},
  classes: {
    card: 'card',
    cardFiltered: 'cardFiltered',
    text: 'text',
    cardActions: 'cardActions',
    expander: 'expander',
    author: 'author',
    action: 'action',
    actionIcon: 'actionIcon',
    doneIcon: 'doneIcon'
  }
};

const mockContext = {
  socket: {}
};

const getWrapper = props => (
  enzyme.shallow(
    <Card {...props} />,
    { context: mockContext })
);

describe(`${Card.name} component`, () => {
  it('renders without crashing', () => {
    const wrapper = getWrapper(mockProps);
    expect(wrapper.find('Card')).to.have.length(1);
  });

  it('applies class to searched card if phrase has > 2 characters', () => {
    const props = {
      ...mockProps,
      search: 'st2'
    };
    const wrapper = getWrapper(props);
    expect(wrapper.find('.cardFiltered')).to.have.length(1);
  });

  it('does not apply class to searched card if a phrase has < 3 characters', () => {
    const props = {
      ...mockProps,
      search: 'te'
    };
    const wrapper = getWrapper(props);
    expect(wrapper.find('.cardFiltered')).to.have.length(0);
  });
});
