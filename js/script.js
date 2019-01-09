'use strict';
(function () {
  var templateItem = document.getElementById('template-image-list').innerHTML;
  var elem = document.querySelector('.carousel');

  Mustache.parse(templateItem);
  for (var i = 0; i < imagesData.length; i++) {
    elem.innerHTML += Mustache.render(templateItem, imagesData[i]);
  };

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
    });
  });

  flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    document.querySelector('.progress-bar').style.width = progress * 100 + '%';
  });

  window.initMap = function() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
            center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
            map: map
        }); 
  };

})();