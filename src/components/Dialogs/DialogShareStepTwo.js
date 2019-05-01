import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
  Button,
  Grid,
  Dialog,
  Typography,
  TextField
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ChipInput from 'material-ui-chip-input';

import VideoThumbNew from '../VideoThumbNew';
import { tagsArrayToText } from '../../util/textUtil';
import { shareToCusp } from '../../actions';
import styles from './stepTwoStyles';

class DialogShareStepTwo extends React.Component {
  state = {
    description: ''
  };

  componentDidMount() {
    const { video } = this.props;

    this.setState({ description: video.videos[0].description });
  }

  descriptionChangeHandler = event => {
    this.setState({ description: event.target.value });
  };

  postToCuspHandler = () => {
    const { shareToCusp, showProccesing, video } = this.props;
    const { description } = this.state;
    const shareData = {
      title: description,
      clip_id: video.clip_id,
      clip_video_id: video.videos[0].id,
      tags: tagsArrayToText(video.tags)
    };

    shareToCusp(shareData);
    showProccesing();
  };

  render() {
    const {
      classes,
      open,
      handleClose,
      video,
      setCurrentPlayId,
      playId
    } = this.props;
    const { description } = this.state;

    return (
      <div>
        <Dialog
          onClose={handleClose}
          open={open}
          fullWidth
          maxWidth="md"
          classes={{
            paperWidthMd: classes.dialog
          }}
        >
          <MuiDialogTitle disableTypography className={classes.title}>
            <Typography variant="h4">Share to CUSP</Typography>
          </MuiDialogTitle>
          <MuiDialogContent className={classes.content}>
            <Grid container spacing={16}>
              <Grid item xs={6}>
                <VideoThumbNew
                  clips={video}
                  playId={playId}
                  setCurrentPlayId={setCurrentPlayId}
                />
                <TextField
                  label="Description"
                  value={description}
                  variant="outlined"
                  multiline
                  fullWidth
                  rows={2}
                  rowsMax={3}
                  onChange={this.descriptionChangeHandler}
                />
              </Grid>
              <Grid item xs={6}>
                <ChipInput
                  label="Tags"
                  defaultValue={video.tags}
                  variant="outlined"
                  fullWidth
                  fullWidthInput
                  disabled
                  className={classes.textArea}
                  classes={{
                    chipContainer: classes.chipContainer
                  }}
                />
              </Grid>
            </Grid>
          </MuiDialogContent>
          <MuiDialogActions className={classes.actions}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={this.postToCuspHandler}>Post to CUSP</Button>
          </MuiDialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogShareStepTwo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  video: PropTypes.shape({}).isRequired,
  handleClose: PropTypes.func.isRequired,
  setCurrentPlayId: PropTypes.func.isRequired,
  shareToCusp: PropTypes.func.isRequired,
  playId: PropTypes.string,
  open: PropTypes.bool
};

const mapDispatchToProps = dispatch => {
  return {
    shareToCusp: params => dispatch(shareToCusp(params))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(DialogShareStepTwo));
