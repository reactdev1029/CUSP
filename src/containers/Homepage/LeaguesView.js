import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import VideoThumbNew from '../../components/VideoThumbNew';
import urlUtils from '../../util/urlUtil';

const styles = {
  player_div: {
    maxWidth: '210px',
    width: '100%',
    marginRight: '16px'
  }
};

const ClipsRender = ({ clip, index, classes, setCurrentPlayId, play_id }) => (
  <div key={index} className="border-top p-3">
    <div className="d-flex">
      <Button
        component={Link}
        to={urlUtils.linkToSearchFromHomepage(
          clip.league.league_id,
          clip.league.league_name
        )}
      >
        {clip.league.league_name}
      </Button>
    </div>
    <div className="d-flex flex-row flex-wrap">
      {clip.clips &&
        clip.clips.map(item => (
          <div className={classes.player_div} key={item.clip_id}>
            <VideoThumbNew
              clips={item}
              setCurrentPlayId={setCurrentPlayId}
              playId={play_id}
            />
          </div>
        ))}
    </div>
  </div>
);

const LeaguesView = ({ clips_latest, setCurrentPlayId, play_id, classes }) => {
  return (
    <div>
      {clips_latest &&
        clips_latest.map(clip => (
          <ClipsRender
            key={clip.league.league_id}
            clip={clip}
            setCurrentPlayId={setCurrentPlayId}
            play_id={play_id}
            classes={classes}
          />
        ))}
    </div>
  );
};

LeaguesView.propTypes = {
  clips_latest: PropTypes.array,
  setCurrentPlayId: PropTypes.func.isRequired,
  play_id: PropTypes.string,
  classes: PropTypes.object.isRequired
};

LeaguesView.defaultProps = {
  clips_latest: undefined,
  play_id: undefined
};

export default withStyles(styles)(LeaguesView);
