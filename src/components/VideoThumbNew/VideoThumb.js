import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Player } from 'video-react';
import BookmarkIcon from '@material-ui/icons/BookmarkSharp';

import { postClipsBookmarks } from '../../actions';
import PlayButton from './parts/PlayButton';
import VideoData from './parts/VideoData';
import './videoThumb.scss';

class VideoThumb extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playerState: {
        paused: true
      },
      visible: false,
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
      this.player.current.subscribeToStateChange(state => {
        this.handleStateChange(state);
      });
  };

  handleStateChange = state => {
    this.setState({ playerState: state });
    const reload =
      state &&
      state.paused &&
      !state.ended &&
      state.played &&
      state.played.length === 1 &&
      state.buffered &&
      state.buffered.length === 1;
    if (reload) {
      const currentTime = state.currentTime;
      this.player.current.load();
      this.player.current.seek(currentTime);
    }
  };

  play = playId => () => {
    const { setCurrentPlayId } = this.props;

    setCurrentPlayId(playId);
    this.player.current.play();
  };

  mouseEnter = () => {
    this.setState({ visible: true });
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
      playId,
      listMode,
      showVideoData,
      bookmarkBlock
    } = this.props;
    const { playerState, visible } = this.state;
    const thumbUrl = clips.videos[0].thumbnail_url.replace(
      '/origin.png',
      '/320.180.png'
    );
    const videoState = playId === clips.videos[0].id || visible;
    const videoUrl = videoState ? clips.videos[0].video_url : '';

    return (
      <React.Fragment>
        <div className="video">
          <div
            className={`video-container ${
              playerState.paused && !playerState.hasStarted ? 'paused' : ''
            }`}
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
          >
            <Player
              ref={this.player}
              poster={thumbUrl}
              src={videoUrl}
              preload="none"
            />
            {(clips.is_bookmarked ||
              this.getBookmarkState(clips.clip_id) ||
              visible) &&
              bookmarkBlock && (
                <BookmarkIcon
                  className="video-bookmark-icon"
                  onClick={this.bookmarkClick(clips)}
                />
              )}
            <PlayButton
              visible={visible}
              playId={playId}
              clipId={clips.videos[0].id}
              onClick={this.play(clips.videos[0].id)}
            />
          </div>
          <VideoData
            showVideoData={showVideoData}
            clips={clips}
            listMode={listMode}
          />
        </div>
      </React.Fragment>
    );
  }
}

VideoThumb.propTypes = {
  clips: PropTypes.shape({}).isRequired,
  setCurrentPlayId: PropTypes.func,
  playId: PropTypes.string,
  postClipsBookmarks: PropTypes.func.isRequired,
  postedBookmarks: PropTypes.object,
  clips_loader: PropTypes.bool.isRequired,
  showVideoData: PropTypes.bool,
  bookmarkBlock: PropTypes.bool
};

VideoThumb.defaultProps = {
  playId: '',
  setCurrentPlayId: () => {},
  postedBookmarks: undefined,
  showVideoData: true,
  bookmarkBlock: true
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
)(VideoThumb);
