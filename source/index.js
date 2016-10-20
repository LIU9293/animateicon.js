import getImages from './images';

var Images = [];

HTMLElement.prototype.AnimateIconObject = {

  init(opt, dom){
    var options = this.getOptions(opt);
    if(Images.length == 0){
      getImages()
        .then(res => {
          Images = res;
          this.insertImage(options, dom);
        })
        .catch(err => console.log(err))
    } else {
      this.insertImage(options, dom);
    }
  },

  getOptions(options){
    return {
      size: options.size || 80,
      name: options.name || 'like',
      type: options.type || 1,
      onPressed: options.onPressed || function(){},
      onReleased: options.onReleased || function(){}
    }
  },

  insertImage(options, dom){
    var img = '';
    var steps = 1;
    var uid = null;
    Images.map((item, ii) => {
      if(item.name == options.name && item.type == options.type){
        let height = item.height,
            width  = item.width;
        let imgWidth = (width/height)*options.size;
        let uuid = Math.floor(new Date().getTime() * Math.random() * 100);
        uid = uuid;
        steps = width/height;
        img = `<img class="animate-icon" style="position: absolute; height: ${options.size};
        width: ${imgWidth}; left: 0px" id="${uuid}" src="${item.url}"/>`
      }
    });
    dom.innerHTML = img;
    this.setupClick(dom, uid, options.size, steps)
  },

  setupClick(dom, uid, size, steps){

    var img = document.getElementById(uid.toString());

    const move = () => {
      img.style.left = '0px';
      dom.removeEventListener('click', move);
      var t = setInterval(() => {
        var left  = parseInt(img.style.left.replace('px',''));
        if(left > -size*(steps-1)){
          img.style.left = left - size + 'px';
        } else {
          clearInterval(t);
          dom.addEventListener('click', remove);
        }
      }, 20)
    }

    const remove = () => {
      img.style.left = '0px';
      dom.removeEventListener('click', remove);
      dom.addEventListener('click', move);
    }

    dom.addEventListener('click', move);

  },

}

HTMLElement.prototype.AnimateIcon = function(options){

  this.AnimateIconObject.init(options, this)

}
