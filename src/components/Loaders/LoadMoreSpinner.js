import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

import './LoadMoreSpinner.scss';

class LoadMoreSpinner extends React.PureComponent {
  render() {
    const { show } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div className="load-more-spinner-container">
        <CircularProgress />
      </div>
    );
  }
}

LoadMoreSpinner.propTypes = {
  show: PropTypes.bool
};

LoadMoreSpinner.defaultProps = {
  show: false
};

export default LoadMoreSpinner;
