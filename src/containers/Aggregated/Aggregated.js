import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from '../layouts';
import {
  getClips,
  getPlayId,
  getClipsLiveSuccess,
  getClipsLive
} from '../../actions';
import scrollUtil from '../../util/scrollUtil';
import VideosGrid from '../SearchPage/VideosGrid';
import LoadMoreSpinner from '../../components/Loaders';
import '../SearchPage/seach-page.scss';

class Aggregated extends React.Component {
  componentWillMount() {
    const { clipsLive, getClipsLiveSuccess } = this.props;
    const { state } = this.props.location;
    if (state && state.is_live && !clipsLive) {
      getClipsLiveSuccess(state.clips_all);
    }
  }

  componentDidMount() {
    const { state } = this.props.location;
    const bottomState = window.scrollbars.visible && state && state.clips_all;
    if (bottomState) {
      this.onBottom();
    }

    window.addEventListener('scroll', this.onBottom, {
      passive: true
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onBottom);
  }

  onBottom = () => {
    const { clipsLive, clips_loader, getClipsLive } = this.props;
    if (scrollUtil.detectScrollAtBottom()) {
      if (clipsLive && clipsLive.next && !clips_loader) {
        let params = {
          cursor: clipsLive.next
        };
        getClipsLive(params);
      }
    }
  };

  setCurrentPlayId = play_id => {
    const { getPlayId } = this.props;
    getPlayId(play_id);
  };

  render() {
    const { clips_all_array, clips_loader, play_id } = this.props;

    return (
      <Layout>
        <React.Fragment>
          <div className="videos-grid-container">
            <VideosGrid
              videos={clips_all_array}
              playId={play_id}
              setCurrentPlayId={this.setCurrentPlayId}
            />
          </div>
          <LoadMoreSpinner show={clips_loader} />
        </React.Fragment>
      </Layout>
    );
  }
}

Aggregated.propTypes = {
  clips_loader: PropTypes.bool.isRequired,
  clips_all: PropTypes.object,
  clips_all_array: PropTypes.array.isRequired,
  getClips: PropTypes.func.isRequired,
  getPlayId: PropTypes.func.isRequired,
  play_id: PropTypes.string,
  getClipsLiveSuccess: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  clipsLive: PropTypes.object,
  getClipsLive: PropTypes.func.isRequired
};

Aggregated.defaultProps = {
  clips_all: undefined,
  play_id: undefined,
  clipsLive: undefined
};

const mapStateToProps = ({ clips }) => {
  const {
    clips_loader,
    clips_all,
    clips_all_array,
    play_id,
    clipsLive
  } = clips;
  return {
    clips_loader,
    clips_all,
    clips_all_array,
    play_id,
    clipsLive
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClips: params => dispatch(getClips(params)),
    getPlayId: params => dispatch(getPlayId(params)),
    getClipsLiveSuccess: params => dispatch(getClipsLiveSuccess(params)),
    getClipsLive: params => dispatch(getClipsLive(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Aggregated);
