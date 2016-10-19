import getImages from './images';

getImages()
  .then(res => console.log(res))
  .catcj(err => console.log(err))
