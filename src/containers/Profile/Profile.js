import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Layout from '../layouts';
import { getPlayId, getUserProfile, getClipsSearches } from '../../actions';
import UserInfo from './UserInfo';
import UserContent from './UserContent';
import { styles } from './styles';

class Profile extends React.PureComponent {
  componentDidMount() {
    const { getUserProfile, getClipsSearches } = this.props;
    getUserProfile();
    getClipsSearches();
  }

  setCurrentPlayId = playId => {
    const { getPlayId } = this.props;

    getPlayId(playId);
  };

  render() {
    const { profileLoading, userProfile, play_id, classes, theme } = this.props;

    return (
      <Layout>
        <React.Fragment>
          {!profileLoading && userProfile && (
            <Grid container direction="column">
              <UserInfo userProfile={userProfile} classes={classes} />
              <UserContent
                myVideos={[]}
                clipsSearches={[]}
                setCurrentPlayId={this.setCurrentPlayId}
                play_id={play_id}
                classes={classes}
                theme={theme}
              />
            </Grid>
          )}
        </React.Fragment>
      </Layout>
    );
  }
}

Profile.propTypes = {
  profileLoading: PropTypes.bool.isRequired,
  userProfile: PropTypes.object,
  getUserProfile: PropTypes.func.isRequired,
  getPlayId: PropTypes.func.isRequired,
  play_id: PropTypes.string,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  getClipsSearches: PropTypes.func.isRequired,
  clipsSearches: PropTypes.array
};

Profile.defaultProps = {
  userProfile: undefined,
  play_id: undefined,
  clipsSearches: []
};

const mapStateToProps = state => {
  return {
    userProfile: state.profile.userProfile,
    profileLoading: state.profile.profileLoading,
    play_id: state.clips.play_id,
    clipsSearches: state.clips.clipsSearches
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: () => dispatch(getUserProfile()),
    getPlayId: params => dispatch(getPlayId(params)),
    getClipsSearches: () => dispatch(getClipsSearches())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Profile));
