import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import {
  getClipsLatest,
  getGamesSchedule,
  getClips,
  clipsClear,
  getPlayId,
  getClipsLive
} from '../../actions';
import Layout from '../layouts';
import LeaguesView from './LeaguesView';
import GamesScheduleView from './GamesScheduleView';
import LiveRecentGames from './LiveRecentGames';

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      nextLink: undefined,
      btnState: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.clips_all && prevState.btnState) {
      return {
        nextLink: `/aggregated`,
        btnState: false
      };
    }
    return null;
  }

  componentDidMount() {
    const {
      clipsClear,
      getClipsLatest,
      getGamesSchedule,
      getClipsLive
    } = this.props;
    clipsClear();
    getClipsLatest();
    getGamesSchedule();
    getClipsLive();
  }

  leagueClick = league_id => () => {
    const { clipsClear, getClips } = this.props;
    let params = {
      league_id
    };
    getClips(params);
    clipsClear();
    this.setState({ btnState: true });
  };

  setCurrentPlayId = play_id => {
    const { getPlayId } = this.props;
    getPlayId(play_id);
  };

  render() {
    const {
      clips_latest,
      games_schedule,
      play_id,
      clips_all,
      clipsLive
    } = this.props;
    const { nextLink } = this.state;

    if (nextLink)
      return (
        <Redirect
          to={{
            pathname: nextLink,
            state: { clips_all, is_live: false }
          }}
        />
      );

    return (
      <Layout>
        <div className="app-wrapper loader-container">
          <div className="animated slideInUpTiny animation-duration-3">
            <Grid container spacing={32}>
              <Grid item xs={12} md={9}>
                {clipsLive && clipsLive.results.length > 0 && (
                  <LiveRecentGames
                    live_clips={clipsLive}
                    setCurrentPlayId={this.setCurrentPlayId}
                    play_id={play_id}
                  />
                )}
                <LeaguesView
                  clips_latest={clips_latest}
                  leagueClick={this.leagueClick}
                  setCurrentPlayId={this.setCurrentPlayId}
                  play_id={play_id}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <GamesScheduleView games_schedule={games_schedule} />
              </Grid>
            </Grid>
          </div>
        </div>
      </Layout>
    );
  }
}

Homepage.propTypes = {
  clips_latest: PropTypes.array,
  clips_all: PropTypes.object,
  games_schedule: PropTypes.array,
  getClipsLatest: PropTypes.func.isRequired,
  getGamesSchedule: PropTypes.func.isRequired,
  getClips: PropTypes.func.isRequired,
  clipsClear: PropTypes.func.isRequired,
  getPlayId: PropTypes.func.isRequired,
  play_id: PropTypes.string,
  getClipsLive: PropTypes.func.isRequired,
  clipsLive: PropTypes.object
};

Homepage.defaultProps = {
  clips_latest: undefined,
  clips_all: undefined,
  games_schedule: undefined,
  play_id: undefined,
  clipsLive: undefined
};

const mapStateToProps = ({ clips }) => {
  const { clips_latest, clips_all, games_schedule, play_id, clipsLive } = clips;
  return {
    clips_latest,
    clips_all,
    games_schedule,
    play_id,
    clipsLive
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClipsLatest: () => dispatch(getClipsLatest()),
    getGamesSchedule: params => dispatch(getGamesSchedule(params)),
    getClips: params => dispatch(getClips(params)),
    clipsClear: () => dispatch(clipsClear()),
    getPlayId: params => dispatch(getPlayId(params)),
    getClipsLive: () => dispatch(getClipsLive())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
