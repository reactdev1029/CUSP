import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';
import CustomScrollbars from '../../util/CustomScrollbars';

const styles = (theme, props) => ({
  body_height: {
    height: window.innerHeight - 130
  }
});

const getTeam = item => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center px-2 py-3">
      <img
        src={item.team_logo}
        alt={item.team_name}
        title={item.team_name}
        width={45}
        height={45}
      />
      <span className="text-grey word-break mt-1">{item.team_name}</span>
    </div>
  );
};

const GamesScheduleView = ({ games_schedule, classes }) => {
  return (
    <div
      className={`border d-flex flex-column align-items-center ${
        classes.body_height
      }`}
    >
      <div className="d-flex flex-column align-items-center p-3">
        <h2 className="font-weight-bold">SCHEDULE</h2>
        <span>(1 week)</span>
      </div>
      <CustomScrollbars className="border-top">
        {games_schedule ? (
          games_schedule.map((item, index) => (
            <Grid
              container
              key={index}
              className="d-flex align-items-center justify-content-center border-bottom"
              spacing={0}
            >
              <Grid item xs={4}>
                {getTeam(item.game_teams[0])}
              </Grid>
              <Grid item xs={4}>
                <div className="d-flex flex-column align-items-center justify-content-center p-2">
                  <span>
                    {moment.unix(item.game_date).format('MMM D, h:mm A')}
                  </span>
                  <h3 className="font-weight-bold word-break mt-1">
                    {item.league.league_name}
                  </h3>
                  {item.is_live && (
                    <Button size="small" onClick={() => {}} variant="contained">
                      LIVE
                    </Button>
                  )}
                </div>
              </Grid>
              <Grid item xs={4}>
                {getTeam(item.game_teams[1])}
              </Grid>
            </Grid>
          ))
        ) : (
          <div className="d-flex justify-content-center w-100">
            <h3 className="mt-4">No games schedule.</h3>
          </div>
        )}
      </CustomScrollbars>
    </div>
  );
};

GamesScheduleView.propTypes = {
  games_schedule: PropTypes.array,
  classes: PropTypes.object.isRequired
};

GamesScheduleView.defaultProps = {
  games_schedule: undefined
};

const withStylesProps = styles => Component => props => {
  const Comp = withStyles(theme => styles(theme, props))(Component);
  return <Comp {...props} />;
};

export default withStylesProps(styles)(GamesScheduleView);
