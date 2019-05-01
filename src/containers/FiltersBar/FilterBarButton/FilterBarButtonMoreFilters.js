import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import {
  Button,
  Fab,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Badge,
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  withStyles
} from '@material-ui/core';
import ChevronDown from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';

import styles from './styles';

const ratings = ['1', '2', '3', '4', '5'];
const clipTypes = ['PlayByPlay', 'RuleBased'];

class FilterBarButtonMoreFilters extends PureComponent {
  state = {
    open: false,
    rating: '',
    clipType: ''
  };

  static getDerivedStateFromProps(props, state) {
    const { rating, clipType } = props;

    if (
      rating &&
      !isEqual(rating, state.rating) &&
      clipType &&
      !isEqual(clipType, state.clipType)
    ) {
      return {
        ...state,
        rating,
        clipType
      };
    }
    if (rating && !isEqual(rating, state.rating)) {
      return {
        ...state,
        rating
      };
    }
    if (clipType && !isEqual(clipType, state.clipType)) {
      return {
        ...state,
        clipType
      };
    }

    return state;
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleChange = name => event => {
    const { setFilters } = this.props;
    const { value } = event.target;

    this.setState({ [name]: value });
    setFilters(name, value);
  };

  clearFilters = () => {
    const { clearFilters } = this.props;
    this.setState({
      open: false,
      rating: '',
      clipType: ''
    });
    clearFilters();
  };

  countBadge = () => {
    const { rating, clipType } = this.state;
    let counter = 0;

    if (rating && clipType) {
      counter = 2;
    } else if (rating || clipType) {
      counter = 1;
    }

    return counter;
  };

  render() {
    const { classes, disabled } = this.props;
    const { open, rating, clipType } = this.state;

    return (
      <React.Fragment>
        <div className={classes.buttonWrapper}>
          {(rating || clipType) && (
            <Fab
              size="small"
              color="secondary"
              className={classes.clearValue}
              onClick={this.clearFilters}
            >
              <CloseIcon className={classes.smallIcon} />
            </Fab>
          )}
          <Badge
            color="secondary"
            badgeContent={this.countBadge()}
            className={classes.badgeContainer}
            classes={{
              root: classes.badgeContainer,
              badge: classes.badge
            }}
          >
            <Button
              className={classes.button}
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-haspopup="true"
              disabled={disabled}
              onClick={this.handleToggle}
            >
              <span className={classes.buttonContent}>
                More Filters
                <ChevronDown className={classes.chevron} />
              </span>
            </Button>
          </Badge>
          <Popper
            className={classes.popper}
            open={open}
            anchorEl={this.anchorEl}
            placement="bottom-start"
            transition
          >
            {({ TransitionProps }) => (
              <Grow {...TransitionProps}>
                <Paper className={classes.paper}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <div className={classes.radioButtonsRoot}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Rating</FormLabel>
                        <RadioGroup
                          aria-label="rating"
                          name="rating"
                          value={rating}
                          onChange={this.handleChange('rating')}
                        >
                          {ratings.map(item => (
                            <FormControlLabel
                              value={item}
                              control={<Radio color="primary" />}
                              label={item}
                              key={item}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormControl component="fieldset">
                        <FormLabel
                          component="legend"
                          className={classes.alignRight}
                        >
                          Clip type
                        </FormLabel>
                        <RadioGroup
                          aria-label="clipType"
                          name="rating"
                          value={clipType}
                          onChange={this.handleChange('clipType')}
                        >
                          {clipTypes.map(item => (
                            <FormControlLabel
                              value={item}
                              control={<Radio color="primary" />}
                              label={item}
                              key={item}
                              labelPlacement="start"
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </React.Fragment>
    );
  }
}

FilterBarButtonMoreFilters.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  clearable: PropTypes.bool,
  showInputs: PropTypes.bool
};

FilterBarButtonMoreFilters.defaultProps = {
  clearable: true,
  showInputs: false
};

const filterButtonMoreFiltersWithStyles = withStyles(styles)(
  FilterBarButtonMoreFilters
);

export default filterButtonMoreFiltersWithStyles;
