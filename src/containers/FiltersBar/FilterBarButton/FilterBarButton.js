import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Badge,
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  CircularProgress,
  withStyles
} from '@material-ui/core';
import { isArray } from 'lodash';
import Select from 'react-select';
import ChevronDown from '@material-ui/icons/ExpandMore';

import DropdownIndicator from './icons-parts';
import styles from './styles';

const selectStyles = {
  control: provided => ({
    ...provided,
    minWidth: 240,
    maxWidth: 360,
    margin: 8
  }),
  menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
  input: () => ({ margin: 0 }),
  menuList: base => ({
    ...base,
    maxHeight: '150px'
  })
};

class FiltersBarButton extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    const { loadOptions, loadOptionsAgain } = this.props;
    const { open } = this.state;

    if (!open && !loadOptionsAgain) {
      loadOptions();
    }

    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleOptionSelection = value => {
    const { setSelectedFilters, multiSelect } = this.props;
    let valueToArray = [];

    if (value) {
      valueToArray = isArray(value) ? value : [value];
    }

    setSelectedFilters(valueToArray);

    if (!multiSelect) {
      this.setState({ open: false });
    }
  };

  render() {
    const {
      name,
      classes,
      options,
      selectedValue,
      loading,
      disabled,
      clearable,
      getBadgeNumber,
      multiSelect
    } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        <div className={classes.buttonWrapper}>
          <Badge
            color="secondary"
            badgeContent={getBadgeNumber}
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
              aria-owns={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              disabled={disabled}
              onClick={this.handleToggle}
            >
              <span className={classes.buttonContent}>
                {selectedValue[0] && selectedValue[0].label
                  ? selectedValue[0].label
                  : name}
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
                    {!loading ? (
                      <div>
                        <Select
                          autoFocus
                          backspaceRemovesValue={false}
                          components={{
                            DropdownIndicator,
                            IndicatorSeparator: null
                          }}
                          controlShouldRenderValue
                          hideSelectedOptions={false}
                          isClearable={clearable}
                          isMulti={multiSelect}
                          menuIsOpen
                          onChange={this.handleOptionSelection}
                          options={options}
                          placeholder="Search..."
                          styles={selectStyles}
                          tabSelectsValue={false}
                          value={selectedValue}
                        />
                      </div>
                    ) : (
                      <div className={classes.loaderContainer}>
                        <CircularProgress />
                      </div>
                    )}
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

FiltersBarButton.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  loadOptionsAgain: PropTypes.bool,
  clearable: PropTypes.bool,
  multiSelect: PropTypes.bool
};

FiltersBarButton.defaultProps = {
  loadOptionsAgain: false,
  clearable: true,
  multiSelect: false
};

const filterButtonWithStyles = withStyles(styles)(FiltersBarButton);

export default filterButtonWithStyles;
