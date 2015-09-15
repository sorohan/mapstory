
/*
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
*/
var React = require('react');
var Timeline = require('./Timeline.react');
var TarpoeActions = require('../actions/TarpoeActions');

var TarpoeApp = React.createClass({

  componentDidMount: function() {
    setInterval(function() {
      TarpoeActions.setTime(parseInt(Date.now() / 1000, 10));
    }, 1000);
  },
  /*,

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },
  */

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Timeline />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    // this.setState(getTodoState());
  }

});

module.exports = TarpoeApp;
