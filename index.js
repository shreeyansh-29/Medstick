/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import homeScreen from './src/screens/homeScreen';

AppRegistry.registerComponent(appName, () => homeScreen);
