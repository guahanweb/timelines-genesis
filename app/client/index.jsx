/**
 * D3 Timeline
 */

const data = [
  {
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
  }
];

let year = 0;
const GENEALOGY = data.map((person, i) => {
  let data = {
    tir: i + 1,
    name: person.name,
    start: year, 
    end: year + person.age
  };
  year += person.children[0].born;

  return data;
});

const wrapper = document.querySelector('.chart');
const width = wrapper.clientWidth;

const minX = d3.min(GENEALOGY, d => d.start);
const maxX = d3.max(GENEALOGY, d => d.end);

const symbols = d3.nest()
  .key(d => d.tir)
  .entries(GENEALOGY);

const height = 12;

const spanX = d => x(d.start);
const spanW = d => x(d.end) - x(d.start);

const x = d3.scaleLinear()
  .domain([-100, 8000])
  .rangeRound([0, width]);

const chart = function(symbol) {
  let svg = d3.select(this);

  let holder = svg.selectAll('rect')
    .data(symbol.values)
    .enter();

  holder.append('rect')
      .attr('x', d => spanX(d))
      .attr('y', 0)
      .attr('width', d => spanW(d))
      .attr('height', height)
      .attr('fill', d => '#ddf')
    .on('mouseover', d => tooltip.html(getGenealogyInfo(d)))
    .on('mouseout', d => tooltip.html(''));

  holder.append('text')
    .attr('x', d => spanX(d) + 4)
    .attr('y', 4)
    .attr('dy', '.5em')
    .text(d => d.name);
};

function getGenealogyInfo(d) {
  let out = [
    d.name,
    'born year ' + d.start,
    'lived to be ' + (d.end - d.start)
  ];
  return out.join('<br>');
}

const allCharts = d3.select(wrapper).selectAll('svg')
  .data(symbols)
  .enter()
  .append('svg')
    .attr('height', height)
  .each(chart);

const xAxis = d3.axisBottom(x)
  .ticks(width / 100);

const globalX = d3.select(wrapper)
  .append('svg')
    .attr('class', 'axis')
    .call(xAxis);

const catchAll = d3.select('body')
  .append('svg')
    .attr('class', 'zoom')
  .append('rect')
    .attr('fill', 'none')
    .attr('width', width)
  .attr('height', wrapper.getBoundingClientRect().bottom);

const tooltip = d3.select(wrapper).append('div')
  .attr('class', 'tooltip');

catchAll.call(d3.zoom()
  .scaleExtent([0.1, 10])
  .on('zoom', () => {
    let transform = d3.event.transform;
    globalX.call(xAxis.scale(transform.rescaleX(x)));
    allCharts.selectAll('rect')
      .attr('x', d => transform.applyX(spanX(d)))
      .attr('width', d => transform.k * spanW(d));
  })
);
