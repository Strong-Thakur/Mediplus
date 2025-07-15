$(window).on("scroll", function () {
  if ($(this).scrollTop() > 30) {
    $(".header-area").addClass("sticky");
  } else {
    $(".header-area").removeClass("sticky");
  }
});

$(".testimonials").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
  infinite: true,
  arrows: false,

  // the magic
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
});

$(function () {
  $("#menu").slicknav();
});
