'use strict';

(function () {
  var imagesData = [{
      id: 'slide1',
      image: 'images/szczecin.jpg',
      title: 'Nowy Browar',
      description: '<p>- Szczecin -</p>',
      coords: {
        lat: 53.423916,
        lng: 14.549753
      }
    },
    {
      id: 'slide2',
      image: 'images/kolobrzeg.jpg',
      title: 'Colberg',
      description: '<p>- Kołobrzeg -</p>',
      coords: {
        lat: 54.176553,
        lng: 15.579499
      }
    },
    {
      id: 'slide3',
      image: 'images/koszalin.jpg',
      title: 'Minibrowar Kowal',
      description: '<p>- Koszalin -</p>',
      coords: {
        lat: 54.190936,
        lng: 16.176804
      }
    },
    {
      id: 'slide4',
      image: 'images/portgdynia.jpg',
      title: 'Browar Port',
      description: '<p>- Gdynia -</p>',
      coords: {
        lat: 54.513994,
        lng: 18.550146
      }
    },
    {
      id: 'slide5',
      image: 'images/alegdynia.jpg',
      title: 'Ale brawar',
      description: '<p>- Gdynia -</p>',
      coords: {
        lat: 54.521288,
        lng: 18.535755
      }
    },
    {
      id: 'slide6',
      image: 'images/bgdans.jpg',
      title: 'Brovarnia',
      description: '<p>- Gdańsk -</p>',
      coords: {
        lat: 54.349288,
        lng: 18.660526
      }
    },
    {
      id: 'slide7',
      image: 'images/piwnagdansk.jpg',
      title: 'Browar Piwna',
      description: '<p>- Gdańsk -</p>',
      coords: {
        lat: 54.349920,
        lng: 18.651495
      }
    }
  ];

  //mustache js render html with temple
  var templateItem = document.getElementById('template-image-list').innerHTML;
  var elem = document.querySelector('.carousel');
  Mustache.parse(templateItem);
  for (var i = 0; i < imagesData.length; i++) {
    elem.innerHTML += Mustache.render(templateItem, imagesData[i]);
  }

  //flickity add options
  var flkty = new Flickity(elem, {
    // options
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    lazyLoad: 1,
    hash: true
  });

  //button click rewind to firs slide 
  document.querySelectorAll('.rewind').forEach(function (e) {
    e.addEventListener('click', function () {
      flkty.select(0);
    });
  });

  //flickity crollbar
  flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    document.querySelector('.progress-bar').style.width = progress * 100 + '%';
  });

  //google map initialization
  window.initMap = function () {
    var markerWasClicked = false;
    var uluru = imagesData[0].coords;
    var markers = [];
    //map zoom & center on load
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: uluru
    });

    //Add markers from imagesData to map
    imagesData.forEach(function (slide) {
      var marker = new google.maps.Marker({
        position: slide.coords,
        map: map
      });
      markers.push(marker);
    });

    //Toogle map when slide was changing
    flkty.on('change', function (index) {
      if (markerWasClicked == false) {
        map.panTo(imagesData[index].coords);
        map.setZoom(15);
      }
    });

    //Markers clicked addLisner
    markers.forEach(function (mark) {
      mark.addListener('click', function () {
        markerWasClicked = true;
        flkty.select(markers.indexOf(mark));
        markerWasClicked = false;
      });
    });
  };
})();