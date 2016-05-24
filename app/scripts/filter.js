;( function( $, window, document, undefined ) {

  'use strict';

  var pluginName = 'filter',
    defaults = {
      animation: true
    },
    $filter,
    $checkboxes,
    $filterGroups,
    $filterLessButton;

  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  $.extend( Plugin.prototype, {
    init: function() {
      var me =  this;

      $filter = $(this.element);
      $filterGroups = $filter.find('.js-filter-group');
      _.each($filterGroups, function renderGroups(group) {
        var $filterButton;

        $filterButton = $(group).find('.js-filter-btn');
        $filterLessButton = $(group).find('.js-filter-less-btn');
        $checkboxes = $(group).find('.js-filter-checkbox');
        $($filterButton).data('checkboxes', $checkboxes);
        $($filterButton).data('filterlessbutton', $filterLessButton);
        $($filterButton).on('click', function onClick(evt) {
          evt.preventDefault();
          $checkboxes = $filterButton.data('checkboxes');
          $filterLessButton = $filterButton.data('filterlessbutton');
          $checkboxes.show();
          $filterLessButton.toggleClass('hidden');
          $filterButton.toggleClass('hidden');
        });
        $($filterLessButton).on('click', function onClick(evt) {
          evt.preventDefault();
          $checkboxes = $filterButton.data('checkboxes');
          $filterLessButton = $filterButton.data('filterlessbutton');
          $checkboxes.hide();
          showCheckboxes($checkboxes);
          $filterLessButton.toggleClass('hidden');
          $filterButton.toggleClass('hidden');
        });
        showCheckboxes($checkboxes);
        if($checkboxes.length === 5) {
          $filterButton.hide();
        }
      });

      function showCheckboxes($checkboxes) {
        _.each($checkboxes, function(checkbox, index) {
          if(index < me.settings.maxCheckboxes) {
            $(checkbox).show();
          }
        });
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
