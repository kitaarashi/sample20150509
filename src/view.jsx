var react = require('react');
var Name = react.createClass({
  render:function(){
    return (<span>{this.props.name}</span>);
  }
});

var Helloworld = react.createClass({
  render:function(){
    return (
      <div>
        <h1>hello world</h1>
        <Name name="masato" />
      </div>
    );
  }
});

module.exports = Helloworld;
