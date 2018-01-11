/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var _genealogies = __webpack_require__(1);

var _genealogies2 = _interopRequireDefault(_genealogies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var year = 0;
var genealogies = _genealogies2['default'].map(function (person, i) {
  var data = {
    tir: i + 1,
    name: person.name,
    'class': 'line-' + person.name.toLowerCase(),
    born: year,
    child_age: person.birth,
    child_year: year + person.birth,
    died: year + person.age,
    age: person.age
  };
  year += person.birth;
  return data;
});

var $el = document.querySelector('.chart');
var wrapper = d3.select($el);

var margin = { top: 20, right: 20, bottom: 30, left: 100 };
var width = $el.clientWidth - margin.left - margin.right;
var height = $el.clientHeight - margin.top - margin.bottom;

var symbols = d3.nest().key(function (d) {
  return d.tir;
}).entries(genealogies);

var line_height = 22;

var addLineage = function () {
  var spanX = function spanX(d) {
    return x(d.died) - x(d.born);
  };

  return function (symbol) {
    var svg = d3.select(this);
    var index = symbol.key;
    var lineage = symbol.values[0];

    var myX = x(lineage.born);
    var myY = line_height * (index - 1);

    svg.attr('transform', 'translate(' + myX + ',' + myY + ')').attr('class', 'lineage ' + lineage['class']);

    svg.append('text').attr('class', 'name').attr('x', -5).attr('y', 8).attr('dy', '.5em').text(lineage.name);

    svg.append('rect').attr('class', 'lifeline').attr('height', line_height - 4).attr('width', spanX(lineage));

    svg.append('rect').attr('class', 'before-birth').attr('height', line_height - 4).attr('width', x(lineage.child_age));

    svg.append('text').attr('class', 'age age-first').attr('transform', 'rotate(-90)').attr('x', -9).attr('y', 11).text(lineage.child_age);

    var remainder = lineage.age - lineage.child_age;
    if (remainder > 0) {
      svg.append('text').attr('class', 'age age-second').attr('transform', 'rotate(-90)').attr('x', -9).attr('y', x(lineage.age) - 7).text(lineage.age - lineage.child_age);
    }
  };
}();

var domain = [0, 2400];
var domainRange = [0, width];

var x = d3.scaleLinear().domain(domain).rangeRound(domainRange);

var svg = wrapper.append('svg').attr('class', 'main-chart').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Gridlines
svg.append('g').attr('class', 'grid').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x).ticks(domain[1] / 100).tickSize(-height).tickFormat(''));

// X Axis
svg.append('g').attr('transform', 'translate(0, ' + height + ')').call(d3.axisBottom(x));

// Eternity Past
svg.append('rect').attr('class', 'eternity-past').attr('height', height).attr('width', 80).attr('x', -80);

svg.append('text').attr('text-anchor', 'middle').attr('x', -(height / 2)).attr('y', -30).attr('transform', 'rotate(-90)').text('Eternity Past');

// Gradient
svg.append('linearGradient').attr('id', 'grayscale-gradient').attr('gradientUnits', 'userSpaceOnUse').attr('x1', -80).attr('y1', 0).attr('x2', 0).attr('y2', 0).selectAll('stop').data([{ offset: '0%', color: '#8d9cb7' }, { offset: '100%', color: '#b3bfd6' }]).enter().append('stop').attr('offset', function (d) {
  return d.offset;
}).attr('stop-color', function (d) {
  return d.color;
});

// Lineage
// first, add the holder g, then select all from within it
var genealogiesChart = svg.append('g').attr('id', 'genealogies-chart');

genealogiesChart.selectAll('g').data(symbols).enter().append('g').attr('class', 'lineage').each(addLineage);

// Drop shadow filter
var defs = svg.append('defs');

var filter = defs.append('filter').attr('id', 'drop-shadow').attr('height', '120%');

filter.append('feGaussianBlur').attr('in', 'SourceAlpha').attr('stdDeviation', 3).attr('result', 'blur');

filter.append('feOffset').attr('in', 'blur').attr('dx', 4).attr('dy', 4).attr('result', 'offsetBlur');

filter.append('feComponentTransfer').append('feFuncA').attr('type', 'linear').attr('slope', 0.4);

var feMerge = filter.append('feMerge');

feMerge.append('feMergeNode');
feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

// Info box
var info = svg.append('rect').attr('class', 'info-box').attr('rx', 4).attr('ry', 4).attr('x', 40).attr('y', 250).style('filter', 'url(#drop-shadow)').attr('height', 240).attr('width', 580);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var genealogies = [{
  name: 'Adam',
  birth: 130,
  age: 930
}, {
  name: 'Seth',
  birth: 105,
  age: 912
}, {
  name: 'Enosh',
  birth: 90,
  age: 905
}, {
  name: 'Kenan',
  birth: 70,
  age: 910
}, {
  name: 'Mahalalel',
  birth: 65,
  age: 895
}, {
  name: 'Jared',
  birth: 162,
  age: 962
}, {
  name: 'Enoch',
  birth: 65,
  age: 365
}, {
  name: 'Methuselah',
  birth: 187,
  age: 969
}, {
  name: 'Lamech',
  birth: 182,
  age: 777
}, {
  name: 'Noah',
  birth: 500,
  age: 950
}, {
  name: 'Shem',
  birth: 100,
  age: 600
}, {
  name: 'Arpachshad',
  birth: 35,
  age: 438
}, {
  name: 'Shelah',
  birth: 30,
  age: 433
}, {
  name: 'Eber',
  birth: 34,
  age: 464
}, {
  name: 'Peleg',
  birth: 30,
  age: 239
}, {
  name: 'Reu',
  birth: 32,
  age: 239
}, {
  name: 'Serug',
  birth: 30,
  age: 230
}, {
  name: 'Nahor',
  birth: 29,
  age: 148
}, {
  name: 'Terah',
  birth: 70,
  age: 205
}, {
  name: 'Abram',
  birth: 100,
  age: 175
}, {
  name: 'Isaac',
  birth: 60,
  age: 180
}, {
  name: 'Jacob',
  birth: 91,
  age: 147
}, {
  name: 'Joseph',
  birth: 110,
  age: 110
}];

exports['default'] = genealogies;

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map