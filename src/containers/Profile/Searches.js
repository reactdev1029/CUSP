import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CropDinIcon from '@material-ui/icons/CropDin';
import DeleteIcon from '@material-ui/icons/Delete';

const Searches = ({ searches, classes, tabIndex }) => (
  <React.Fragment>
    {searches.length > 0 ? (
      searches.map((name, index) => (
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.searchesRoot}
          key={`${name}-${index}`}
        >
          <Typography variant="subtitle2">{name}</Typography>
          <Grid item>
            <Grid container direction="row">
              <div className={classes.button}>
                <CropDinIcon fontSize="small" />
              </div>
              <div className={classes.button}>
                <EditIcon fontSize="small" />
              </div>
              <div className={classes.button}>
                <DeleteIcon fontSize="small" />
              </div>
            </Grid>
          </Grid>
        </Grid>
      ))
    ) : (
      <Typography variant="subtitle2">No searches are shown.</Typography>
    )}
  </React.Fragment>
);

Searches.propTypes = {
  searches: PropTypes.array,
  classes: PropTypes.object.isRequired,
  tabIndex: PropTypes.number.isRequired
};

Searches.defaultProps = {
  searches: []
};

export default Searches;
