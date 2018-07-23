import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import App from './touch/example/src/App'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
