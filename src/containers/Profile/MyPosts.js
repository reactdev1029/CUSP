import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CircularProgress, Grid, Typography } from '@material-ui/core';

import TabContainer from './TabContainer';
import { getHubPosts, getHubPostsNext } from '../../actions';
import scrollUtil from '../../util/scrollUtil';
import PostItem from '../../components/Post';
import LoadMoreSpinner from '../../components/Loaders';

class MyVideos extends React.Component {
  componentDidMount() {
    const { getHubPosts } = this.props;

    getHubPosts();

    window.addEventListener('scroll', this.windowScrollHandler, {
      passive: true
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.windowScrollHandler);
  }

  windowScrollHandler = () => {
    const { hubPosts, postsLoading, tabIndex } = this.props;

    if (scrollUtil.detectScrollAtBottom()) {
      if (hubPosts.next && !postsLoading && tabIndex === 0) {
        this.loadNextPosts(hubPosts.next);
      }
    }
  };

  loadNextPosts = cursor => {
    const { getPostsNext } = this.props;

    getPostsNext(cursor);
  };

  render() {
    const {
      hubPosts,
      theme,
      setCurrentPlayId,
      playId,
      postsLoading,
      loadingNextPosts,
      tabIndex
    } = this.props;
    const posts = hubPosts.results;

    return (
      <React.Fragment>
        <TabContainer dir={theme.direction}>
          {tabIndex === 0 && (
            <React.Fragment>
              {!postsLoading ? (
                <React.Fragment>
                  {posts.length > 0 ? (
                    <Grid
                      className="padding-for-loader"
                      container
                      direction="row"
                      spacing={24}
                    >
                      {posts.map(item => (
                        <Grid item xs={3} key={item.id}>
                          <PostItem
                            item={item}
                            setCurrentPlayId={setCurrentPlayId}
                            playId={playId}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="subtitle2">
                      No videos are shown.
                    </Typography>
                  )}
                  <LoadMoreSpinner show={loadingNextPosts} />
                </React.Fragment>
              ) : (
                <CircularProgress />
              )}
            </React.Fragment>
          )}
        </TabContainer>
      </React.Fragment>
    );
  }
}

MyVideos.propTypes = {
  myVideos: PropTypes.array,
  theme: PropTypes.object.isRequired,
  setCurrentPlayId: PropTypes.func.isRequired,
  play_id: PropTypes.string,
  tabIndex: PropTypes.number.isRequired
};

MyVideos.defaultProps = {
  play_id: undefined,
  myVideos: []
};

const mapStateToProps = state => {
  return {
    hubPosts: state.community.hubPosts,
    postsLoading: state.community.communityLoading,
    loadingNextPosts: state.community.loadingNextPosts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHubPosts: () => dispatch(getHubPosts()),
    getPostsNext: cursor => dispatch(getHubPostsNext(cursor))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyVideos);
