import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress } from '@material-ui/core';
import VideoThumbNew from '../../components/VideoThumbNew';
import CustomScrollbars from '../../util/CustomScrollbars';
import '../SearchPage/seach-page.scss';

const styles = theme => ({
  body: {
    height: '580px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10
  }
});

class MoreLike extends React.Component {
  render() {
    const {
      clips,
      play_id,
      classes,
      setCurrentPlayId,
      clips_loader
    } = this.props;

    return (
      <div>
        <h1>MORE LIKE THIS</h1>
        <div className={classes.body}>
          <CustomScrollbars>
            {!clips_loader && clips ? (
              <div className="videos-grid list">
                {clips.length > 0 ? (
                  clips.map(item => (
                    <div className="videos-grid-item" key={item.clip_id}>
                      <VideoThumbNew
                        clips={item}
                        setCurrentPlayId={setCurrentPlayId}
                        playId={play_id}
                        listMode={false}
                      />
                    </div>
                  ))
                ) : (
                  <Typography variant="subtitle2">No videos found.</Typography>
                )}
              </div>
            ) : (
              <CircularProgress />
            )}
          </CustomScrollbars>
        </div>
      </div>
    );
  }
}

MoreLike.propTypes = {
  clips: PropTypes.array,
  classes: PropTypes.object.isRequired,
  setCurrentPlayId: PropTypes.func,
  play_id: PropTypes.string,
  clips_loader: PropTypes.bool.isRequired
};

MoreLike.defaultProps = {
  clips: undefined,
  play_id: undefined,
  setCurrentPlayId: () => {}
};

export default withStyles(styles)(MoreLike);
