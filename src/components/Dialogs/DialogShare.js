import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Fab,
  Dialog,
  Typography,
  TextField
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import NavigationIcon from '@material-ui/icons/Navigation';

import styles from './dialogShareStyles';

const DialogShare = props => {
  const { classes, open, handleClose, title, openShareToCUSPDialog } = props;

  return (
    <div>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
        <MuiDialogTitle disableTypography className={classes.title}>
          <Typography variant="h4">{title}</Typography>
        </MuiDialogTitle>
        <MuiDialogContent className={classes.content}>
          <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue="Here would be a link"
            margin="normal"
            variant="outlined"
            className={classes.textField}
          />
        </MuiDialogContent>
        <MuiDialogActions className={classes.actions}>
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.margin}
            onClick={openShareToCUSPDialog}
          >
            <NavigationIcon />
            Share to CUSP
          </Fab>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
};

DialogShare.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleClose: PropTypes.func.isRequired,
  openShareToCUSPDialog: PropTypes.func.isRequired,
  title: PropTypes.string,
  open: PropTypes.bool
};

export default withStyles(styles)(DialogShare);
