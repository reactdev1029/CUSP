export const transformLeaguesForDropdown = item => {
  const key = Object.keys(item);

  return {
    value: item.id,
    label: item[key[1]]
  };
};

export const transformForDropdown = items =>
  items.map(item => transformLeaguesForDropdown(item));
