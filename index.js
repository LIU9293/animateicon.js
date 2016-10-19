function LoadNetImages(callback) {
  var APIurl = 'https://api.github.com/repos/liu9293/animateicon.js/contents/icons';
  var images = {};
    var req = null;
   req = new XMLHttpRequest();
  function stateChange(){
    if (req.readyState==4){// 4 = "loaded"
      if (req.status==200){// 200 = "OK"
        var res = JSON.parse(req.responseText);
        for(var i = 0; i < res.length; i++){
          var imageName = res[i].name.replace('.png','');
          nameArr = imageName.split('_');
          var name = nameArr[0],
              type = nameArr[1],
              width = nameArr[2].replace("w",''),
              height = nameArr[3].replace("h",''),
              url = res[i].download_url;
          var tmpDict = {
            name : name,
            type : type,
            width : width,
            height : height,
            url : url,
          }
          if(images[name] === undefined)
            images[name] = []
          images[name].push(tmpDict)
        }

        callback(null,images)
      }
      else{
        callback("fail")
      }
    }
  }
  req.onreadystatechange = stateChange;
  req.open("GET", APIurl, true);
  req.send();
}


//Animate() will be a function for any DOM element
Object.prototype.Animate = function(options){
  console.log(options)

  LoadNetImages((err, data) => {
    // console.log(">>>>",images,images.collect_1_5100w_100h)
    //setup initial options
    var that = this[0] || this

    var initalOptions = {
      name :'collect',
      type: 1,
      onPressed: function(){},
      onReleased: function(){}
    };
    var Opt = {
      name : options.name || initalOptions.name,
      type: options.type || initalOptions.type,
      onPressed: options.onPressed || initalOptions.onPressed,
      onReleased: options.onReleased || initalOptions.onReleased
    }
    var tmpImage = data[Opt.name][Opt.type-1]
    star = `<img id="animate-star" style="position: absolute;" src="${tmpImage.url}"/>`;
    that.innerHTML = star;
    var Icon = document.getElementById('animate-star');

    //setup motions
    var motion = function(){
      that.removeEventListener('click', motion);
      Opt.onPressed();
      Icon.style.left = '0px';
      var w = tmpImage.width/1 - 100
      var t = setInterval(function(){
        var left = Icon.style.left.replace('px','')/1;
        if(left > - w){
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

    //console.log(this[0],that,this == that)
    that.addEventListener('click', motion);

  })


}
