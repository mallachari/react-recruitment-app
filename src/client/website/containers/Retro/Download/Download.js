import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import styles from './../../../components/Retro/Download/Download.styles';
import Download from './../../../components/Retro/Download/Download';
import { retroStartDownload, retroStopDownload } from './../../../actions/retro';
import {
  RETRO_CARDS_KEY,
  RETRO_COLUMNS_KEY,
  RETRO_NAME_KEY,
  RETRO_DOWNLOAD_KEY
} from '../../../reducers/retro';

const mapStateToProps = ({ retro }) => ({
  name: retro[RETRO_NAME_KEY],
  columns: retro[RETRO_COLUMNS_KEY],
  cards: retro[RETRO_CARDS_KEY],
  download: retro[RETRO_DOWNLOAD_KEY]
});

const mapDispatchToProps = dispatch => ({
  startDownload: () => dispatch(retroStartDownload()),
  stopDownload: () => dispatch(retroStopDownload())
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Download)
);
