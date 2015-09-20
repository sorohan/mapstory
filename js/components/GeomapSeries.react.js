
var React = require('react');
var GeojsonStore = require('../stores/Geojson');
var TimelineStore = require('../stores/Timeline');
var d3Chart = require('../lib/mapchart.js');

/**
 * Retrieve the current geojson data from the GeojsonStore
 */
function getGeojsonState() {
    return {
        geojson: GeojsonStore.getGeojson()
    };
}

var GeoMapSeries = React.createClass({
    getInitialState: function() {
        return getGeojsonState();
    },

    componentDidMount: function() {
        GeojsonStore.addChangeListener(this._onChange);
        // TimelineStore.addChangeListener(this._onChange);

        d3Chart.create(this.getDOMNode(), {
            width: 500,
            height: 500
        }, getGeojsonState());
    },

    componentDidUpdate: function() {
        d3Chart.update(this.getDOMNode(), getGeojsonState());
    },

    componentWillUnmount: function() {
        GeojsonStore.removeChangeListener(this._onChange);
        TimelineStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {
        return (
                <div></div>
        );
    },

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onChange: function() {
        this.setState(getGeojsonState());
    }
});

module.exports = GeoMapSeries;

