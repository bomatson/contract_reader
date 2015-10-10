import '../style.css'
import React from 'react'
import ServiceDetails from './ServiceDetails'

module.exports = React.createClass({
  render() {
    var service = this.props.service;
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
        { service.details.length > 0 ?
          <div>
            <h3 className='title'>
              Do You Control Your Content?
            </h3>
            <h2>{ answer }</h2>
            <ServiceDetails details={service.details} />
          </div>
          : null
        }
      </div>
    )
  }
})
