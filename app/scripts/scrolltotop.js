;( function( $, window, document, undefined ) {

  'use strict';

  var pluginName = 'scrolltotop',
    defaults = {
      animation: true
    },
    $scrolltotop,
    $window,
    $document;

  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  $.extend( Plugin.prototype, {
    init: function() {
      $scrolltotop = $(this.element);
      $window = $(window);
      $document = $(document);

      $document.on( 'scroll', function() {
        if ($window.scrollTop() > 100) {
          $scrolltotop.addClass('show');
        } else {
          $scrolltotop.removeClass('show');
        }
      });
      $scrolltotop.on('click', scrollToTop);

      function scrollToTop() {
        var verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0,
          $body = $('body'),
          offset = $body.offset(),
          offsetTop = offset.top;

        $('html, body').animate({scrollTop: offsetTop}, 200, 'linear');
      }
    }
  } );

  $.fn[ pluginName ] = function( options ) {
    return this.each( function() {
      if ( !$.data( this, 'plugin_' + pluginName ) ) {
        $.data( this, 'plugin_' +
          pluginName, new Plugin( this, options ) );
      }
    } );
  };

} )( jQuery, window, document );
