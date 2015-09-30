import React from 'react'
import App from './src/App'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('hit the client', request);
});

React.render(<App />, document.getElementById('app'));
