import React from 'react';
import PropTypes from 'prop-types';

const GridFake = ({ number }) => (
  <React.Fragment>
    <div className="videos-grid videos-grid--fake">
      <div className="videos-grid-title">
        <div className="fake title" />
        <div className="fake title" />
      </div>
      {number.map(item => (
        <div className="videos-grid-item videos-grid-item--fake" key={item}>
          <div className="video-container--fake fake" />
          <div className="line fake" />
          <div className="line fake" />
          <div className="line fake" />
        </div>
      ))}
    </div>
  </React.Fragment>
);

GridFake.propTypes = {
  number: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default GridFake;
