
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _geojson = null;

function setGeojson(geojson) {
    _geojson = geojson;
}

var GeojsonStore = assign({}, EventEmitter.prototype, {
    // Lazy-load geojson.
    fetch: function() {
        return window.fetch('coords-simple.geojson')
                .then(response => response.text())
                .then(geojsonText => JSON.parse(geojsonText));
    },

    getGeojson: function() {
        return _geojson;
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
    switch(action.actionType) {
        case 'FETCH_GEOJSON':
            GeojsonStore.fetch().then(function(geojson) {
                setGeojson(geojson);
                GeojsonStore.emitChange();
            });
        default:
            // no op
    }
});

module.exports = GeojsonStore;
