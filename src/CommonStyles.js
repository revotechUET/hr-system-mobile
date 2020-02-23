import { StyleSheet } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Colors from './constants/Colors';

const _constants = {

}
const _classes = StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  label: {
    color: Colors.primaryText,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
  }
})

const bootstrapStyleSheet = new BootstrapStyleSheet(_constants, _classes);
export const s = bootstrapStyleSheet.create();
export const c = bootstrapStyleSheet.constants;

const CommonStyles = {
  styles: s,
  constants: c,
}
export default CommonStyles;

export const styles = s;
export const constants = c;
