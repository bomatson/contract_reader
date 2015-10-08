import React from 'react'
import App from './src/App'

chrome.runtime.sendMessage('Hi there', (response) =>{
  if(!!response)
    React.render(<App service={response.service}/>, document.getElementById('app'));
})

