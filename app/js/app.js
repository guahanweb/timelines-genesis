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
/***/ (function(module, exports) {

/**
 * D3 Timeline
 */

var data = [{
  name: 'Adam',
  children: [{
    name: 'Seth',
    born: 130
  }],
  age: 930
}, {
  name: 'Seth',
  children: [{
    name: 'Enosh',
    born: 105
  }],
  age: 912
}, {
  name: 'Enosh',
  children: [{
    name: 'Kenan',
    born: 90
  }],
  age: 905
}, {
  name: 'Kenan',
  children: [{
    name: 'Mahalalel',
    born: 70
  }],
  age: 910
}, {
  name: 'Mahalalel',
  children: [{
    name: 'Jared',
    born: 65
  }],
  age: 895
}, {
  name: 'Jared',
  children: [{
    name: 'Enoch',
    born: 162
  }],
  age: 962
}, {
  name: 'Enoch',
  children: [{
    name: 'Methuselah',
    born: 65
  }],
  age: 365
}, {
  name: 'Methuselah',
  children: [{
    name: 'Lamech',
    born: 187
  }],
  age: 969
}, {
  name: 'Lamech',
  children: [{
    name: 'Noah',
    born: 182
  }],
  age: 777
}, {
  name: 'Noah',
  children: [{
    name: 'Shem',
    born: 500
  }],
  age: 950
}, {
  name: 'Shem',
  children: [{
    name: 'Arpachshad',
    born: 100
  }],
  age: 600
}, {
  name: 'Arpachshad',
  children: [{
    name: 'Shelah',
    born: 35
  }],
  age: 438
}, {
  name: 'Shelah',
  children: [{
    name: 'Eber',
    born: 30
  }],
  age: 433
}, {
  name: 'Eber',
  children: [{
    name: 'Peleg',
    born: 34
  }],
  age: 464
}, {
  name: 'Peleg',
  children: [{
    name: 'Reu',
    born: 30
  }],
  age: 239
}, {
  name: 'Reu',
  children: [{
    name: 'Serug',
    born: 32
  }],
  age: 239
}, {
  name: 'Serug',
  children: [{
    name: 'Nahor',
    born: 30
  }],
  age: 230
}, {
  name: 'Nahor',
  children: [{
    name: 'Terah',
    born: 29
  }],
  age: 148
}, {
  name: 'Terah',
  children: [{
    name: 'Abram',
    born: 70
  }],
  age: 205
}, {
  name: 'Abram',
  children: [{
    name: 'Isaac',
    born: 100
  }],
  age: 175
}, {
  name: 'Isaac',
  children: [{
    name: 'Jacob',
    born: 60
  }],
  age: 180
}, {
  name: 'Jacob',
  children: [{
    name: 'Joseph',
    born: 91
  }],
  age: 147
}];

var year = 0;
var GENEALOGY = data.map(function (person, i) {
  var data = {
    tir: i + 1,
    name: person.name,
    start: year,
    end: year + person.age
  };
  year += person.children[0].born;

  return data;
});

var wrapper = document.querySelector('.chart');
var width = wrapper.clientWidth;

var minX = d3.min(GENEALOGY, function (d) {
  return d.start;
});
var maxX = d3.max(GENEALOGY, function (d) {
  return d.end;
});

var symbols = d3.nest().key(function (d) {
  return d.tir;
}).entries(GENEALOGY);

var height = 12;

var spanX = function spanX(d) {
  return x(d.start);
};
var spanW = function spanW(d) {
  return x(d.end) - x(d.start);
};

var x = d3.scaleLinear().domain([-100, 8000]).rangeRound([0, width]);

var chart = function chart(symbol) {
  var svg = d3.select(this);

  var holder = svg.selectAll('rect').data(symbol.values).enter();

  holder.append('rect').attr('x', function (d) {
    return spanX(d);
  }).attr('y', 0).attr('width', function (d) {
    return spanW(d);
  }).attr('height', height).attr('fill', function (d) {
    return '#ddf';
  }).on('mouseover', function (d) {
    return tooltip.html(getGenealogyInfo(d));
  }).on('mouseout', function (d) {
    return tooltip.html('');
  });

  holder.append('text').attr('x', function (d) {
    return spanX(d) + 4;
  }).attr('y', 4).attr('dy', '.5em').text(function (d) {
    return d.name;
  });
};

function getGenealogyInfo(d) {
  var out = [d.name, 'born year ' + d.start, 'lived to be ' + (d.end - d.start)];
  return out.join('<br>');
}

var allCharts = d3.select(wrapper).selectAll('svg').data(symbols).enter().append('svg').attr('height', height).each(chart);

var xAxis = d3.axisBottom(x).ticks(width / 100);

var globalX = d3.select(wrapper).append('svg').attr('class', 'axis').call(xAxis);

var catchAll = d3.select('body').append('svg').attr('class', 'zoom').append('rect').attr('fill', 'none').attr('width', width).attr('height', wrapper.getBoundingClientRect().bottom);

var tooltip = d3.select(wrapper).append('div').attr('class', 'tooltip');

catchAll.call(d3.zoom().scaleExtent([0.1, 10]).on('zoom', function () {
  var transform = d3.event.transform;
  globalX.call(xAxis.scale(transform.rescaleX(x)));
  allCharts.selectAll('rect').attr('x', function (d) {
    return transform.applyX(spanX(d));
  }).attr('width', function (d) {
    return transform.k * spanW(d);
  });
}));

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map