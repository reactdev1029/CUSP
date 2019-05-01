const buildUrlForMultiselect = (name, items) => {
  const ids = items.reduce((acc, item, index) => {
    if (index === 0) {
      return `${acc}${item.value}`;
    }

    return `${acc},${item.value}`;
  }, `&${name}_ids=`);

  return items.reduce((acc, item, index) => {
    if (index === 0) {
      return `${acc}${item.label}`;
    }

    return `${acc},${item.label}`;
  }, `${ids}&${name}_names=`);
};

const getLinkToSearchPage = filters => {
  const url = Object.keys(filters).reduce((acc, key) => {
    if (key === 'startDate' && filters[key]) {
      const startDate = filters[key].unix();

      return `${acc}&from_timestamp=${startDate}`;
    }

    if (key === 'endDate' && filters[key]) {
      const endDate = filters[key].unix();

      return `${acc}&to_timestamp=${endDate}`;
    }

    if (key === 'rating' && filters[key]) {
      return `${acc}&rating=${filters[key]}`;
    }

    if (key === 'clipType' && filters[key]) {
      return `${acc}&clip_type=${filters[key]}`;
    }

    if (
      filters[key] &&
      (key !== 'startDate' ||
        key !== 'endDate' ||
        key !== 'rating' ||
        key !== 'clipType') &&
      filters[key][0]
    ) {
      const id = filters[key][0].value;
      const name = filters[key][0].label;
      if (key === 'league') {
        return `?${key}_id=${id}&${key}_name=${name}`;
      }

      if (filters[key].length > 0) {
        return `${acc}${buildUrlForMultiselect(key, filters[key])}`;
      }

      return `${acc}&${key}_ids=${id}&${key}_names=${name}`;
    }

    return acc;
  }, '?');

  return url;
};

const linkToSearchFromHomepage = (id = '', name = '') =>
  `/search?league_id=${id}&league_name=${name}`;

// TODO: refactor this totally. Make more functional
const getGamesScheduleUrl = params => {
  let url = `/api/clips/games/schedule`;
  if (params) {
    const { start_time, end_time, cursor, limit } = params;
    url += `?end_time=${end_time}${
      start_time ? `&start_time=${start_time}` : ''
    }${limit ? `&limit=${limit}` : ''}${cursor ? `&cursor=${cursor}` : ''}`;
  }
  return url;
};

export default {
  getLinkToSearchPage,
  linkToSearchFromHomepage,
  getGamesScheduleUrl
};
