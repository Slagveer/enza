;( function( $, window, document, undefined ) {

  'use strict';

  var pluginName = 'navigation',
    defaults = {
      animation: true
    },
    $menu,
    $search,
    $navigation,
    $navigationMenu,
    $navigationSearch,
    $backdrop,
    $logo;

  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  $.extend( Plugin.prototype, {
    init: function() {
      $menu = $(this.element).find('.js-menu');
      $logo = $(this.element).find('.js-logo');
      $search = $(this.element).find('.js-search');
      $navigation = $(this.element).find('.js-navigation');
      $navigationMenu = $(this.element).find('.js-navigation-menu');
      $navigationSearch = $(this.element).find('.js-navigation-search');
      $backdrop = $('.js-backdrop');

      $navigationMenu.on('show.bs.collapse hide.bs.collapse', disableButtons);
      $navigationMenu.on('shown.bs.collapse hidden.bs.collapse',enableButtons);
      $navigationSearch.on('show.bs.collapse hide.bs.collapse', disableButtons);
      $navigationSearch.on('shown.bs.collapse hidden.bs.collapse',enableButtons);

      $backdrop.on('click', function onClick(evt) {
        $navigationMenu.collapse('hide');
        $navigationSearch.collapse('hide');
      });
      $menu.data('active', false);
      $menu.on('click', function onClick(evt) {
        collapseAll();
        $menu.data('active', !$menu.data('active'));
        if($menu.data('active')) {
          $navigationMenu.collapse('show');
        }
        setLogo($(this));
      });
      $search.data('active', false);
      $search.on('click', function onClick() {
        collapseAll();
        $search.data('active', !$search.data('active'));
        if($search.data('active')) {
          $navigationSearch.collapse('show');
        }
        //setLogo($(this));
      });

      function collapseAll() {
        $('.navigation button[data-toggle="collapse"]').each(function(){
          var objectID = $(this).data('target');

          // Collapse all the open navigation menu's first
          if($(objectID).hasClass('in') === true) {
            $(objectID).collapse('hide');
          }
        });
      }

      function setLogo($obj) {
        if(/search/i.test($obj[0].className) || /search/i.test($obj[0].className.baseVal)) {
          $menu.data('active', false);
        } else {
          $search.data('active', false);
        }
        if($menu.data('active') === true || $search.data('active') === true) {
          $logo.addClass('hide-logo');
        } else {
          $logo.removeClass('hide-logo');
        }
      }

      function disableButtons() {
        $search.attr('disabled', 'disabled');
        $menu.attr('disabled', 'disabled');
      }

      function enableButtons() {
        $search.removeAttr('disabled');
        $menu.removeAttr('disabled');
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
