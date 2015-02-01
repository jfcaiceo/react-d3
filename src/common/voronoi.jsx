var React = require('react');


var Polygon = React.createClass({

  _animateCircle: function() {
    console.log('animating circle', this.props.id);
    this.props.pubsub.emit('animateCircle', this.props.id);
  },

  _restoreCircle: function() {
    this.props.pubsub.emit('restoreCircle', this.props.id);
  },

  _drawPath: function(d) {
    if(d === undefined) {
      return; 
    }  
    return 'M' + d.join(',') + 'Z';
  },


  render: function() {
    return <path
      onMouseOver={this._animateCircle}
      onMouseOut={this._restoreCircle}
      fill="white"
      d={this._drawPath(this.props.vnode)} />;
  }

});


exports.Voronoi = React.createClass({

  render: function() {
    var xScale = this.props.xScale;
    var yScale = this.props.yScale;

    var voronoi = d3.geom.voronoi()
      .x(function(d){ return xScale(d.coord.x) })
      .y(function(d){ return yScale(d.coord.y) })
      .clipExtent([[0, 0], [ this.props.width , this.props.height]]);

    var regions = voronoi(this.props.data).map(function(vnode, idx) {
      return <Polygon pubsub={this.props.pubsub} key={idx} id={vnode.point.id} vnode={vnode} />;
    }.bind(this));

    return (
      <g>
        {regions}
      </g>
    );
  }

});

