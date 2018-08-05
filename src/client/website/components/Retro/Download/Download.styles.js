
const styles = theme => ({
  downloadRetroIcon: {
    width: '64px',
    height: '64px',
    transition: 'all .2s ease',
    color: theme.palette.midGrey,
    '&:hover': {
      color: theme.palette.good
    }
  },
  actionIcon: {
    width: 32,
    height: 32
  }
});

export default styles;
