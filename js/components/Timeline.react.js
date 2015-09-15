
/*
var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
*/
var React = require('react');
var TimelineStore = require('../stores/Timeline');

/**
 * Retrieve the current timeline data from the TimelineStore
 */
function getTimelineState() {
  var d = new Date();
  d.setTime(TimelineStore.getTime()*1000);

  return {
      time: d.toString()
  };
}

var Timeline = React.createClass({
  getInitialState: function() {
    return getTimelineState();
  },

  componentDidMount: function() {
    TimelineStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TimelineStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
      the time: {this.state.time}
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getTimelineState());
  }
});

module.exports = Timeline;
