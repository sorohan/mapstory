
var AppDispatcher = require('../dispatcher/AppDispatcher');

var TarpoeActions = {

  /**
   * @param  {string} text
   */
  setTime: function(time) {
    AppDispatcher.dispatch({
      actionType: 'TIME_SET',
      time: time
    });
  }

};

module.exports = TarpoeActions;
