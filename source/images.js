import 'whatwg-fetch';

const getImages = () => {
  return new Promise(function(resolve, reject) {
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
        })
        resolve(images)
      })
      .catch(err => reject(err))
  });
}

module.exports = getImages;
