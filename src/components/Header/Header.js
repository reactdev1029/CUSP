import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { withStyles, AppBar, Toolbar } from '@material-ui/core';

import FiltersBar from '../../containers/FiltersBar';
import UserMenu from '../UserMenu';
import styles from './styles';

class Header extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.leftHeader}>
            <div className={classes.fullHeight}>
              <Link className={classes.headerLogo} to="/">
                LOGO
              </Link>
              <Toolbar className={classes.filtersToolbar}>
                <FiltersBar />
              </Toolbar>
            </div>
          </div>
          <UserMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

const headerWithStyles = withStyles(styles)(Header);

export default withRouter(headerWithStyles);
