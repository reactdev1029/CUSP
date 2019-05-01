export const cutTextWithDots = (text, number) => `${text.slice(0, number)}...`;

export const getVideoTitle = (video, number) => {
  let title = '';
  title = video.game_name ? `${video.title}, ${video.game_name}` : video.title;

  return title.length > number ? cutTextWithDots(title, number) : title;
};

export const tagsArrayToText = tags => {
  return tags.reduce((acc, item) => {
    return `${acc} ${item},`;
  }, '');
};

export const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);
