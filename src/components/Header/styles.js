export default {
  appBar: {
    zIndex: 2000
  },
  headerLogo: {
    display: 'flex',
    height: 30,
    padding: '0 15px',
    border: '1px solid #fff',
    color: '#fff',
    borderRadius: '3px',
    alignItems: 'center',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  toolbar: {
    justifyContent: 'space-between',
    height: '64px'
  },
  leftHeader: {
    display: 'flex',
    height: '100%'
  },
  fullHeight: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center'
  },
  filtersToolbar: {
    height: '100%'
  }
};
