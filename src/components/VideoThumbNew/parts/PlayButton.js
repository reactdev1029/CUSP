import React from 'react';
import PropTypes from 'prop-types';
import PlayArrowIcon from '@material-ui/icons/PlayArrowRounded';

const VideoThumbPlayButton = ({ onClick, visible, playId, clipId }) => {
  if (!visible || playId === clipId) {
    return null;
  }

  return (
    <button
      type="button"
      className="video-play-button-container"
      onClick={onClick}
    >
      <PlayArrowIcon className="video__play-button pointer" />
    </button>
  );
};

VideoThumbPlayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  playId: PropTypes.string,
  clipId: PropTypes.string
};

VideoThumbPlayButton.defaultProps = {
  visible: false,
  playId: '',
  clipId: ''
};

export default VideoThumbPlayButton;
