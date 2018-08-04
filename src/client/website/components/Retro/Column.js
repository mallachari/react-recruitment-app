import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Typography, Tooltip } from 'material-ui';
import PlaylistAdd from 'material-ui-icons/PlaylistAdd';
import Sort from 'material-ui-icons/Sort';
import { FormattedMessage } from 'react-intl';
import Card from '../../containers/Retro/Card';
import deepClone from '../../services/utils/deepClone';
import { QUERY_ERROR_KEY, queryFailed, QueryShape } from '../../services/websocket/query';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', sorting: false };
  }

  componentWillReceiveProps(nextProps) {
    const { addCardQuery, addMessage } = this.props;
    const { addCardQuery: nextAddCardQuery } = nextProps;
    if (queryFailed(addCardQuery, nextAddCardQuery)) {
      addMessage(nextAddCardQuery[QUERY_ERROR_KEY]);
    }
  }

  addCard = () => {
    const { socket } = this.context;
    const { text } = this.state;
    const { column: { id }, addCard } = this.props;

    addCard(socket, id, text);
    this.setState({ text: '' });
  };

  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleCardDrop = (e) => {
    const { socket } = this.context;
    const { editCard, column: { id: columnId }, cards } = this.props;
    const { id } = JSON.parse(e.dataTransfer.getData('card'));
    if (cards.find(c => c.id === id && c.columnId !== columnId)) {
      editCard(socket, { id, columnId });
    }
  }

  toggleSorting = () => {
    this.setState((prevState) => {
      const state = { sorting: !prevState.sorting };
      return state;
    });
  }

  render() {
    const { column, cards, retroStep, classes } = this.props;
    const { sorting } = this.state;

    return (
      <div
        className={classes.column}
        onDragOver={e => e.preventDefault()}
        onDrop={e => this.handleCardDrop(e)}
      >
        <div className={classes.header}>
          <Typography
            type="headline"
            className={classes.columnTitle}
            onDoubleClick={this.startEditing}
          >{column.name}
          </Typography>
          <div>
            {retroStep === 'vote' && (
              <Tooltip
                key={column.id}
                placement="left"
                title={sorting
                  ? <FormattedMessage id="columns.column-sort-by-votes-off" />
                  : <FormattedMessage id="columns.column-sort-by-votes-on" />
                }
              >
                <IconButton className={classes.sortIcon} onClick={this.toggleSorting}>
                  <Sort className={classes.actionIcon} />
                </IconButton>
              </Tooltip>
            )}
            <IconButton className={classes.addCardIcon} onClick={this.addCard}>
              <PlaylistAdd className={classes.actionIcon} />
            </IconButton>
          </div>
        </div>
        {sorting ? (
          deepClone(cards).filter(card => column.id === card.columnId)
            .sort((a, b) => b.votes.length - a.votes.length)
            .map(card => (
              <Card card={card} key={card.id} />
            ))
        ) : (
          cards.filter(card => column.id === card.columnId).map(card => (
            <Card card={card} key={card.id} />
          ))
        )}
      </div>
    );
  }
}

Column.contextTypes = {
  socket: PropTypes.object.isRequired
};

Column.propTypes = {
  // Values
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    columnId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })).isRequired,
  retroStep: PropTypes.string.isRequired,
  // Functions
  addCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  // Queries
  addCardQuery: PropTypes.shape(QueryShape).isRequired,
  // Styles
  classes: PropTypes.shape({
    column: PropTypes.string.isRequired,
    columnTitle: PropTypes.string.isRequired,
    addCardIcon: PropTypes.string.isRequired,
    addCardContainer: PropTypes.string.isRequired
  }).isRequired
};

export default Column;
