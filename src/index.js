import 'inobounce';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'font-awesome/css/font-awesome.css';
import 'legoland-ui/dist/styles/variables.css';
import 'legoland-ui/dist/styles/reset.css';
import 'legoland-ui/dist/styles/styles.css';
import 'legoland-ui/dist/styles/fonts.css';
import 'legoland-ui/dist/styles/spacing.css';
import 'legoland-ui/dist/styles/typography.css';
import 'fm-demos-common/dist/styles.css';
import 'fm-demos-common/dist/styles/help.css';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
