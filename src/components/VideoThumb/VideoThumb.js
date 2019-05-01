import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Player, ControlBar, BigPlayButton, Shortcut } from 'video-react';
import { Button, Tooltip } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { withStyles } from '@material-ui/core/styles';
import { getVideoTitle } from '../../util/textUtil';
import { getVideoTime } from '../../util/timeUtil';
import { postClipsBookmarks } from '../../actions';

const styles = theme => ({
  text: {
    width: '180px',
    padding: '10px 0 10px 0'
  },
  live_text: {
    width: '240px'
  },
  thumb_div: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    zIndex: 1298
  },
  tag_div: {
    cursor: 'pointer',
    wordBreak: 'break-all',
    '&:hover': {
      color: theme.palette.grey[500],
      textDecoration: 'underline'
    }
  },
  live_recent_div: {
    width: '240px',
    height: '135px'
  },
  videoTitle: {
    wordBreak: 'break-all',
    color: theme.palette.grey[500]
  }
});

class VideoThumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerState: undefined,
      visible: false,
      video_id: true,
      bookmarkState: [],
      bookmarkBtnState: false
    };
    this.player = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.postedBookmarks && prevState.bookmarkBtnState) {
      prevState.bookmarkState.push(nextProps.postedBookmarks.clip_id);
      return {
        bookmarkState: prevState.bookmarkState,
        bookmarkBtnState: false
      };
    }
    return null;
  }

  componentDidMount() {
    this.getPlayerState();
  }

  getPlayerState = () => {
    this.player.current &&
      this.player.current.subscribeToStateChange(state =>
        this.handleStateChange(state)
      );
  };

  handleStateChange(state) {
    this.setState({ playerState: state, bookmarkBtnState: false });
    if (!state.paused) {
      this.setState({ visible: true, video_id: false });
    }
  }

  play = play_id => () => {
    this.props.setCurrentPlayId(play_id);
    this.getPlayerState();
    this.player.current.play();
  };

  pause = () => {
    this.player.current.pause();
  };

  mouseEnter = () => {
    this.setState({ visible: true, video_id: true });
  };

  mouseLeave = () => {
    this.setState({ visible: false });
  };

  getBookmarkState = clip_id => {
    const { bookmarkState } = this.state;
    return bookmarkState.find(e => e === clip_id);
  };

  bookmarkClick = clips => () => {
    const { clips_loader, postClipsBookmarks } = this.props;
    const body = {
      user_id: localStorage.getItem('user_id'),
      clip_id: clips.clip_id
    };
    if (
      !clips.is_bookmarked &&
      !this.getBookmarkState(clips.clip_id) &&
      !clips_loader
    ) {
      postClipsBookmarks(body);
      this.setState({ bookmarkBtnState: true });
    }
  };

  render() {
    const {
      clips,
      rowState,
      classes,
      play_id,
      showTagsBlock,
      live_state,
      time_state
    } = this.props;
    const { playerState, visible, video_id } = this.state;
    const tooltipState = clips.videos[0].title.length > 44;

    return (
      <div
        className={`d-flex ${rowState ? 'flex-row' : 'flex-column'} mr-4 mb-3`}
      >
        <div
          className={`video-div ${live_state && classes.live_recent_div}`}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
        >
          {!play_id ||
          play_id === clips.videos[0].id ||
          (video_id && visible) ? (
            <div>
              <Player
                ref={this.player}
                poster={clips.videos[0].thumbnail_url}
                src={clips.videos[0].video_url}
                preload="none"
              >
                <BigPlayButton className="d-none" />
                <Shortcut clickable={false} />
                <ControlBar disableCompletely />
              </Player>
              <div
                className={`video-div ${classes.thumb_div} ${live_state &&
                  classes.live_recent_div}`}
              />
            </div>
          ) : (
            <img
              src={clips.videos[0].thumbnail_url}
              alt={clips.videos[0].title}
              title={clips.videos[0].title}
              className={`video-div ${live_state && classes.live_recent_div}`}
            />
          )}
          {visible && (
            <div>
              {(playerState && (playerState.paused || playerState.ended)) ||
              play_id !== clips.videos[0].id ? (
                <PlayArrowIcon
                  className="play-button pointer"
                  onClick={this.play(clips.videos[0].id)}
                />
              ) : (
                <PauseIcon
                  className="play-button pointer"
                  onClick={this.pause}
                />
              )}
              <span className="video-timer">
                {playerState && !video_id
                  ? moment.unix(playerState.currentTime).format('mm:ss')
                  : '00:00'}
              </span>
            </div>
          )}
          {(clips.is_bookmarked ||
            this.getBookmarkState(clips.clip_id) ||
            visible) &&
            video_id && (
              <BookmarkIcon
                className="bookmark-icon"
                onClick={this.bookmarkClick(clips)}
              />
            )}
        </div>
        <div
          className={`d-flex flex-column ${rowState && 'ml-3'} ${
            classes.text
          } ${live_state && classes.live_text}`}
        >
          <Tooltip
            title={clips.videos[0].title}
            placement="bottom"
            disableHoverListener={!tooltipState}
          >
            <Link
              to={{
                pathname: `/clipdetail/${clips.clip_id}`,
                state: { details: clips }
              }}
            >
              <span className={classes.videoTitle}>
                {getVideoTitle(clips.videos[0], 44)}
              </span>
            </Link>
          </Tooltip>
          {!showTagsBlock && (
            <div>
              {clips.clip_type === 'RuleBased' &&
                clips.tags &&
                clips.tags.length > 0 &&
                clips.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className={classes.tag_div}
                  >{`#${tag}`}</span>
                ))}
            </div>
          )}
          {!time_state && (
            <span className="mt-1 text-grey">{getVideoTime(clips)}</span>
          )}
          {clips.is_live && (
            <div className="mt-1">
              <Button size="small" onClick={() => {}} variant="contained">
                LIVE
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

VideoThumb.propTypes = {
  clips: PropTypes.object.isRequired,
  rowState: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  setCurrentPlayId: PropTypes.func,
  play_id: PropTypes.string,
  showTagsBlock: PropTypes.bool,
  time_state: PropTypes.bool,
  live_state: PropTypes.bool,
  postClipsBookmarks: PropTypes.func.isRequired,
  postedBookmarks: PropTypes.object,
  clips_loader: PropTypes.bool.isRequired
};

VideoThumb.defaultProps = {
  rowState: false,
  play_id: undefined,
  setCurrentPlayId: () => {},
  showTagsBlock: false,
  time_state: false,
  live_state: false,
  postedBookmarks: undefined
};

const mapStateToProps = state => {
  return {
    clips_loader: state.clips.clips_loader,
    postedBookmarks: state.clips.postedBookmarks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postClipsBookmarks: params => dispatch(postClipsBookmarks(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(VideoThumb));
