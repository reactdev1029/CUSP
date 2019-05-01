import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  CircularProgress,
  Dialog,
  Typography,
  Button
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import styles from './stepTwoStyles';

const DialogShare = props => {
  const { classes, open, handleClose } = props;

  return (
    <div>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
        <MuiDialogTitle disableTypography className={classes.title}>
          <Typography variant="h4">Processing</Typography>
        </MuiDialogTitle>
        <MuiDialogContent className={classes.content}>
          <CircularProgress />
          <p className={classes.contentText}>
            You can close this window while it is processing
          </p>
        </MuiDialogContent>
        <MuiDialogActions className={classes.actions}>
          <Button onClick={handleClose}>Close</Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
};

DialogShare.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default withStyles(styles)(DialogShare);
