;( function( $, window, document, undefined ) {

  'use strict';

  var pluginName = 'targetaudience',
    defaults = {
      animation: true
    },
    $targetaudience,
    $targetaudienceSelect;

  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  $.extend( Plugin.prototype, {
    init: function() {
      $targetaudience = $(this.element);
      $targetaudienceSelect = $targetaudience.find('.js-targetaudience');
      $targetaudience.on('change', function onChange(evt) {
        evt.preventDefault();
        $targetaudience.submit();
      });
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
