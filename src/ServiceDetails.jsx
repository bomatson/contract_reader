import React from 'react'

module.exports = React.createClass({
  propTypes: {
    details: React.PropTypes.array.isRequired
  },

  render() {
    var details = this.props.details.map((detail, i) => {
      return <div key={i}>{detail.title}</div>
    })
    return (
      <div>
        { details }
      </div>
    );
  }
});
