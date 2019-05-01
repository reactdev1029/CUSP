export default {
  button: {
    height: '100%',
    padding: '0 0 0 16px',
    color: '#fff',
    borderRadius: 0,
    justifyContent: 'flex-start',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    }
  },
  buttonContent: {
    display: 'block',
    maxWidth: '180px',
    paddingRight: 48,
    color: 'inherit',
    fontSize: '16px',
    textTransform: 'none',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  popper: {
    minWidth: '260px',
    color: '#000',
    zIndex: 2010
  },
  paper: {
    paddingTop: '1px'
  },
  chevron: {
    position: 'absolute',
    top: '50%',
    right: 0,
    width: 48,
    transform: 'translateY(-50%)'
  },
  buttonWrapper: {
    position: 'relative',
    height: '100%'
  },
  clearValue: {
    position: 'absolute',
    width: 20,
    height: 20,
    minHeight: 20,
    right: 10,
    top: 8,
    zIndex: 100,
    boxShadow: 'none'
  },
  smallIcon: {
    width: 16,
    height: 16
  },
  badgeContainer: {
    height: '100%'
  },
  badge: {
    margin: '18px 41px 0 0'
  },
  loaderContainer: {
    display: 'flex',
    padding: '5px',
    justifyContent: 'center'
  },
  radioButtonsRoot: {
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between'
  },
  alignRight: {
    textAlign: 'right'
  },
  radioButtonsGroup: {}
};
