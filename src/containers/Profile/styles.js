export const styles = theme => ({
  userInfoRoot: {
    height: 180,
    margin: theme.spacing.unit * 2
  },
  avatar: {
    margin: theme.spacing.unit * 2,
    width: 180,
    height: 180,
    cursor: 'pointer'
  },
  textMargin: {
    marginBottom: theme.spacing.unit / 2,
    textTransform: 'uppercase'
  },
  btnMargin: {
    marginRight: theme.spacing.unit * 2
  },
  nameText: {
    margin: theme.spacing.unit / 1.5,
    width: 120,
    textTransform: 'uppercase',
    '@media (max-width: 575px)': {
      width: '40%'
    }
  },
  searchesRoot: {
    width: '100%',
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    borderRadius: theme.shape.borderRadius
  },
  button: {
    cursor: 'pointer',
    width: 30,
    height: 30,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.unit,
    '&:hover': {
      backgroundColor: theme.palette.grey[200]
    }
  },
  userContentRoot: {
    width: '100%',
    paddingTop: theme.spacing.unit * 4
  },
  tabs: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  }
});
