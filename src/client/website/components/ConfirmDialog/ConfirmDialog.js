import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';
import { Button } from 'material-ui';
import { FormattedMessage } from 'react-intl';

const ConfirmDialog = ({
  textContent,
  open,
  onConfirm,
  onCancel,
  cancelButtonText,
  confirmButtonText
}) => (
  <Dialog onClose={onCancel} open={open}>
    <DialogTitle>
      {textContent}
    </DialogTitle>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        {cancelButtonText || <FormattedMessage id="navigation.cancel" />}
      </Button>
      <Button onClick={onConfirm} color="primary">
        {confirmButtonText || <FormattedMessage id="navigation.ok" />}
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmDialog.propTypes = {
  textContent: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  cancelButtonText: PropTypes.string,
  confirmButtonText: PropTypes.string
};

ConfirmDialog.defaultProps = {
  cancelButtonText: '',
  confirmButtonText: ''
};

export default ConfirmDialog;
