import React from 'react';
import PropTypes from 'prop-types';
import { Player, BigPlayButton, Shortcut } from 'video-react';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';

import {
  DialogShare,
  DialogShareStepTwo,
  DialogProcessing
} from '../../components/Dialogs';
import { CustomButton } from '../../components/Buttons';
import { shortcuts } from './VideoPlayerShortcuts';

const styles = theme => ({
  player_size: {
    maxWidth: '820px',
    maxHeight: '480px'
  },
  btn_div: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
    borderBottom: `1px solid ${theme.palette.grey[500]}`
  },
  tag_container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10
  },
  tag_div: {
    cursor: 'pointer',
    wordBreak: 'break-all',
    '&:hover': {
      color: theme.palette.grey[500],
      textDecoration: 'underline'
    }
  }
});

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }

  state = {
    showShareDialog: false,
    showSecondStepDialog: false,
    showProcessingDialog: false
  };

  static getDerivedStateFromProps(props, state) {
    if (props.shareState === 'completed' && state.showProcessingDialog) {
      return {
        showShareDialog: false,
        showSecondStepDialog: false,
        showProcessingDialog: false
      };
    }

    return state;
  }

  openShareDialog = () => {
    this.player.current.pause();
    this.setState({ showShareDialog: true });
  };

  closeShareDialog = () => {
    this.setState({ showShareDialog: false });
  };

  closeFirstStepAndOpenSecond = () => {
    this.setState({ showShareDialog: false, showSecondStepDialog: true });
  };

  closeStepTwo = () => {
    this.setState({ showSecondStepDialog: false });
  };

  submitShareAndShowProcessing = () => {
    this.setState({ showSecondStepDialog: false, showProcessingDialog: true });
  };

  closeProcessingDialog = () => {
    this.setState({ showProcessingDialog: false });
  };

  render() {
    const { video, classes, setCurrentPlayId, playId } = this.props;
    const {
      showShareDialog,
      showSecondStepDialog,
      showProcessingDialog
    } = this.state;

    return (
      <div>
        <h2>{video.videos[0].title}</h2>
        <div className={classes.player_size}>
          <Player
            ref={this.player}
            poster={video.videos[0].thumbnail_url}
            src={video.videos[0].video_url}
            autoPlay
          >
            <Shortcut clickable shortcuts={shortcuts} />
            <BigPlayButton position="center" />
          </Player>
        </div>
        <div className={classes.tag_container}>
          <span>{video.videos[0].description}</span>
          <div>
            {video.clip_type === 'RuleBased' &&
              video.tags &&
              video.tags.length &&
              video.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className={classes.tag_div}
                >{`#${tag}`}</span>
              ))}
          </div>
        </div>
        <div className={classes.btn_div}>
          <CustomButton>
            <EditIcon />
            Edit
          </CustomButton>
          <CustomButton onClick={this.openShareDialog}>
            <ShareIcon />
            Share
          </CustomButton>
        </div>
        <DialogShare
          title="Share"
          open={showShareDialog}
          handleClose={this.closeShareDialog}
          openShareToCUSPDialog={this.closeFirstStepAndOpenSecond}
        />
        <DialogShareStepTwo
          open={showSecondStepDialog}
          handleClose={this.closeStepTwo}
          showProccesing={this.submitShareAndShowProcessing}
          video={video}
          setCurrentPlayId={setCurrentPlayId}
          playId={playId}
        />
        <DialogProcessing
          open={showProcessingDialog}
          handleClose={this.closeProcessingDialog}
        />
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  video: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VideoPlayer);
