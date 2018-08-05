import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSVDownload } from 'react-csv';
import ExportIcon from 'material-ui-icons/GetApp';
import { FormattedMessage } from 'react-intl';
import { IconButton, Tooltip } from 'material-ui';
import ConfirmDialog from '../../../containers/ConfirmDialog';

class Download extends Component {
  constructor() {
    super();
    this.state = { openConfirmDialog: false };
  }

  openDialog = () => {
    this.setState({ openConfirmDialog: true });
  }

  closeDialog = () => {
    this.setState({ openConfirmDialog: false });
  }

  processDownload = () => {
    const { startDownload } = this.props;
    this.closeDialog();
    startDownload();
  }

  prepareData = () => {
    const { columns, cards } = this.props;

    return cards.map(card => ({
      column: (() => {
        const column = columns.find(c => c.id === card.columnId);
        return column ? column.name : '';
      })(),
      text: card.text,
      votes: card.votes.length
    }));
  };

  render() {
    const { classes, name, download, stopDownload } = this.props;
    const { openConfirmDialog } = this.state;
    if (download) {
      stopDownload();
    }

    return (
      <div>
        <Tooltip
          key="download"
          title={<FormattedMessage id="retro.download-action-points" />}
          placement="bottom"
        >
          <IconButton
            className={classes.downloadRetroIcon}
            onClick={this.openDialog}
          >
            <ExportIcon className={classes.actionIcon} />
          </IconButton>
        </Tooltip>
        <ConfirmDialog
          key="download-confirm"
          textContent={<FormattedMessage id="retro.confirm-download" />}
          open={openConfirmDialog}
          onConfirm={this.processDownload}
          onCancel={this.closeDialog}
        />
        {download && (<CSVDownload data={this.prepareData()} filename={`retro-${name}.csv`} target="_parent" />)}
        {/* It appears it is impossible to set a filename for CSVDownload component.
            It is possible for CSVLink but in our case it can't be used */}
      </div>
    );
  }
}

Download.propTypes = {
  // Values
  name: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  download: PropTypes.bool.isRequired,
  // Functions
  startDownload: PropTypes.func.isRequired,
  stopDownload: PropTypes.func.isRequired,
  // Styles
  classes: PropTypes.shape({
    downloadRetroIcon: PropTypes.string.isRequired,
    actionIcon: PropTypes.string.isRequired
  }).isRequired
};

export default Download;
