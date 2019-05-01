import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';

import {
  setFilters,
  getLeagues,
  getTeams,
  getSearchedVideos,
  getGames,
  getPlayers,
  getActionTypes
} from '../../actions';
import urlUtil from '../../util/urlUtil';
import filtersUtil from '../../util/filtersUtil';
import FilterButton from './FilterBarButton';
import FilterButtonCalendar from './FilterBarButton/FilterBarButtonCalendar';
import FilterBarButtonMoreFilters from './FilterBarButton/FilterBarButtonMoreFilters';

class FiltersBar extends React.PureComponent {
  static getDerivedStateFromProps(props) {
    const { filters } = props;
    if (
      filters.league.length > 0 &&
      decodeURIComponent(props.location.search) !==
        urlUtil.getLinkToSearchPage(props.filters)
    ) {
      return {
        disableApplyButton: false
      };
    }

    return {
      disableApplyButton: true
    };
  }

  static buildIdsForRequest(array) {
    return array.reduce((acc, item) => {
      if (acc) {
        return `${acc},${item.value}`;
      }

      return `${acc}${item.value}`;
    }, '');
  }

  state = {
    disableApplyButton: true
  };

  getAllTeamsList = () => {
    const { getAllTeams, filters } = this.props;

    getAllTeams(filters.league[0].value);
  };

  getAllGamesList = () => {
    const { getAllGames, filters } = this.props;
    const teamIds = FiltersBar.buildIdsForRequest(filters.team);

    getAllGames(filters.league[0].value, teamIds);
  };

  getAllPlayersList = () => {
    const { getAllPlayers, filters } = this.props;
    const teamIds = filters.team[0] ? filters.team[0].value : '';

    getAllPlayers(filters.league[0].value, teamIds);
  };

  getAllActionTypesList = () => {
    const { getAllActionTypes, filters } = this.props;

    getAllActionTypes(filters.league[0].value);
  };

  setSelectedFilters = name => value => {
    const { setFilters, filters } = this.props;
    const newValue = {
      ...filters,
      [name]: value
    };

    setFilters(newValue);
  };

  setSelectedDateFilter = ({ startDate, endDate }) => {
    const { setFilters, filters } = this.props;
    const newValue = {
      ...filters,
      startDate,
      endDate
    };

    setFilters(newValue);
  };

  setSelectedLeagueFilter = league => {
    const { setFilters, filters, leagueId } = this.props;
    let newFilters = {
      ...filters
    };

    if (league[0].value !== leagueId) {
      newFilters = {
        ...newFilters,
        league,
        team: [],
        game: [],
        player: [],
        action_type: []
      };
    }

    setFilters(newFilters);
  };

  setSelectedTeamFilter = team => {
    const { setFilters, filters } = this.props;
    const newFilters = {
      ...filters,
      team,
      game: [],
      player: []
    };

    setFilters(newFilters);
  };

  setSelectedMoreFilters = (name, value) => {
    const { setFilters, filters } = this.props;

    setFilters({
      ...filters,
      [name]: value
    });
  };

  clearSelectedMoreFilters = () => {
    const { setFilters, filters } = this.props;

    setFilters({
      ...filters,
      rating: 0,
      clipType: ''
    });
  };

  updateVideos = () => {
    const { getSearchedVideos, filters } = this.props;
    const url = urlUtil.getLinkToSearchPage(filters);

    window.scrollTo(0, 0);
    getSearchedVideos(url);
  };

