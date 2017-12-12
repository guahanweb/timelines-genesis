import React from 'react';

let HelloWorld = ({ name }) => {
  if (typeof name !== 'undefined') {
    return (
      <p>Hello, {name}!</p>
    );
  } else {
    return (
      <p>Hello, World!</p>
    );
  }
};

export default HelloWorld;
