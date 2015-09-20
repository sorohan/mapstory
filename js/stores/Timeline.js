
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _time = parseInt(Date.now() / 1000, 10);

function setTime(t) {
    _time = t;
}

var TimelineStore = assign({}, EventEmitter.prototype, {
    getTime: function() {
        return _time;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var time;

    switch(action.actionType) {
        case 'TIME_SET':
            time = action.time;
            setTime(time);
            TimelineStore.emitChange();

        default:
            // no op
    }
});

module.exports = TimelineStore;
