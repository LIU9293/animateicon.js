
$.getJSON('https://api.github.com/repos/liu9293/animateicon.js/contents/icons', function(data){

  var images = [], html = '';

  for(var i = 0; i < data.length; i ++){
    var imgName = data[i].name.split('_');
    var imgObj = {
      name: imgName[0],
      type: imgName[1],
    }
    images.push(imgObj);
    var str = `<div id="icon-${i}" class="animateImage"></div>`;
    html = html + str;
  }

  $('#images').html(html);

  for(var i = 0; i < images.length; i ++){
    console.log(images[i]);
    $(`#icon-${i}`)[0].AnimateIcon({
      name: images[i].name ,
      type: images[i].type ,
      size: 100
    })
  }

  var length = images.length, ii = 0;

  var t = setInterval(function(){
    if(ii == length){
      clearInterval(t);
    } else {
      $(`#icon-${ii}`)[0].click();
      ii ++;
    }
  }, 500)

});
