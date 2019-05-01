import moment from 'moment';

export const getVideoTime = clips => {
  const min = Math.round(moment.duration(getMsDiff(clips)).asMinutes());
  const hour = Math.round(moment.duration(getMsDiff(clips)).asHours());
  const day = Math.round(moment.duration(getMsDiff(clips)).asDays());
  const week = Math.round(moment.duration(getMsDiff(clips)).asWeeks());
  const month = Math.round(moment.duration(getMsDiff(clips)).asMonths());

  let publishDate = '';
  if (hour < 1) publishDate = `${min}min ago`;
  if (hour >= 1 && hour < 24 && day <= 1) publishDate = `${hour}h ago`;
  if (hour >= 24 && day >= 1 && day <= 6) publishDate = `${day}d ago`;
  if (day >= 7 && week >= 1 && week <= 3) publishDate = `${week}w ago`;
  if (week >= 4 || month >= 1) publishDate = `${month}m ago`;

  return publishDate;
};

const getMsDiff = clips => {
  let ms = null;
  if (clips.timestamp) {
    ms = moment(moment(), 'DD/MM/YYYY HH:mm:ss').diff(
      moment(moment.unix(clips.timestamp), 'DD/MM/YYYY HH:mm:ss')
    );
  } else if (clips.publishDate) {
    ms = moment(moment(), 'DD/MM/YYYY HH:mm:ss').diff(
      moment(moment.unix(clips.publishDate), 'DD/MM/YYYY HH:mm:ss')
    );
  }

  return ms;
};
