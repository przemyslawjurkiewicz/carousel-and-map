'use strict';
(function() {
var elem = document.querySelector('.carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  lazyLoad: 1,
  hash: true
});

})();