'use strict';
(function () {

  var elem = document.querySelector('.carousel');
  var rewind = document.querySelectorAll('.rewind');
  var progressBar = document.querySelector('.progress-bar')

  var flkty = new Flickity(elem, {
    // options
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    lazyLoad: 1,
    hash: true
  });

  rewind.forEach(function (e) {
    e.addEventListener('click', function () {
      flkty.select(0);
    })
  });

  flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
  });

})();