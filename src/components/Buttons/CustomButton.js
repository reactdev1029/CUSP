import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    }
  }
});

const CustomButton = ({ children, classes, onClick }) => {
  return (
    <Button className={classes.button} onClick={onClick}>
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func
};

CustomButton.defaultProps = {
  onClick: () => {}
};

export default withStyles(styles)(CustomButton);
