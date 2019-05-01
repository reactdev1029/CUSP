import moment from 'moment';

const generateFilterArray = (ids, names) => {
  const values = ids.split(',');
  const labels = names.split(',');

  return values.reduce((acc, item, index) => {
    return [...acc, { value: item, label: labels[index] }];
  }, []);
};

const setFiltersFromUrl = (params, filters) => {
  let newFilters = {};

  if (params.league_id) {
    const { league_id, league_name } = params;

    newFilters = {
      ...filters,
      ...newFilters,
      league: generateFilterArray(league_id, league_name)
    };
  }
  if (params.team_ids) {
    const { team_ids, team_names } = params;

    newFilters = {
      ...filters,
      ...newFilters,
      team: generateFilterArray(team_ids, team_names)
    };
  }
  if (params.game_ids) {
    const { game_ids, game_names } = params;

    newFilters = {
      ...filters,
      ...newFilters,
      game: generateFilterArray(game_ids, game_names)
    };
  }
  if (params.player_ids) {
    const { player_ids, player_names } = params;

    newFilters = {
      ...filters,
      ...newFilters,
      player: generateFilterArray(player_ids, player_names)
    };
  }
  if (params.action_type_ids) {
    const { action_type_ids, action_type_names } = params;

    newFilters = {
      ...filters,
      ...newFilters,
      action_type: generateFilterArray(action_type_ids, action_type_names)
    };
  }
  if (params.from_timestamp) {
    newFilters = {
      ...filters,
      ...newFilters,
      startDate: moment.unix(params.from_timestamp)
    };
  }
  if (params.to_timestamp) {
    newFilters = {
      ...filters,
      ...newFilters,
      endDate: moment.unix(params.to_timestamp)
    };
  }
  if (params.rating) {
    newFilters = {
      ...filters,
      ...newFilters,
      rating: params.rating
    };
  }
  if (params.clip_type) {
    newFilters = {
      ...filters,
      ...newFilters,
      clipType: params.clip_type
    };
  }

  return newFilters;
};

const getFilterCounter = (filters, filterName) => filters[filterName].length;

export default {
  setFiltersFromUrl,
  getFilterCounter
};
