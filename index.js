/**
 * © 2021 Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Javascript
 *
 * Purpose - The starting file of the project. All the rendering of the application takes from this file itself.
 */

import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'

import './app/i18n'

AppRegistry.registerComponent(appName, () => App)
