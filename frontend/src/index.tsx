import React from 'react';
import ReactDOM from 'react-dom';
import AppPages from './pages/AppPages';
import WebFont from 'webfontloader';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import * as serviceWorker from './serviceWorker';

import './styles/index.scss';

WebFont.load({
  google: {
    families: ['Montserrat:300,400,500,700', 'sans-serif']
  }
});

ReactDOM.render(
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <AppPages />
  </MuiPickersUtilsProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
