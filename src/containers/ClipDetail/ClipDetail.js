import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Layout from '../layouts';
import VideoPlayer from './VideoPlayer';
import MoreLike from './MoreLike';
import {
  getPlayId,
  getSimilarClips,
  getShare,
  getShareLoop,
  getClipById
} from '../../actions';
import ScrollToTop from '../../util/ScrollToTop';

class ClipDetail extends React.Component {
  componentDidMount() {
    const { params } = this.props.match;
    const { getSimilarClips, getClipById } = this.props;
    if (params) {
      let data = {
        clip_id: params.id
      };
      getSimilarClips(data);
      getClipById(params.id);
    }
  }

  componentDidUpdate() {
    const { shareId, getShare, shareState } = this.props;

    if (!lodash.isEmpty(shareId) && lodash.isEmpty(shareState)) {
      getShare(shareId);
    } else if (!lodash.isEmpty(shareId) && !lodash.isEmpty(shareState)) {
      this.getShareLoop();
    }
  }

  getShareLoop = () => {
    const { shareId, getShareLoop, shareState } = this.props;

    if (shareId && shareState !== 'completed') {
      setTimeout(getShareLoop, 5000);
    }
  };

  setCurrentPlayId = playId => {
    const { getPlayId } = this.props;
    getPlayId(playId);
  };

  render() {
    const {
      location,
      play_id,
      similar_clips,
      shareState,
      clipById,
      clips_loader
    } = this.props;
    const video = location.state ? location.state.details : clipById;

    return (
      <ScrollToTop>
        <Layout>
          <div className="app-wrapper">
            <div className="animated slideInUpTiny animation-duration-3">
              <Grid container spacing={32}>
                <Grid item xs={12} md={7}>
                  {(clipById || location.state) && (
                    <VideoPlayer
                      video={video}
                      setCurrentPlayId={this.setCurrentPlayId}
                      playId={play_id}
                      shareState={shareState}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={5}>
                  <MoreLike
                    clips={similar_clips}
                    setCurrentPlayId={this.setCurrentPlayId}
                    play_id={play_id}
                    clips_loader={clips_loader}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </Layout>
      </ScrollToTop>
    );
  }
}

ClipDetail.propTypes = {
  location: PropTypes.object.isRequired,
  getPlayId: PropTypes.func.isRequired,
  play_id: PropTypes.string,
  getSimilarClips: PropTypes.func.isRequired,
  similar_clips: PropTypes.array,
  getClipById: PropTypes.func.isRequired,
  clipById: PropTypes.object,
  clips_loader: PropTypes.bool.isRequired
};

ClipDetail.defaultProps = {
  similar_clips: undefined,
  play_id: undefined,
  clipById: undefined
};

const mapStateToProps = ({ clips, shares }) => {
  const { play_id, similar_clips, clipById, clips_loader } = clips;
  return {
    play_id,
    similar_clips,
    number: shares.number,
    shareId: shares.shareId,
    shareState: shares.shareState,
    clipById,
    clips_loader
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPlayId: params => dispatch(getPlayId(params)),
    getSimilarClips: params => dispatch(getSimilarClips(params)),
    getShare: shareId => dispatch(getShare(shareId)),
    getShareLoop: () => dispatch(getShareLoop()),
    getClipById: clip_id => dispatch(getClipById(clip_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClipDetail);
