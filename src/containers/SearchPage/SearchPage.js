import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import {
  getSearchedVideos,
  getSearchedVideosNext,
  getPlayId,
  setFilters,
  getLeagues,
  unsetFilters,
  getTeams,
  getGames,
  getPlayers,
  getActionTypes
} from '../../actions';
import filtersUtil from '../../util/filtersUtil';
import scrollUtil from '../../util/scrollUtil';
import GridFake from './GridFake';
import VideosGrid from './VideosGrid';
import Layout from '../layouts';
import LoadMoreSpinner from '../../components/Loaders';
import './seach-page.scss';

class SearchPage extends React.PureComponent {
  componentDidMount() {
    const { getSearchedVideos, location } = this.props;

    this.loadDataForFilters();

    getSearchedVideos(location.search);

    window.addEventListener('scroll', this.windowScrollHandler, {
      passive: true
    });
  }

  componentWillUnmount() {
    this.unsetFilters();

    window.removeEventListener('scroll', this.windowScrollHandler);
  }

  windowScrollHandler = () => {
    const { videosData, loading } = this.props;

    if (scrollUtil.detectScrollAtBottom()) {
      if (videosData.next && !loading) {
        this.loadNextVideos(videosData.next);
      }
    }
  };

  loadNextVideos = nextParam => {
    const { location, getSearchedVideosNext } = this.props;
    const url = `${location.search}&cursor=${nextParam}`;

    getSearchedVideosNext(url);
  };

  loadDataForFilters = () => {
    const {
      location,
      leagues,
      teams,
      games,
      getAllLeagues,
      getAllTeams,
      getAllGames
    } = this.props;
    const queryParams = queryString.parse(location.search);

    if (location.search && queryParams.league_id) {
      const teamIds = queryParams.team_ids || '';

      if (!leagues.length) {
        getAllLeagues();
      }
      if (!teams.length) {
        getAllTeams(queryParams.league_id);
      }
      if (!games.length) {
        getAllGames(queryParams.league_id, teamIds);
      }

      this.setSelectedFilters(queryParams);
    }
  };

  unsetFilters = () => {
    const { unsetSelectedFilters } = this.props;

    unsetSelectedFilters();
  };

  setSelectedFilters = params => {
    const { setFilters, filters } = this.props;

    setFilters(filtersUtil.setFiltersFromUrl(params, filters));
  };

  setCurrentPlayId = playId => {
    const { setPlayId } = this.props;

    setPlayId(playId);
  };

  render() {
    const { videosData, loading, loadingNextVideos, play_id } = this.props;
    const videos = videosData.results;

    return (
      <Layout>
        <React.Fragment>
          <div className="videos-grid-container">
            {!loading ? (
              <VideosGrid
                videos={videos}
                playId={play_id}
                setCurrentPlayId={this.setCurrentPlayId}
              />
            ) : (
              // Show placeholder like on YouTube
              <GridFake number={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
            )}
          </div>
          <LoadMoreSpinner show={loadingNextVideos} />
        </React.Fragment>
      </Layout>
    );
  }
}

SearchPage.propTypes = {
  getSearchedVideos: PropTypes.func.isRequired,
  getAllLeagues: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  setPlayId: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingNextVideos: PropTypes.bool.isRequired,
  unsetSelectedFilters: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    leagues: state.filters.leagues,
    teams: state.filters.teams,
    games: state.filters.games,
    players: state.filters.players,
    actionTypes: state.filters.actionTypes,
    videosData: state.structuredSearch.searchedVideosData,
    loading: state.structuredSearch.loading,
    loadingNextVideos: state.structuredSearch.loadingNextVideos,
    play_id: state.clips.play_id,
    filters: state.filters.filters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSearchedVideos: queryUrl => dispatch(getSearchedVideos(queryUrl)),
    getSearchedVideosNext: queryUrl =>
      dispatch(getSearchedVideosNext(queryUrl)),
    setPlayId: params => dispatch(getPlayId(params)),
    setFilters: params => dispatch(setFilters(params)),
    getAllLeagues: () => dispatch(getLeagues()),
    getAllTeams: leagueId => dispatch(getTeams(leagueId)),
    getAllGames: (leagueId, teamIds) => dispatch(getGames(leagueId, teamIds)),
    getAllPlayers: (leagueId, teamIds) =>
      dispatch(getPlayers(leagueId, teamIds)),
    getAllActionTypes: leagueId => dispatch(getActionTypes(leagueId)),
    unsetSelectedFilters: () => dispatch(unsetFilters())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
