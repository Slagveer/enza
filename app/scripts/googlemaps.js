;( function( $, window, document, undefined ) {

  'use strict';

  var pluginName = 'googlemaps',
    defaults = {
      animation: true
    },
    $map,
    $countrySelectorTemplate,
    $country,
    $offices,
    $countryForm,
    marker,
    markers = [],
    officeMarkers = [],
    geocoder,
    countries,
    mapType,
    countriesUnique,
    countriesJSON,
    selectedCountry,
    map,
    forklift,
    building;

  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.CUSTOMMAP = [
    {
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#2f343b"
        }
      ]
    },
    {
      "featureType": "landscape",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#82C032"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#2f343b"
        },
        {
          "weight": 1
        }
      ]
    }
  ];

  $.extend( Plugin.prototype, {
    init: function() {
      $map = $(this.element);
      $country = $('.js-country-selector');
      $offices = $('.js-offices');
      $countryForm = $('.js-country-form');
      mapType = $country.data('maptype');
      GoogleMapsLoader.KEY = 'AIzaSyA7lvGhDgbfCng-3_3aORo_1lhAo4oHeL0 ';
      GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
      GoogleMapsLoader.load(googleLoaded);
    }
  } );

  function googleLoaded(google) {
    var enzaMapType = new google.maps.StyledMapType(Plugin.CUSTOMMAP, {
      name: 'Enza Style'
    });
    map = new google.maps.Map($map[0],{
      center: {lat: -34.397, lng: 150.644},
      scrollwheel: true,
      zoom: (mapType === 'worldwide') ? 2 : 4
    });
    map.mapTypes.set('enza', enzaMapType);
    map.setMapTypeId('enza');
    forklift = {
      url: '/images/forklifttruck.png',
      size: new google.maps.Size(40, 64),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(20, 64)
    }
    building = {
      url: '/images/officebuilding.png',
      size: new google.maps.Size(40, 64),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(20, 64)
    };
    geocoder = new google.maps.Geocoder();
    countries = $country.data('offices');
    countriesJSON = countries;
    countriesUnique = _.uniq(_.pluck(countriesJSON.countries, 'Code'));

    $country.on('change', onChange);
    addOffices();
    addOfficesList();
  }

  function onChange(evt) {
    var countrypage;

    evt.preventDefault();
    selectedCountry = evt.target.value;
    if(selectedCountry) {
      countrypage = $country.find('.js-option[value="' + selectedCountry + '"]').data('countrypage');
      $countryForm.attr('action', countrypage);
      $countryForm.submit();
    }
    addOffices(selectedCountry);
    addOfficesList(selectedCountry);
  }

  function addOffices(country) {
    var offices,
      markedCountries = [];


    country = (_.isUndefined(country)) ? $country[0].value : country;
    if(country === '') {
      markedCountries = countriesUnique;
    } else {
      markedCountries.push(country);
    }
    _.each(markedCountries, function readMarkedCountries(markedCountry) {

      offices = _.where(countriesJSON.countries, {"Code": markedCountry.toUpperCase()});

      _.each(offices, function getOfficeLatLng(office) {
        var $infoTemplate = $('#googlemaps-info-template'),
          source,
          html,
          template,
          latlng,
          infowindow;

        _.extend(office, {
          "TypeName": (office['Type'] === 'Commercial') ? 'Distributor' : 'Office'
        });
        if(_.where(markers, office).length === 0) {
          markers.push(office);
          latlng = new google.maps.LatLng(parseFloat(office.Latitude), parseFloat(office.Longitude));
          source = $infoTemplate.html();
          template = Handlebars.compile(source);
          html = template(office);
          infowindow = new google.maps.InfoWindow({
            content: html,
            size: new google.maps.Size(150, 50)
          });
          map.setCenter(latlng);
          marker = new google.maps.Marker({
            position: latlng,
            icon: (office['Type'] === 'Commercial') ? building : forklift,
            map: map,
            title: markedCountry
          });
          officeMarkers.push(marker);
          google.maps.event.addListener(_.last(officeMarkers), 'click', function() {
            infowindow.open(map, this);
          });
        }
      });
    });
  }

  function addOfficesList(country) {
    var offices;

    country = (_.isUndefined(country)) ? $country[0].value : country;
    offices = _.where(countriesJSON.countries, {
      "Code": country.toUpperCase()
    });
    if($offices && mapType !== 'worldwide') {
      $offices.empty();
      _.each(offices, function readOffice(office) {
        var source,
          template,
          html;

        $countrySelectorTemplate = $('#googlemaps-office-template');
        source = $countrySelectorTemplate.html(),
          template = Handlebars.compile(source),
          html = template(office);
        $offices.append(html);
      });
    }
  }

  $.fn[ pluginName ] = function( options ) {
    return this.each( function() {
      if ( !$.data( this, 'plugin_' + pluginName ) ) {
        $.data( this, 'plugin_' +
          pluginName, new Plugin( this, options ) );
      }
    } );
  };

} )( jQuery, window, document );
