/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './ignoreWarnings';
import Reminder from './src/screens/userScreens/reminder/reminder';

AppRegistry.registerComponent(appName, () => App);
