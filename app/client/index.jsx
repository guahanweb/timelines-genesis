import GENEALOGIES from './data/genealogies';

let year = 0;
const genealogies = GENEALOGIES.map((person, i) => {
  let data = {
    tir: i + 1,
    name: person.name,
    class: 'line-' + person.name.toLowerCase(),
    born: year,
    child_age: person.birth,
    child_year: year + person.birth,
    died: year + person.age,
    age: person.age
  };
  year += person.birth;
  return data;
});

const $el = document.querySelector('.chart');
const wrapper = d3.select($el);

const margin = { top: 20, right: 20, bottom: 30, left: 100 }
const width = $el.clientWidth - margin.left - margin.right;
const height = $el.clientHeight - margin.top - margin.bottom;

const symbols = d3.nest()
  .key(d => d.tir)
  .entries(genealogies);

const line_height = 22;

const addLineage = (function () {
  const spanX = (d) => x(d.died) - x(d.born);

  return function (symbol) {
    let svg = d3.select(this);
    let index = symbol.key;
    let lineage = symbol.values[0];

    let myX = x(lineage.born);
    let myY = line_height * (index - 1);

    svg.attr('transform', 'translate(' + myX + ',' + myY + ')')
      .attr('class', 'lineage ' + lineage.class);

    svg.append('text')
      .attr('class', 'name')
      .attr('x', -5)
      .attr('y', 8)
      .attr('dy', '.5em')
      .text(lineage.name);

    svg.append('rect')
      .attr('class', 'lifeline')
      .attr('height', line_height - 4)
      .attr('width', spanX(lineage));

    svg.append('rect')
      .attr('class', 'before-birth')
      .attr('height', line_height - 4)
      .attr('width', x(lineage.child_age));

    svg.append('text')
      .attr('class', 'age age-first')
      .attr('transform', 'rotate(-90)')
      .attr('x', -9)
      .attr('y', 11)
      .text(lineage.child_age);

    let remainder = lineage.age - lineage.child_age;
    if (remainder > 0) {
      svg.append('text')
        .attr('class', 'age age-second')
        .attr('transform', 'rotate(-90)')
        .attr('x', -9)
        .attr('y', x(lineage.age) - 7)
        .text(lineage.age - lineage.child_age);
    }
  };
})();

const domain = [0, 2400];
const domainRange = [0, width];

const x = d3.scaleLinear()
  .domain(domain)
  .rangeRound(domainRange);

const svg = wrapper.append('svg')
    .attr('class', 'main-chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Gridlines
svg.append('g')
  .attr('class', 'grid')
  .attr('transform', 'translate(0,' + height + ')')
  .call(d3.axisBottom(x)
    .ticks(domain[1] / 100)
    .tickSize(-height)
    .tickFormat('')
  );

// X Axis
svg.append('g')
  .attr('transform', 'translate(0, ' + height + ')')
  .call(d3.axisBottom(x));

// Eternity Past
svg.append('rect')
  .attr('class', 'eternity-past')
  .attr('height', height)
  .attr('width', 80)
  .attr('x', -80);

svg.append('text')
  .attr('text-anchor', 'middle')
  .attr('x', -(height / 2))
  .attr('y', -30)
  .attr('transform', 'rotate(-90)')
  .text('Eternity Past');

// Gradient
svg.append('linearGradient')
  .attr('id', 'grayscale-gradient')
  .attr('gradientUnits', 'userSpaceOnUse')
  .attr('x1', -80).attr('y1', 0)
  .attr('x2', 0).attr('y2', 0)
  .selectAll('stop')
    .data([
      { offset: '0%', color: '#8d9cb7' },
      { offset: '100%', color: '#b3bfd6' }
    ])
    .enter().append('stop')
      .attr('offset', d => d.offset)
  .attr('stop-color', d => d.color);

// Lineage
// first, add the holder g, then select all from within it
const genealogiesChart = svg.append('g')
  .attr('id', 'genealogies-chart');

genealogiesChart.selectAll('g')
  .data(symbols)
  .enter()
  .append('g')
    .attr('class','lineage')
  .each(addLineage);

// Drop shadow filter
const defs = svg.append('defs');

const filter = defs.append('filter')
  .attr('id', 'drop-shadow')
  .attr('height', '120%');

filter.append('feGaussianBlur')
  .attr('in', 'SourceAlpha')
  .attr('stdDeviation', 3)
  .attr('result', 'blur');

filter.append('feOffset')
  .attr('in', 'blur')
  .attr('dx', 4)
  .attr('dy', 4)
  .attr('result', 'offsetBlur');

filter.append('feComponentTransfer')
  .append('feFuncA')
    .attr('type', 'linear')
    .attr('slope', 0.4);

const feMerge = filter.append('feMerge');

feMerge.append('feMergeNode');
feMerge.append('feMergeNode')
  .attr('in', 'SourceGraphic');

// Info box
const info = svg.append('rect')
  .attr('class', 'info-box')
  .attr('rx', 4)
  .attr('ry', 4)
  .attr('x', 40)
  .attr('y', 250)
  .style('filter', 'url(#drop-shadow)')
  .attr('height', 240)
  .attr('width', 580);
