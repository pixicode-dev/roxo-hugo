$(document).ready(function () {
  "use strict";
  // Scroll to top
  $("a[href='#top']").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  // Smooth scroll
  $('a.scroll-to').on('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 700);
    event.preventDefault();
  });

  $('.site-testimonial-item').on('mouseenter', function () {
    $('.site-testimonial-item').addClass('inactive');
    $(this).removeClass('inactive').addClass('active');
  });
  $('.site-testimonial-item').on('mouseleave', function () {
    $('.site-testimonial-item').removeClass('inactive');
    $('.site-testimonial-item').removeClass('active');
  });

  const gliderElement = document.querySelector('.glider');
  if (gliderElement) {
    new Glider(gliderElement, {
      slidesToShow: 'auto',
      slidesToScroll: 'auto',
      duration: 0.5,
      arrows: {
        prev: '.glider-prev',
        next: '.glider-next',
      },
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }

});

$(window).on('scroll', function () {
  var windscroll = $(window).scrollTop();
  if (windscroll >= 100) {
    $('.site-navigation').addClass('nav-bg');
  } else {
    $('.site-navigation').removeClass('nav-bg');
  }
});
