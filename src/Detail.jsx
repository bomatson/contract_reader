import React from 'react'
import Tracker from './services/Tracker'

module.exports = React.createClass({
  propTypes: {
    detail: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return ({
      learnMore: false
    });
  },

  learnMore() {
    var title = this.props.detail.title;
    Tracker.sendEvent('Detail', 'Learn More', title);
    this.setState({learnMore: true})
  },

  goBack() {
    var title = this.props.detail.title;
    Tracker.sendEvent('Detail', 'Go Back', title);
    this.setState({learnMore: false})
  },

  description() {
    return {__html: this.props.detail.html_description}
  },

  render() {
    var classNames = 'detail-container';

    if(this.props.detail.positive)
      classNames += ' good';

    return (
      <div className={classNames}>
        { this.state.learnMore ?
          (<div>
            <div dangerouslySetInnerHTML={this.description()}></div>
            <a onClick={this.goBack}>Back</a>
            <a target='_blank' href={this.props.detail.discussion}>Discussion</a>
          </div>)
          : (<div>
              {this.props.detail.title}
              <a onClick={this.learnMore}>Learn More</a>
            </div>)
        }
      </div>
    );
  }
});

