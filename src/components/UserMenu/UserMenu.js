import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Fab,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  withStyles,
  ClickAwayListener
} from '@material-ui/core';
import UserIcon from '@material-ui/icons/Person';
import UsersIcon from '@material-ui/icons/People';
import LogOut from '@material-ui/icons/ExitToApp';

import { userSignOut } from '../../actions/Auth';

const styles = {
  popper: {
    zIndex: 2010
  },
  paper: {
    margin: '5px 15px 0 0'
  },
  menuList: {
    width: '200px'
  },
  link: {
    display: 'flex',
    '&:hover': {
      textDecoration: 'none'
    }
  }
};

const menuItems = [
  { name: 'Profile', link: '/profile', icon: <UserIcon /> },
  { name: 'Users', link: '/', icon: <UsersIcon /> }
];

class UserMenu extends React.Component {
  state = {
    userMenuShow: false
  };

  handleToggle = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      userMenuShow: !state.userMenuShow,
      anchorEl: currentTarget
    }));
  };

  handleClose = event => {
    const { anchorEl } = this.state;

    if (anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ userMenuShow: false });
  };

  userLogoutHandler = () => {
    const { userLogout } = this.props;

    userLogout();
  };

  render() {
    const { userMenuShow, anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Fab
          color="secondary"
          size="small"
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <UserIcon />
        </Fab>
        <Popper
          open={userMenuShow}
          anchorEl={anchorEl}
          className={classes.popper}
          transition
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList className={classes.menuList}>
                    {menuItems.map(item => (
                      <MenuItem key={item.name}>
                        <Link to={item.link} className={classes.link}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText inset primary={item.name} />
                        </Link>
                      </MenuItem>
                    ))}
                    <MenuItem onClick={this.userLogoutHandler}>
                      <ListItemIcon>
                        <LogOut />
                      </ListItemIcon>
                      <ListItemText inset primary="Logout" />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  userLogout: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(userSignOut())
});

const userMenuWithStyles = withStyles(styles)(UserMenu);

export default connect(
  null,
  mapDispatchToProps
)(userMenuWithStyles);
