import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import TabContainer from './TabContainer';
import VideoThumbNew from '../../components/VideoThumbNew';
import { CustomButton } from '../../components/Buttons';
import LoadMoreSpinner from '../../components/Loaders';
import {
  getClipsBookmarks,
  deleteClipsBookmarks,
  clipsClear
} from '../../actions';
import scrollUtil from '../../util/scrollUtil';
import '../SearchPage/seach-page.scss';

class MyVideos extends React.Component {
  state = {
    selected_clip: undefined
  };

  componentDidMount() {
    const { getClipsBookmarks, bookmarks_cursor, clipsClear } = this.props;
    const bookmarks_params = {
      cursor: bookmarks_cursor
    };
    clipsClear();
    getClipsBookmarks(bookmarks_params);
    window.addEventListener('scroll', this.windowScrollHandler, {
      passive: true
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.windowScrollHandler);
  }

  windowScrollHandler = () => {
    const { bookmarks_cursor, getClipsBookmarks, tabIndex } = this.props;
    const bookmarks_params = {
      cursor: bookmarks_cursor
    };

    if (scrollUtil.detectScrollAtBottom()) {
      if (bookmarks_cursor && tabIndex === 1) {
        getClipsBookmarks(bookmarks_params);
      }
    }
  };

  deleteClick = clip_id => () => {
    const { deleteClipsBookmarks } = this.props;
    const { selected_clip } = this.state;
    if (selected_clip !== clip_id) {
      deleteClipsBookmarks(clip_id);
      this.setState({ selected_clip: clip_id });
    }
  };

  render() {
    const {
      clipsBookmarks,
      theme,
      setCurrentPlayId,
      play_id,
      clips_loader,
      tabIndex
    } = this.props;

    return (
      <TabContainer dir={theme.direction}>
        {tabIndex === 1 && (
          <div className="videos-grid list">
            <React.Fragment>
              {clipsBookmarks.length > 0 ? (
                clipsBookmarks.map(item => (
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    key={item.clip_id}
                  >
                    <div>
                      <VideoThumbNew
                        clips={item}
                        setCurrentPlayId={setCurrentPlayId}
                        playId={play_id}
                        listMode={false}
                      />
                    </div>
                    <Grid item>
                      <Grid container direction="row">
                        <CustomButton onClick={this.deleteClick(item.clip_id)}>
                          <DeleteIcon />
                          Delete
                        </CustomButton>
                        <CustomButton>
                          <EditIcon />
                          Edit
                        </CustomButton>
                        <CustomButton>
                          <ShareIcon />
                          Share
                        </CustomButton>
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Typography variant="subtitle2">
                  No videos are shown.
                </Typography>
              )}
              <LoadMoreSpinner show={clips_loader} />
            </React.Fragment>
          </div>
        )}
      </TabContainer>
    );
  }
}

MyVideos.propTypes = {
  theme: PropTypes.object.isRequired,
  setCurrentPlayId: PropTypes.func.isRequired,
  play_id: PropTypes.string,
  getClipsBookmarks: PropTypes.func.isRequired,
  clipsBookmarks: PropTypes.array,
  bookmarks_cursor: PropTypes.string,
  clips_loader: PropTypes.bool.isRequired,
  deleteClipsBookmarks: PropTypes.func.isRequired,
  clipsClear: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired
};

MyVideos.defaultProps = {
  play_id: undefined,
  clipsBookmarks: [],
  bookmarks_cursor: undefined
};

const mapStateToProps = state => {
  return {
    clipsBookmarks: state.clips.clipsBookmarks,
    bookmarks_cursor: state.clips.bookmarks_cursor,
    clips_loader: state.clips.clips_loader
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClipsBookmarks: params => dispatch(getClipsBookmarks(params)),
    deleteClipsBookmarks: clip_id => dispatch(deleteClipsBookmarks(clip_id)),
    clipsClear: () => dispatch(clipsClear())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyVideos);
