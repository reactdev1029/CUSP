import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import VideoThumbNew from '../../components/VideoThumbNew';
import { isLive } from '../../util/isLive';

const styles = theme => ({
  container: {
    padding: '15px'
  },
  live_div: {
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 1279px)': {
      flexWrap: 'wrap'
    }
  },
  player_div: {
    maxWidth: '240px',
    width: '100%',
    marginRight: '16px'
  },
  view_div: {
    height: '135px',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 575px)': {
      height: '60px'
    }
  },
  view_more: {
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    color: theme.palette.grey[900],
    '&:hover': {
      color: theme.palette.grey[500],
      textDecoration: 'underline'
    }
  },
  live_now: {
    width: 'auto',
    padding: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 2,
    borderRadius: theme.shape.borderRadius,
    display: 'inline-block',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    }
  }
});

const LiveRecentGames = ({
  live_clips,
  setCurrentPlayId,
  play_id,
  classes
}) => {
  return (
    <div className={classes.container}>
      <Link
        to={{
          pathname: '/aggregated',
          state: { clips_all: live_clips, is_live: true }
        }}
      >
        <Typography variant="h5" className={classes.live_now}>
          {isLive(live_clips.is_live)}
        </Typography>
      </Link>
      <div className={classes.live_div}>
        {live_clips.results &&
          live_clips.results.length &&
          live_clips.results.map(
            (item, index) =>
              index < 3 && (
                <div className={classes.player_div} key={item.clip_id}>
                  <VideoThumbNew
                    clips={item}
                    setCurrentPlayId={setCurrentPlayId}
                    playId={play_id}
                  />
                </div>
              )
          )}
        <div className={classes.view_div}>
          <Link
            to={{
              pathname: '/aggregated',
              state: { clips_all: live_clips, is_live: true }
            }}
          >
            <h3 className={classes.view_more}>View more...</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

LiveRecentGames.propTypes = {
  live_clips: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  setCurrentPlayId: PropTypes.func,
  play_id: PropTypes.string
};

LiveRecentGames.defaultProps = {
  play_id: undefined,
  setCurrentPlayId: () => {}
};

export default withStyles(styles)(LiveRecentGames);
