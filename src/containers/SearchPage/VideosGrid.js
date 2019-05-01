import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import ViewModeSwitcher from '../../components/ViewModeSwitcher';
import VideoThumbNew from '../../components/VideoThumbNew';
import './seach-page.scss';

class SearchPage extends React.PureComponent {
  state = {
    viewMode: true
  };

  viewModeSwitchHandler = () => {
    const { viewMode } = this.state;

    this.setState({ viewMode: !viewMode });
  };

  render() {
    const { videos, playId, setCurrentPlayId } = this.props;
    const { viewMode } = this.state;

    return (
      <React.Fragment>
        {videos.length > 0 ? (
          <React.Fragment>
            <div>
              <Typography variant="h6" gutterBottom>
                Results for {videos.length > 0 && videos[0].league.league_name}
              </Typography>
              <ViewModeSwitcher
                viewModeSwitchHandler={this.viewModeSwitchHandler}
              />
            </div>
            <div className={`videos-grid ${viewMode ? 'grid' : 'list'}`}>
              {videos.map(item => (
                <div className="videos-grid-item" key={item.clip_id}>
                  <VideoThumbNew
                    clips={item}
                    setCurrentPlayId={setCurrentPlayId}
                    playId={playId}
                    listMode={!viewMode}
                  />
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <div>
            <Typography variant="h6" gutterBottom>
              No results
            </Typography>
          </div>
        )}
      </React.Fragment>
    );
  }
}

SearchPage.propTypes = {};

export default SearchPage;
