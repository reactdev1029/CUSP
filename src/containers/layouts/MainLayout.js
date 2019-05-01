import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { withStyles, Paper, LinearProgress } from '@material-ui/core';

import Header from '../../components/Header/index';
import { checkUser } from '../../actions';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  mainContent: {
    marginTop: 64,
    padding: '12px 24px 24px 24px'
  },
  progressBar: {
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    width: '100%'
  }
};

class MainLayout extends React.Component {
  componentDidMount() {
    const { isLoggedIn } = this.props;

    isLoggedIn();
  }

  render() {
    const { classes, loaderCounter, children } = this.props;

    return (
      <Paper elevation={0} className="app-container">
        {loaderCounter > 0 && (
          <LinearProgress className={classes.progressBar} />
        )}
        <div className="app-main-container">
          <Header />
          <main className={classes.mainContent}>
            <div className="app-main-content">{children}</div>
          </main>
        </div>
        <ToastContainer />
      </Paper>
    );
  }
}

MainLayout.propTypes = {
  isLoggedIn: PropTypes.func.isRequired,
  loaderCounter: PropTypes.number.isRequired,
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  loaderCounter: state.loader.loaderCounter
});

const mapDispatchToProps = dispatch => {
  return {
    isLoggedIn: () => dispatch(checkUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MainLayout));
