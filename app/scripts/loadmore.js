;( function( $, window, document, undefined ) {

  'use strict';

  var pluginName = 'loadmore',
    defaults = {
      animation: true
    },
    $loadmore,
    $arrow,
    $teaserboxTemplate,
    $teaserboxLocation,
    disabled = false;

  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  $.extend( Plugin.prototype, {
    init: function() {
      $loadmore = $(this.element);
      $loadmore.on('click', function onClick(evt) {
        evt.preventDefault();
        if(!disabled) {
          $arrow.addClass('loadmore');
          getTeasers($loadmore.data('amount-teaserboxes'));
        }
      });
      $arrow = $(this.element).find('.js-arrow');
      $teaserboxLocation = $($loadmore.data('target'));

      function getTeasers(page) {
        if($loadmore.data('service')) {
          $.when(delayAsync(0), $.ajax({
              url: $loadmore.data('service'),
              data: {"Filter": { "Max":"100", "From":$loadmore.data('amount-teaserboxes'), "Size": $loadmore.data('step')}},
              type: "POST"
            }))
            .then(function(delayData, ajaxJsonData) {
              var source,
                template,
                teaserbox,
                html;

              $loadmore.data('amount-teaserboxes', page + $loadmore.data('step'));
              if(page >= $loadmore.data('max')) {
                disabled = true;
                $loadmore.addClass('disabled');
              }
              if(ajaxJsonData){
                _.each(ajaxJsonData[0].Data.Items, function(teaserbox) {
                  _.pick(teaserbox, function(value, key, object) {
                    if(_.indexOf(['StartDate', 'EndDate'], key) > -1) {
                      teaserbox[key] = moment(teaserbox[key]).format('DD MMM YYYY');
                    }
                    return false;
                  });
                  $teaserboxTemplate = $('#teaserbox-template-' + teaserbox.TemplateName.toLowerCase().replace('vitalis',''));// Quick fix for BE
                  source = $teaserboxTemplate.html(),
                  template = Handlebars.compile(source),
                  html = template(teaserbox);
                  $teaserboxLocation.append(html);
                  // Reactivate imagefill
                  $('.js-teaserbox__image').imagefill();
                });
              }
              $arrow.removeClass('loadmore');
            }).fail(function(err) {
              $arrow.removeClass('loadmore');
            });
        }
      }

      function delayAsync(delay) {
        var dfd = $.Deferred();

        if (delay > 0) {
          setTimeout(function() {
            dfd.resolve(delay);
          }, 4000);
          return dfd.promise();
        }

        return delay;
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
