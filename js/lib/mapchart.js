
var mapchart = {};
var d3 = require('d3');
var _ = require('lodash');

var create = function create(el, options, geojson) {
    var projectionName = 'mercator';

    var width = options.width,
        height = options.height;

    var projection = d3.geo[projectionName]()
        .scale(2000)
        .center([-63, 44]);

    var svg = d3.select(el).append("svg")
        .attr("width", width)
        .attr("height", height);

    update(el, geojson);
};

var update = function update(el, geojson) {
    console.log(arguments);
    var grouped = _.groupBy(geojson.features, 'properties.ID');
    _.forEach(grouped, renderTimeline); // TODO: render according to time.
};

function renderTimeline(el, features) {
    var svg = d3.select

  features.forEach(function(feature) {
      feature.projection = feature.geometry.coordinates.filter(function(coords) {
          return coords[0].length > 2;
      })
      .map(function(coords) {
          return coords[0].map(projection);
      })
      .reduce(function(biggest, projected) {
          return biggest === null || biggest.length < projected.length ? projected : biggest;
      }, null)
  });

  features = features.filter(function(f) {
      return f.projection && f.projection.length;
  });

  if (!features.length) {
      return;
  }

  // map each feature to [todo: an array of] paths.
  var paths = features.map(function(feature) {
      return 'M' + feature.projection.join('L') + 'Z';
  });

  var path = svg.append("path");

  var transition = path.attr("d", paths[0])
    .transition()
      .delay(500);

  if (paths[1]) {
      transition.each('end', transitionNext(paths, 1));
  }

  function transitionNext(paths, index) {
    return function() {
      var currentLength = path.attr('d').split('L').length;
      var nextLength = paths[index].split('L').length;

      var currentPathSpread = spreadPath(path.attr('d'), nextLength);
      var toPathSpread = spreadPath(paths[index], currentLength);

      var transition = path
        .attr('d', currentPathSpread)
        .transition()
          .duration(500)
          .attr('d', toPathSpread)
          .delay(500)
      ;
      if (paths[index+1]) {
          transition.each('end', function() {
            path.attr('d', paths[index])
              .transition()
                .each('end', transitionNext(paths, index+1));
          });
      }
    };
  }

  function spreadPath(path, toLength) {
      var points = path.substring(1, path.length-1).split('L');
      var currentLength = path.split('L').length;

      if (currentLength >= toLength) {
          return path;
      }

      // console.log('fill from ' + currentLength + ' points to ' + toLength + ' points');

      var addPoints = toLength - currentLength;

      // console.log('adding ' + addPoints + ' points');

      while (points.length < toLength) {
          points.unshift(points[0]);
      }

      return 'M' + points.join('L') + 'Z';
  }
}

module.exports = {
    create,
    update
};
        /*
var projectionName = 'conicConformal';
var projectionName = 'stereographic';
var projectionName = 'azimuthalEqualArea';
var projectionName = 'conicEquidistant';

var geoUrl = 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json';
var geoUrl = 'coords.mac.geojson';
var geoUrl = 'coords-simple.geojson';

d3.json(geoUrl, function(geojson) {
  var grouped = _.groupBy(geojson.features, 'properties.ID');
  _.forEach(grouped, renderTimeline); // TODO: render according to time.
});

}

*/
