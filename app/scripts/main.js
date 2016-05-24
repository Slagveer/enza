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
          interval: 8000
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
        $carousel.on('click', function() {
          $carousel.carousel('pause');
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
      // $('.hirsc').hisrc({
      //   useTransparentGif: false,
      //   speedTestUri: '../bower_components/hisrc/50K.jpg'
      // });
      $('.js-maps').googlemaps();
      $('.js-teaserbox__image').imagefill();
      $('.js-item__image').imagefill();
      $('.js-container--carousel__slides__item__image').imagefill();
      $('.js-variety-detail__image').imagefill();
      $('.js-itemslist__item__image').imagefill();
      $('.js-growings-advisors__image').imagefill();
      $('.js-vacancy__image').imagefill();
      $('.js-content__image').imagefill();
      $('.js-content__image--small').imagefill();
      $('.js-content__image--extra-small').imagefill();
      $('.js-content__introduction--image__image').imagefill();
      $('.js-scroll-top-wrapper').scrolltotop();
    });
  });
}());

