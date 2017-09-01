import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import HelloWorld from '../../../client/components/HelloWorld';

describe('HelloWorld Component:', () => {
  it ('should greet the world', () => {
    expect(shallow(<HelloWorld />).contains(
      <p>Hello, World!</p>
    )).to.equal(true);
  });

  it ('should greet an individual', () => {
    expect(shallow(<HelloWorld name="Foobar" />).contains(
      <p>Hello, Foobar!</p>
    )).to.equal(true);
  });
});
