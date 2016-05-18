'use strict';

(function(){
  $(function() {
    $(function() {
      var $carousel = $('.js-carousel'),
        $loadmore = $('.js-loadmore'),
        $targetAudienceForm = $('.js-submitform'),
        $filter = $('.js-filter');

      $('body').navigation({
        animation: true,
        pause: 'hover'
      });
      if($carousel) {
        $carousel.carousel({
          interval: 800000
        });
        $carousel.swiperight(function () {
          $carousel.carousel('prev');
        });
        $carousel.swipeleft(function () {
          $carousel.carousel('next');
        });
        $carousel.on('slid.bs.carousel', function slideIt(e){
          var slide = $('.item.active').data('slide-number');

          $('.js-thumbnail-item').removeClass('active');
          $($('.js-thumbnail-item')[slide]).addClass('active');
        });
      }
      if($loadmore) {
        $loadmore.loadmore();
      }
      if($targetAudienceForm) {
        $targetAudienceForm.targetaudience();
      }
      if($filter) {
        $filter.filter({
          maxCheckboxes: 5
        });
      }
      $('.hirsc').hisrc({
        useTransparentGif: false,
        speedTestUri: '../bower_components/hisrc/50K.jpg'
      });
      $('.js-maps').googlemaps();
      $('.js-teaserbox__image').imagefill();
    });
  });
}());

