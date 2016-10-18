var star = `<img id="animate-star" style="position: absolute;" src="https://oa932w8s4.qnssl.com/simple_collect.png"/>`;

var APIurl = 'https://api.github.com/repos/liu9293/animateicon.js/contents/icons';
var images = {};

var req = new XMLHttpRequest();

function stateChange(){
  if (req.readyState==4){// 4 = "loaded"
    if (req.status==200){// 200 = "OK"
      var res = JSON.parse(req.responseText);
      for(var i = 0; i < res.length; i++){
        images[res[i].name] = res[i].download_url
      };
      console.log(images)
    }
    else{
      console.log(req.statusText);
    }
  }
}
req.onreadystatechange = stateChange;
req.open("GET", APIurl, true);
req.send();


//Animate() will be a function for any DOM element
Object.prototype.Animate = function(options){
  while (true) {
    if(images == {}){
      continue;
    }else {
      break;
    }
  }
  //setup initial options
  var initalOptions = {
    type: 'star',
    onPressed: function(){},
    onReleased: function(){}
  };

  //put the image in DOM
  this.innerHTML = star;

  //setup user options
  var Icon = document.getElementById('animate-star');
  var Opt = {
    type: options.type || initalOptions.type,
    onPressed: options.onPressed || initalOptions.onPressed,
    onReleased: options.onReleased || initalOptions.onReleased
  }
  var that = this;
  //setup motions
  var motion = function(){
    that.removeEventListener('click', motion);
    Opt.onPressed();
    Icon.style.left = '0px';
    var t = setInterval(function(){
      var left = Icon.style.left.replace('px','')/1;
      if(left > -3900){
        Icon.style.left = (left - 100) + 'px';
      } else {
        that.addEventListener('click', cancel);
        clearInterval(t);
      }
    },20);
  };

  var cancel = function(){
    Opt.onReleased();
    Icon.style.left = '0px';
    that.removeEventListener('click', cancel);
    that.addEventListener('click', motion);
  };

  this.addEventListener('click', motion);

}
