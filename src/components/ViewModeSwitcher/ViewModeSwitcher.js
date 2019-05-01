import React from 'react';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewListIcon from '@material-ui/icons/ViewList';

import './style.scss';

class ViewModeSwitcher extends React.Component {
  state = {
    viewMode: true
  };

  handleChange = () => {
    const { viewMode } = this.state;
    const { viewModeSwitchHandler } = this.props;

    viewModeSwitchHandler();
    this.setState({ viewMode: !viewMode });
  };

  render() {
    const { viewMode } = this.state;

    return (
      <button type="button" className="switcher" onClick={this.handleChange}>
        <div
          className={`switcher-button switcher-button--left ${
            viewMode ? 'active' : ''
          }`}
        >
          <ViewModuleIcon />
        </div>
        <div
          className={`switcher-button switcher-button--right ${
            !viewMode ? 'active' : ''
          }`}
        >
          <ViewListIcon />
        </div>
      </button>
    );
  }
}

export default ViewModeSwitcher;
