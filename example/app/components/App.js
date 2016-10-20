import React from 'react';
import 'whatwg-fetch';
import AnimateIcon from './AnimateIcon';
require('./App.css');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      name: 'like',
      type: 1,
      size: 80,
      currentName: null,
    };
    this.changeName = this.changeName.bind(this);
    this.changeType = this.changeType.bind(this);
  }
  componentWillMount(){
    fetch('https://api.github.com/repos/liu9293/animateicon.js/contents/icons')
      .then(res => res.json())
      .then(ress => {
        var images = ress.map((item, ii) => {
          let nameArr = item.name.replace('.png', '').split('_');
          let name = nameArr[0],
              type = parseInt(nameArr[1]),
              width = parseInt(nameArr[2].replace('w', '')),
              height = parseInt(nameArr[3].replace('h', ''));
          let pic = {
            name: name ,
            type: type ,
            width: width ,
            height: height ,
            url : item.download_url
          };
          return pic;
        });
        this.setState({
          images: images,
          name: images[0].name,
          currentName: images[0].name
        })
      })
      .catch(err => console.log(err))
  }
  changeName(name){
    this.setState({
      name: name,
      currentName: name
    })
  }
  changeType(type){
    this.setState({type: parseInt(type)});
  }
  render() {
    var NameOptions = [], NameOptionsSelect = null;
    var TypeOptions = 0, TypeOptionsSelect = [];
    this.state.images.map((item, ii) => {
      if(NameOptions.indexOf(item.name)<0){
        NameOptions.push(item.name)
      };
      if(item.name == this.state.currentName){
        TypeOptions ++;
      }
    });
    for(let i=0; i<TypeOptions; i++){
      TypeOptionsSelect.push(
        <option value={i+1} key={i}>{i+1}</option>
      )
    }
    NameOptionsSelect = NameOptions.map((item, ii) => {
      return(
        <option value={item} key={ii}>{item}</option>
      )
    });
    if(this.state.images.length == 0){
      return <p>loading...</p>
    } else {
      return (
        <div className="container">
          <div className="iconArea">
            <AnimateIcon
              name={this.state.name}
              type={this.state.type}
              size={this.state.size}
            />
          </div>
          <div className="selectArea">
            <select className="select" onChange={e => this.changeName(e.target.value)}>
              {NameOptionsSelect}
            </select>
            <select className="select" onChange={e => this.changeType(e.target.value)}>
              {TypeOptionsSelect}
            </select>
          </div>
        </div>
      )
    }
  }
}
