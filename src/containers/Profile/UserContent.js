import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab } from '@material-ui/core';

import TabContainer from './TabContainer';
import MyPosts from './MyPosts';
import MyVideos from './MyVideos';
import Searches from './Searches';

class UserContent extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const {
      classes,
      theme,
      setCurrentPlayId,
      play_id,
      clipsSearches
    } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <div className={classes.userContentRoot}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabs}
          >
            <Tab label="My Videos" />
            <Tab label="Clips" />
            <Tab label="Searches" />
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={this.handleChangeIndex}
          >
            <MyPosts
              theme={theme}
              setCurrentPlayId={setCurrentPlayId}
              playId={play_id}
              tabIndex={value}
            />
            <MyVideos
              theme={theme}
              setCurrentPlayId={setCurrentPlayId}
              play_id={play_id}
              tabIndex={value}
            />
            <TabContainer dir={theme.direction}>
              {value === 2 && (
                <Searches
                  classes={classes}
                  searches={clipsSearches}
                  tabIndex={value}
                />
              )}
            </TabContainer>
          </SwipeableViews>
        </div>
      </React.Fragment>
    );
  }
}

UserContent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  myVideos: PropTypes.array,
  setCurrentPlayId: PropTypes.func.isRequired,
  play_id: PropTypes.string,
  clipsSearches: PropTypes.array
};

UserContent.defaultProps = {
  myVideos: [],
  clipsSearches: []
};

export default UserContent;
