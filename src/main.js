var react = require('react');
var view = require('./view.jsx');

if (typeof window !== 'undefined') {
    window.React = react;
}

react.render(
  react.createElement(view),
  document.getElementById('content')
);
