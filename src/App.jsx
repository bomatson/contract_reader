import '../style.css'
import React from 'react'
import ServiceDetails from './ServiceDetails'
import Tracker from './services/Tracker'

module.exports = React.createClass({
  getInitialState() {
    return {service: {}};
  },

  componentWillMount() {
    chrome.runtime.sendMessage('Hi there', (response) =>{
      var service = response.service;
      Tracker.sendEvent('Service', 'Rendered', service.title);

      this.setState({service})
    })
  },

  render() {
    var service = this.state.service;
    var className = 'app';
    var answer = 'NO';

    if(service.in_control) {
      answer = 'YES';
      className += ' yes'
    } else if(service.in_control == null) {
      answer = 'KINDA';
      className += ' kinda'
    }

    return (
      <div className={className}>
        { !!service.details ?
          <div>
            <h3 className='title'>
              Do You Control Your Content?
            </h3>
            <h2>{ answer }</h2>
            <ServiceDetails details={service.details} />
          </div>
          : <div>Loading</div>
        }
      </div>
    )
  }
})
