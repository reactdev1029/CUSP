import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEqual } from 'lodash';
import {
  Button,
  Fab,
  Badge,
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  withStyles
} from '@material-ui/core';
import ChevronDown from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import 'react-dates/initialize';
import { DayPickerRangeController, isInclusivelyAfterDay } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import styles from './styles';

class FiltersBarButtonCalendar extends PureComponent {
  state = {
    open: false,
    startDate: null,
    endDate: null,
    endDateSelected: false,
    focusedInput: 'startDate'
  };

  static getDerivedStateFromProps(props, state) {
    const { startDate, endDate } = props;

    if (
      startDate &&
      endDate &&
      !isEqual(startDate, state.startDate) &&
      !isEqual(endDate, state.endDate)
    ) {
      return {
        ...state,
        endDateSelected: true,
        startDate,
        endDate
      };
    }
    if (startDate && !isEqual(startDate, state.startDate)) {
      return {
        ...state,
        startDate
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

  onDatesChange = ({ startDate, endDate }) => {
    const { setSelectedDateFilter } = this.props;
    const { endDateSelected } = this.state;

    if (endDateSelected) {
      this.setState({ startDate, endDate: null, endDateSelected: false });
      setSelectedDateFilter({ startDate, endDate: null });
      return;
    }

    if (endDate) {
      this.setState({ startDate, endDate, endDateSelected: true, open: false });
    } else {
      this.setState({ startDate, endDate });
    }

    setSelectedDateFilter({ startDate, endDate });
  };

  clearDates = () => {
    const { setSelectedDateFilter } = this.props;
    this.setState({
      open: false,
      startDate: null,
      endDate: null,
      endDateSelected: false,
      focusedInput: 'startDate'
    });
    setSelectedDateFilter({ startDate: null, endDate: null });
  };

  onFocusChangeHandler = focusedInput => {
    this.setState({ focusedInput: !focusedInput ? 'startDate' : focusedInput });
  };

  blockFutureDays = day => isInclusivelyAfterDay(day, moment().add(1, 'days'));

  // TODO: move to separated file - Utils for example
  countDaysForBadge = ({ startDate, endDate }) => {
    let days = 0;

    if (startDate) {
      days = 1;
    }
    if (endDate) {
      days = endDate.diff(startDate, 'days') + 1;
    }

    return days;
  };

  render() {
    const { classes, disabled } = this.props;
    const { open, startDate, endDate, focusedInput } = this.state;

    return (
      <React.Fragment>
        <div className={classes.buttonWrapper}>
          {startDate && (
            <Fab
              size="small"
              color="secondary"
              className={classes.clearValue}
              onClick={this.clearDates}
            >
              <CloseIcon className={classes.smallIcon} />
            </Fab>
          )}
          <Badge
            color="secondary"
            badgeContent={this.countDaysForBadge({ startDate, endDate })}
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
                {startDate ? startDate.format('MMM/DD/YYYY') : 'Date'}
                {endDate && endDate !== startDate ? ' - ...' : ''}
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
                    <div>
                      <DayPickerRangeController
                        startDate={startDate}
                        endDate={endDate}
                        numberOfMonths={2}
                        minimumNights={1}
                        onDatesChange={this.onDatesChange}
                        focusedInput={focusedInput}
                        onFocusChange={this.onFocusChangeHandler}
                        isOutsideRange={this.blockFutureDays}
                      />
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

FiltersBarButtonCalendar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  clearable: PropTypes.bool,
  showInputs: PropTypes.bool
};

FiltersBarButtonCalendar.defaultProps = {
  clearable: true,
  showInputs: false
};

const filterButtonCalendarWithStyles = withStyles(styles)(
  FiltersBarButtonCalendar
);

export default filterButtonCalendarWithStyles;
