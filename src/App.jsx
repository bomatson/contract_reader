import '../style.css'
import React from 'react'
import ContractDetails from './ContractDetails'

module.exports = React.createClass({
  getInitialState() {
    return({});
  },

  componentWillMount() {
    chrome.runtime.sendMessage('Hi there', (response) =>{
      console.log(response.service)
      this.setState({service: response.service})
    })
  },

  render() {
    var service = this.state.service;

    console.log(service)
    return (
      <div className='app'>
        { !!service && service.details.length > 0 ?
          <div>
            { service.title }
            <ContractDetails details={service.details} />
          </div>
          : null
        }
      </div>
    )
  }
})
