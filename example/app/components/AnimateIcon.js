import React, { Component } from 'react';
import 'animateicon.js';

const styles = {
  iconImage: {
    height: '100px',
    width: '100px',
    left: '0px',
    position: 'absolute',
  }
}

class AnimateIcon extends Component{
  constructor(props){
    super(props);
    this.animate = this.animate.bind(this);
  }
  componentDidMount(){
    const { size, name, type } = this.props;
    this.animate({
      size: size,
      name: name,
      type: type
    })
  }
  animate(opts){
    console.log(this.refs['icon'].innerHTML);
    this.refs['icon'].AnimateIcon(opts);
  }
  componentWillReceiveProps(nextProps, nextState){
    this.animate({
      size: nextProps.size,
      name: nextProps.name,
      type: nextProps.type
    });
  }
  render(){
    return(
      <div className="icons" ref={'icon'} id={'icon'}>
      </div>
    )
  }
}

module.exports = AnimateIcon
