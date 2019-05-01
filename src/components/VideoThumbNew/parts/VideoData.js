import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';

import { getVideoTitle } from '../../../util/textUtil';
import { getVideoTime } from '../../../util/timeUtil';

const VideoThumb = ({ clips, listMode, showVideoData }) => {
  const tooltipState = clips.videos[0].title.length > 46;
  const videoTitle = !listMode
    ? getVideoTitle(clips.videos[0], 46)
    : getVideoTitle(clips.videos[0], 120);

  if (!showVideoData) {
    return null;
  }

  return (
    <div className="video-data">
      <Tooltip
        title={clips.videos[0].title}
        placement="bottom"
        disableHoverListener={!tooltipState}
      >
        <Link
          className="video-title"
          to={{
            pathname: `/clipdetail/${clips.clip_id}`,
            state: { details: clips }
          }}
        >
          {videoTitle}
        </Link>
      </Tooltip>
      <span className="video-date video-meta">{getVideoTime(clips)}</span>
      {clips.is_live && <span className="video-live-badge">Live now</span>}
    </div>
  );
};

VideoThumb.propTypes = {
  showVideoData: PropTypes.bool.isRequired,
  clips: PropTypes.shape({}).isRequired,
  listMode: PropTypes.bool
};

VideoThumb.defaultProps = {
  listMode: false
};

export default VideoThumb;
