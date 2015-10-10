import React from 'react'
import Detail from './Detail'

module.exports = React.createClass({
  propTypes: {
    details: React.PropTypes.array.isRequired
  },

  render() {
    var details = this.props.details.map((detail, i) => {
      return <Detail key={i} detail={detail} / >;
    });

    return (
      <div>
        { details }
      </div>
    );
  }
});
