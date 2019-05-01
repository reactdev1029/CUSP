import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Avatar, Grid, Typography, Button } from '@material-ui/core';

const UserInfo = ({ userProfile, classes }) => {
  const userInfo = [
    { name: userProfile.username, variant: 'h3' },
    {
      name: `${userProfile.first_name} ${userProfile.last_name}`,
      variant: 'subtitle2'
    },
    { name: userProfile.email, variant: 'subtitle2' }
  ];
  const buttons = ['Edit', 'Reset Password', 'Disable'];
  const userDetail = [
    {
      title: 'birthdate',
      value: userProfile.birthday
        ? moment(userProfile.birthday).format('MMMM D, YYYY')
        : ''
    },
    { title: 'role', value: userProfile.permissions_group.title },
    {
      title: 'content permissions',
      value: 'All'
    }
  ];

  return (
    <React.Fragment>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Avatar
            alt={userProfile.avatar.sources[0].title}
            src={userProfile.avatar.sources[0].url}
            className={classes.avatar}
          />
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="space-between"
            className={classes.userInfoRoot}
          >
            <Grid item>
              {userInfo.map(item => (
                <Typography
                  variant={item.variant}
                  className={classes.textMargin}
                  key={item.name}
                >
                  {item.name}
                </Typography>
              ))}
            </Grid>
            <Grid item>
              {buttons.map(name => (
                <Button
                  key={name}
                  variant="contained"
                  size="medium"
                  color="primary"
                  disabled
                  className={classes.btnMargin}
                >
                  {name}
                </Button>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column" justify="center">
        <Grid item>
          {userDetail.map(item => (
            <Grid container direction="row" key={item.title}>
              <div className={classes.nameText}>
                <Typography variant="body1">{item.title}</Typography>
              </div>
              <div className={classes.nameText}>
                <Typography variant="subtitle2">{item.value}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

UserInfo.propTypes = {
  userProfile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default UserInfo;
