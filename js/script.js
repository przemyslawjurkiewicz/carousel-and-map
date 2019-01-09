'use strict';
(function () {
  var templateItem = document.getElementById('template-image-list').innerHTML;
  var elem = document.querySelector('.carousel');
 
  Mustache.parse(templateItem);
  for (var i = 0; i < imagesData.length; i++) {
    elem.innerHTML += Mustache.render(templateItem, imagesData[i]);
  }
  
  var flkty = new Flickity(elem, {
    // options
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    lazyLoad: 1,
    hash: true
  });

  document.querySelectorAll('.rewind').forEach(function (e) {
    e.addEventListener('click', function () {
      flkty.select(0);
    })
  });

  flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    document.querySelector('.progress-bar').style.width = progress * 100 + '%';
  });

})();