  render() {
    const {
      filters,
      leagues,
      leaguesLoading,
      teams,
      teamsLoading,
      games,
      gamesLoading,
      players,
      playersLoading,
      actionTypes,
      actionTypesLoading,
      leagueId,
      getAllLeagues
    } = this.props;
    const { disableApplyButton } = this.state;

    return (
      <React.Fragment>
        <FilterButton
          name="League"
          clearable={false}
          filters={filters}
          options={leagues}
          loading={leaguesLoading}
          selectedValue={filters.league}
          loadOptions={getAllLeagues}
          setSelectedFilters={this.setSelectedLeagueFilter}
          getBadgeNumber={filtersUtil.getFilterCounter(filters, 'league')}
        />
        <FilterButton
          name="Team"
          multiSelect
          filters={filters}
          options={teams}
          loading={teamsLoading}
          selectedValue={filters.team}
          loadOptions={this.getAllTeamsList}
          loadOptionsAgain={
            filters.league[0] ? leagueId === filters.league[0].value : true
          }
          disabled={filters.league.length < 1}
          setSelectedFilters={this.setSelectedTeamFilter}
          getBadgeNumber={filtersUtil.getFilterCounter(filters, 'team')}
        />
        <FilterButton
          name="Game"
          multiSelect
          filters={filters}
          options={games}
          loading={gamesLoading}
          selectedValue={filters.game}
          loadOptions={this.getAllGamesList}
          disabled={filters.league.length < 1}
          setSelectedFilters={this.setSelectedFilters('game')}
          getBadgeNumber={filtersUtil.getFilterCounter(filters, 'game')}
        />
        <FilterButton
          name="Player"
          multiSelect
          filters={filters}
          options={players}
          loading={playersLoading}
          selectedValue={filters.player}
          loadOptions={this.getAllPlayersList}
          disabled={filters.league.length < 1}
          setSelectedFilters={this.setSelectedFilters('player')}
          getBadgeNumber={filtersUtil.getFilterCounter(filters, 'player')}
        />
        <FilterButton
          name="Action type"
          multiSelect
          filters={filters}
          options={actionTypes}
          loading={actionTypesLoading}
          selectedValue={filters.action_type}
          loadOptions={this.getAllActionTypesList}
          disabled={filters.league.length < 1}
          setSelectedFilters={this.setSelectedFilters('action_type')}
          getBadgeNumber={filtersUtil.getFilterCounter(filters, 'action_type')}
        />
        <FilterButtonCalendar
          setSelectedDateFilter={this.setSelectedDateFilter}
          disabled={filters.league.length < 1}
          startDate={filters.startDate}
          endDate={filters.endDate}
        />
        <FilterBarButtonMoreFilters
          disabled={filters.league.length < 1}
          setFilters={this.setSelectedMoreFilters}
          clearFilters={this.clearSelectedMoreFilters}
          rating={filters.rating}
          clipType={filters.clipType}
        />
        {filters.league.length > 0 && (
          <Button
            component={Link}
            variant="contained"
            color="secondary"
            to={`/search${urlUtil.getLinkToSearchPage(filters)}`}
            disabled={disableApplyButton}
            onClick={this.updateVideos}
          >
            Apply
          </Button>
        )}
      </React.Fragment>
    );
  }
}

FiltersBar.propTypes = {
  clipsAll: PropTypes.shape({}),
  filters: PropTypes.shape({}).isRequired,
  setFilters: PropTypes.func.isRequired,
  getAllLeagues: PropTypes.func.isRequired,
  getAllTeams: PropTypes.func.isRequired,
  getAllGames: PropTypes.func.isRequired,
  getAllPlayers: PropTypes.func.isRequired,
  getSearchedVideos: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    videosData: state.structuredSearch.searchedVideosData,
    clipsAll: state.clips.clips_all,
    filters: state.filters.filters,
    leagues: state.filters.leagues,
    leaguesLoading: state.filters.leaguesLoading,
    leagueId: state.filters.leagueId,
    teams: state.filters.teams,
    teamsLoading: state.filters.teamsLoading,
    teamIds: state.filters.teamIds,
    games: state.filters.games,
    gamesLoading: state.filters.gamesLoading,
    players: state.filters.players,
    playersLoading: state.filters.playersLoading,
    actionTypes: state.filters.actionTypes,
    actionTypesLoading: state.filters.actionTypesLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilters: params => dispatch(setFilters(params)),
    getAllLeagues: () => dispatch(getLeagues()),
    getAllTeams: leagueId => dispatch(getTeams(leagueId)),
    getAllGames: (leagueId, teamIds) => dispatch(getGames(leagueId, teamIds)),
    getAllPlayers: (leagueId, teamIds) =>
      dispatch(getPlayers(leagueId, teamIds)),
    getAllActionTypes: leagueId => dispatch(getActionTypes(leagueId)),
    getSearchedVideos: queryParams => dispatch(getSearchedVideos(queryParams))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FiltersBar));
