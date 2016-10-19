import 'whatwg-fetch';

const getImages = () => {
  return new Promise(function(resolve, reject) {
    fetch('https://api.github.com/repos/liu9293/animateicon.js/contents/icons')
      .then(res => res.json())
      .then(ress => resolve(ress))
      .catch(err => reject(err))
  });
}

module.exports = getImages;
