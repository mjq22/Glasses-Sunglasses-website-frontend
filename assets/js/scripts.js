jQuery(document).ready(function ($) {
  $("#menu-toggle").click(function () {
    $(".main-menu-wrapper").slideToggle("fast");
  });
  $(".product-carousel").slick({
    dots: true,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow:
      '<button class="slick-prev slick-arrow" aria-label="Previous Product" type="button" style="display: block;">Previous Product</button>',
    nextArrow:
      '<button class="slick-next slick-arrow" aria-label="Next Product" type="button" style="display: block;">Next Product</button>',

    customPaging: function (slider, i) {
      // this example would render "tabs" with titles
      return (
        '<button type="button" id="slick-slide-control0' +
        (i + 1) +
        '" aria-controls="slick-slide0' +
        (i + 1) +
        '" aria-label="product ' +
        (i + 1) +
        " 0f " +
        slider.slideCount +
        ', button">' +
        (i + 1) +
        "</button>"
      );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Color Dots
  $(".color-dots").slick({
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow:
      '<button class="slick-prev slick-arrow" aria-label="Previous Color" type="button" style="display: block;">Previous Color</button>',
    nextArrow:
      '<button class="slick-next slick-arrow" aria-label="Next Color" type="button" style="display: block;">Next Color</button>',
  });

  // Filters Accordion
  $('.filter-title').on('click', 'a', toggleFilters);
  function toggleFilters(e) {
    e.preventDefault();

    let _this = $(this);
    let _parent = _this.parents('.filter-widget');

    _parent.toggleClass('active');
    _parent.find('.filter-list').slideToggle(200);
  }

  // Link Top
  $('.link-top').on('click', scrollToTop);
  function scrollToTop(e) {
    e.preventDefault();

    $('body, html').animate({ 'scrollTop': 0 });
  }

  // Filter Open
  $('.filter-link').on('click', showFilters);
  $('.filter-close').on('click', hideFilters);

  function showFilters(e) {
    e.preventDefault();

    $('.listing-side').fadeIn();
  }

  function hideFilters(e) {
    e.preventDefault();

    $('.listing-side').fadeOut();
  }

  // Vto Toggle for Screen Reader
  $('.vto-toggle').on('change', 'input[type="checkbox"]', checkState);

  function checkState() {
    let isChecked = $(this).is(':checked');

    if (isChecked) {
      $(this).attr('aria-checked', true);
    } else {
      $(this).attr('aria-checked', false);
    }
  }

  // Share Product
  $('.share').on('click', '.txt', showShare);

  function showShare(e) {
    e.preventDefault();

    let share = $(this).parent('.share');
    let expanded = 'false';

    share.toggleClass('active');
    share.find('ul').fadeToggle();

    if (share.hasClass('active')) { expanded = 'true'; }

    share.attr('aria-expanded', expanded);
  }

  // Info Tabs
  $('.tab-list').on('click', 'a', showTab);

  function showTab(e) {
    e.preventDefault();

    let _this = $(this);
    let tab = _this.attr('href');
    let _parent = _this.parent('li');
    let isActive = _parent.hasClass('active');

    if (!isActive) {
      $('.tab-list').find('li').removeClass('active');
      _parent.addClass('active');
      $('.tab').fadeOut(300, function () {
        setTimeout(function () {
          $(tab).fadeIn(300);
        }, 300)
      })
    }
  }

  // Color Dots
  $(".prod-like").find(".prod-list").slick({
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow:
      '<button class="slick-prev slick-arrow" aria-label="Previous Color" type="button" style="display: block;">Previous Color</button>',
    nextArrow:
      '<button class="slick-next slick-arrow" aria-label="Next Color" type="button" style="display: block;">Next Color</button>',
    customPaging: function (slider, i) {
      // this example would render "tabs" with titles
      return (
        '<button type="button" id="slick-slide-control0' +
        (i + 1) +
        '" aria-controls="slick-slide0' +
        (i + 1) +
        '" aria-label="product ' +
        (i + 1) +
        " 0f " +
        slider.slideCount +
        ', button">' +
        (i + 1) +
        "</button>"
      );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  });

  // Variation Change
  // $('.var-list').on('click', 'a', updateVar);
  $('.var-list').on('change', 'input[type="radio"]', updateVar);
  $('.color-opts').on('click', 'button', updateColor);
  $('.prod-opts').on('click', '.fav', toggleFav);

  function toggleFav(e) {
    e.preventDefault();

    let _this = $(this);
    _this.toggleClass('active');

    let pressed = (_this.hasClass('active')) ? 'true' : 'false';
    _this.attr('aria-pressed', pressed);
  }

  function updateColor(e) {
    e.preventDefault();

    let _this = $(this);
    let _parent = _this.parents('li');
    let isActive = _parent.hasClass('active');

    let color = _this.data('color');
    color = color.replace('-', ' ');

    if (!isActive) {

      $('.color-opts').find('li').removeClass('active');
      _parent.addClass('active');

      $('.selected-color').html(color);
      $('.spec-list').find('.spec-color .val').html(color);

      $('.color-opts').find('li').each(function (i, k) {

        let color = $(k).find('a').data('color');
        color = color.replace('-', ' ');

        let label = color + ', button';

        if ($(k).hasClass('active')) {
          label = label + ', selected';
        }

        $(k).find('a').attr('aria-label', label);

      });

    }
  }

  function updateVar(e) {
    e.preventDefault();

    let _this = $(this);
    let _parent = _this.parents('li');
    let isActive = _parent.hasClass('active');

    let fit = _parent.find('label').data('fit');
    let size = _parent.find('label').data('size');
    let nose = _parent.find('label').data('nose');
    let lens = _parent.find('label').data('lens');
    let arm = _parent.find('label').data('arm');
    let labelTxt = _parent.find('label').attr('aria-label');

    if (!isActive) {

      $('.var-list').find('li').each(function () {
        let txt = $(this).find('label').attr('aria-label');
        txt = txt.replace('checked', '');
        $(this).find('label').attr('aria-label', txt);
      });

      $('.var-list').find('li').removeClass('active');
      _parent.addClass('active');

      _parent.find('label').attr('aria-label', labelTxt + 'checked');

      $('.var-selected').find('.fit-size').html(fit);
      $('.size-guide').find('.size-val').html(size);
      $('.size-guide').find('.nose-txt span').html(nose);
      $('.size-guide').find('.arm-txt span').html(arm);
      $('.size-guide').find('.lens-txt span').html(lens);
      $('.spec-list').find('.spec-size .val').html(size);
      $('.spec-list').find('.spec-fit .val').html(fit);
      $('.size-guide').attr('aria-label', lens.replace('mm', '') + '-' + nose.replace('mm', '') + '-' + arm.replace('mm', '') + ', nose bridge ' + nose + ', lens width ' + lens + ', arm length ' + lens);
    }

  }

  // Gallery Detail
  let windowWidth = $(window).width();
  $('.gallery-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    swipe: false
  });

  $('.gallery-main').on('click', '.items', gallerySlideSync);
  function gallerySlideSync(e) {
    // e.preventDefault();
    e.stopPropagation();

    let slide = $(this).parents('.slick-slide').attr('data-slick-index');

    $('.gallery-popup').fadeIn(250, function () {
      $('.gallery-popup-main').slick('slickGoTo', slide);
      $('.gallery-popup-main').slick('setPosition');
    });

  }

  $('.gallery-thumbs').on('click', '.items', function () {
    let isOverlay = $(this).hasClass('overlay');

    if (!isOverlay) {
      let slide = $(this).attr('data-slide');
      let isActive = $(this).hasClass('active');

      if (!isActive && slide) {
        $('.gallery-thumbs').find('.items').removeClass('active');
        $(this).addClass('active');
        $('.gallery-main').slick('slickGoTo', slide);
      }
    }

  });

  let thumbsCount = 5;
  if (windowWidth > 1023) {
    thumbsCount = 5;
  }

  if (windowWidth < 767) {
    thumbsCount = 3;
  }

  let thumbsExCount = 1;
  $('.gallery-thumbs').find('.items').each(function (i) {
    if (i == 0) {
      $(this).addClass('active');
      $('.gallery-main').slick('slickGoTo', i);
    }

    if (i == thumbsCount) {
      $(this).addClass('overlay');
    }

    if (i > thumbsCount) {
      $(this).hide();
      thumbsExCount++;
    }
  });
  $('.gallery-thumbs').find('.overlay').append('<a href="" class="txt popup-link" data-popup="gallery-poupup" aria-label="Button, view ' + thumbsExCount + ' more photos">+' + thumbsExCount + '</a>');

  // Popup Gallery
  $('.gallery-popup-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    infinite: false,
    draggable: false,
    swipe: false,
    prevArrow:
      '<button class="slick-prev slick-arrow" aria-label="Previous Image" type="button" style="display: block;">Previous Image</button>',
    nextArrow:
      '<button class="slick-next slick-arrow" aria-label="Next Image" type="button" style="display: block;">Next Image</button>',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
        },
      },
    ],
  });

  $('.gallery-popup').find('.slide-count .total-count').html($('.gallery-popup-main').find('.items').length);

  $('.gallery-popup-main').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('.gallery-popup-thumbs').find('.items').removeClass('active');
    $('.gallery-popup-thumbs').find('.items[data-slide="' + nextSlide + '"]').addClass('active');
    $('.gallery-popup').find('.slide-count .curr-count').html(nextSlide + 1);

    let thumbAreaWidth = $('.gallery-popup-thumbs').width();
    let totalSlides = $('.gallery-popup-thumbs').find('.items').length;
    let totalWidth = $('.gallery-popup-thumbs').find('.items').eq(1).width() + parseInt($('.gallery-popup-thumbs').find('.items').eq(1).css('marginLeft')) + 4;
    let slidesOnView = Math.floor(thumbAreaWidth / totalWidth);
    let scrolledSlides = totalSlides - slidesOnView;
    let currPage = $('.gallery-thumb-pagination').find('.active > a').attr('data-dot');

    // console.log(slidesOnView, scrolledSlides, totalWidth, thumbAreaWidth);

    if (nextSlide >= slidesOnView) {
      $('.gallery-popup-thumbs').mCustomScrollbar("scrollTo", nextSlide * totalWidth);
    }

    if (nextSlide <= (scrolledSlides)) {
      let next = (nextSlide > 0) ? nextSlide - 1 : nextSlide;
      $('.gallery-popup-thumbs').mCustomScrollbar("scrollTo", next * totalWidth);
    }

    let sets = $('.gallery-popup-thumbs').data('sets');
    let currSet = $('.gallery-popup-thumbs').data('activeSet');
    let slidesOnCurrView = $('.gallery-popup-thumbs').data('slideCurrView');
    let prevSlideCurrView = slidesOnCurrView - slidesOnView;

    // console.log('before: ', currSet, slidesOnCurrView, prevSlideCurrView);

    if (nextSlide >= slidesOnCurrView) {
      currSet++;
      slidesOnCurrView = slidesOnCurrView + slidesOnView;
    }

    if (nextSlide <= prevSlideCurrView) {
      currSet--;
      slidesOnCurrView = slidesOnCurrView - slidesOnView;
    }

    $('.gallery-popup-thumbs').data('activeSet', currSet);
    $('.gallery-popup-thumbs').data('slideCurrView', slidesOnCurrView);

    $(document).find('.gallery-thumb-pagination li').removeClass('active');
    $(document).find('.gallery-thumb-pagination li').eq(currSet - 1).addClass('active');

    $('.gallery-thumb-pagination').find('li').each(function (i, k) {
      let active = $(k).hasClass('active');
      let item = parseInt(i + 1);

      let label = (active) ? 'View page ' + item + ' of ' + totalSlides + ', button, current' : 'View page ' + item + ' of ' + totalSlides + ', button';
      $(k).find('a').attr('aria-label', label);
    });

  });

  $('.gallery-popup-thumbs').on('click', '.items', function () {

    // let ditto = $(this).hasClass('ditto');

    // if (!ditto) {
    let slide = $(this).attr('data-slide');
    let isActive = $(this).hasClass('active');

    if (!isActive) {
      $('.gallery-popup-thumbs').find('.items').removeClass('active');
      $(this).addClass('active');
      $('.gallery-popup-main').slick('slickGoTo', slide);
    }
    // }

  });

  $('.gallery-popup-thumbs').on('keydown', function (e) {

    let nextSlide;
    let slide = $(this).find('.active').attr('data-slide');
    let totalSlides = $(this).find('.items').length;
    let totalWidth = $(this).find('.items').eq(1).outerWidth() + parseInt($(this).find('.items').eq(1).css('marginLeft'));
    let slidesOnView = 9;
    let scrolledSlides = totalSlides - slidesOnView;

    if (e.keyCode == 39) {
      nextSlide = parseInt(slide) + 1;
    }

    if (e.keyCode == 37) {
      nextSlide = parseInt(slide) - 1;
    }

    if (nextSlide != undefined) {
      $('.gallery-popup-main').slick('slickGoTo', nextSlide);
    }

  });

  // $('.gallery-popup-thumbs').find('.items').each(function (i) {
  //   if (i == 1) {
  //     $(this).addClass('active');
  //     $('.gallery-popup-main').slick('slickGoTo', i);
  //   }
  // });

  if ($('.gallery-popup-thumbs').length) {

    let thumbItems = $('.gallery-popup-thumbs').find('.items');
    let itemWidth = thumbItems.eq(1).outerWidth();
    let itemGutter = thumbItems.eq(1).css('marginLeft');
    let itemTotalWidth = itemWidth + parseInt(itemGutter) + 4;


    $('.gallery-popup-thumbs').mCustomScrollbar({
      axis: "x",
      theme: "dark-thin",
      autoExpandScrollbar: true,
      advanced: { autoExpandHorizontalScroll: true },
      snapAmount: itemTotalWidth,
      snapOffset: 0,
      keyboard: { enable: false, scrollType: "stepped" },
      mouseWheel: { scrollAmount: itemTotalWidth, normalizeDelta: true },
    });
  }

  // Gallery Thumb Pagination Functionality
  $('body').on('click', '.gallery-thumb-pagination a', thumbPaginate);
  function thumbPaginate(e) {
    e.preventDefault();
    let thumbsWidth = $('.gallery-popup-thumbs').width();
    let pageDot = $(this).attr('data-dot') - 1;
    let isActive = $(this).parents('li').hasClass('active');
    let totalDots = $('.gallery-thumb-pagination').find('li').length;

    if (!isActive) {
      $(document).find('.gallery-thumb-pagination li').removeClass('active');
      $(this).parents('li').addClass('active');
      $('.gallery-popup-thumbs').mCustomScrollbar("scrollTo", thumbsWidth * pageDot);
    }

    $('.gallery-thumb-pagination').find('li').each(function (i, k) {
      let active = $(k).hasClass('active');
      let item = parseInt(i + 1);

      let label = (active) ? 'View page ' + item + ' of ' + totalDots + ', button, current' : 'View page ' + item + ' of ' + totalDots + ', button';
      $(k).find('a').attr('aria-label', label);
    });
  }

  // Edit VTO
  $('.vto-options').on('click', '.edit-icon', function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).parents('.vto-options').find('.opts').fadeToggle();
  });

  // Popup
  $('.popup').on('click', '.popup-close, .overlay, .btn-close', popupClose);
  $('.popup-link').on('click', popupOpen);
  function popupOpen(e) {
    e.preventDefault();

    let _this = $(this);
    let popUp = _this.attr('data-popup');


    $('#' + popUp).fadeIn(250, function () {
      $('#' + popUp).focus();
      if ($('#' + popUp).hasClass('gallery-popup')) {
        $('.gallery-popup-main').slick('setPosition');
        $('.gallery-popup-thumbs').mCustomScrollbar("scrollTo", "0");

        // Pagination Layout
        let thumbItems = $('.gallery-popup-thumbs').find('.items');
        let wrapperWidth = $('.gallery-popup-thumbs').width();
        let itemWidth = thumbItems.eq(1).outerWidth();
        let itemGutter = thumbItems.eq(1).css('marginLeft');
        let itemTotalWidth = itemWidth + parseInt(itemGutter);
        let totalItems = thumbItems.length;

        let itemsInView = Math.floor(wrapperWidth / itemTotalWidth);
        let paginationCount = Math.ceil(totalItems / itemsInView);

        if ($('body').find('.gallery-thumb-pagination').length > 0) {
          $('body').find('.gallery-thumb-pagination').remove();
        }

        thumbItems.eq(0).addClass('active');

        let pagination;
        if (totalItems > itemsInView) {

          pagination = '<ul class="gallery-thumb-pagination">';

          for (let i = 1; i <= paginationCount; i++) {
            let activeClass = (i == 1) ? 'active' : '';
            let label = (activeClass) ? 'View page ' + i + ' of ' + paginationCount + ', button, current' : 'View page ' + i + ' of ' + paginationCount + ', button';

            pagination += '<li class="' + activeClass + '"><a aria-label="' + label + '" data-dot="' + i + '" href="#" >' + i + '</a></li>';

          }

          pagination += '</ul>';

        }

        if (pagination != undefined) {
          $('.gallery-popup-thumbs').after(pagination);
        }

        if (!$('.gallery-popup-thumbs').data('sets')) {
          $('.gallery-popup-thumbs').data('sets', Math.ceil(totalItems / itemsInView));
        }

        if (!$('.gallery-popup-thumbs').data('activeSet')) {
          $('.gallery-popup-thumbs').data('activeSet', '1');
        }

        if (!$('.gallery-popup-thumbs').data('slideCurrView')) {
          $('.gallery-popup-thumbs').data('slideCurrView', itemsInView);
        }
      }
    });
  }

  function popupClose(e) {
    e.preventDefault();

    let _this = $(this);
    let popUp = _this.parents('.popup');

    popUp.fadeOut(250);
  }

  // Vto Popup Continue Buttons
  $('.vto-cont').on('click', function (e) {
    e.preventDefault();

    let _this = $(this);
    let popUp = _this.parents('.popup');
    let isConsentPopup = popUp.hasClass('vto-rec');
    let isCardPopup = popUp.hasClass('vto-card');

    if (isConsentPopup) {
      let isTermsChecked = popUp.find('input[type="checkbox"]').is(':checked');

      if (!isTermsChecked) {
        popUp.find('.field').addClass('error');
      } else {
        popUp.find('.field').removeClass('error');
        popUp.fadeOut(250);
      }
    }

    if (isCardPopup) {
      let isPDChecked = popUp.find('#pd-both').is(':checked');
      popUp.find('.field').removeClass('error');

      if (isPDChecked) {
        let rightPD = $('#right-pd').val();
        let leftPD = $('#left-pd').val();

        if (!rightPD) {
          $('.pd-right').addClass('error');
        } else {
          $('.pd-right').removeClass('error');
        }

        if (!leftPD) {
          $('.pd-left').addClass('error');
        } else {
          $('.pd-left').removeClass('error');
        }

        if (rightPD && leftPD) {
          popUp.find('.field').removeClass('error');
          popUp.fadeOut(250);
        }
      } else {
        let bothPD = $('#choose-pd').val();

        if (!bothPD) {
          $('.pd-single').addClass('error');
        } else {
          $('.pd-single').removeClass('error');
          popUp.find('.field').removeClass('error');
          popUp.fadeOut(250);
        }
      }
    }

    


  });

  $('.mobile-section-drawer button').on('click', function (e) {
    $(this).parent().toggleClass('opened');
    $(this).toggleClass('active');
    $(this).parent().find('.mobile-section-drawer-container').slideToggle();
    let expanded = 'false';
    if ($(this).hasClass('active')) { expanded = 'true'; }
    $(this).attr('aria-expanded', expanded);
  });
  // PD Field
  $('#pd-both').on('change', function () {

    let _this = $(this);
    let isChecked = _this.is(':checked');

    if (isChecked) {
      $('.pd-single').hide();
      $('.pd-both').show();
    } else {
      $('.pd-single').show();
      $('.pd-both').hide();
    }

  });

  // Image Zoom
  $('.zoom-icon').on('click', function () { $(this).parents('.items').find('.zoom').trigger('click'); });
  $('.pan').on('click', 'a', panImgArrows);
  $('.zoom').on('click', zoomImg);
  $('.zoom').on('mousemove touchmove', panImg);

  function panImgArrows(e) {
    e.preventDefault();

    let is_ditto = $(this).parents('.items').hasClass('ditto');
    let up = $(this).hasClass('up');
    let down = $(this).hasClass('down');
    let left = $(this).hasClass('left');
    let right = $(this).hasClass('right');

    if (!is_ditto) {
      let topPos = $(this).parents('.items').find('.zoom-img').css('top');
      let leftPos = $(this).parents('.items').find('.zoom-img').css('left');
      let move = 20

      if (up) {
        topPos = parseInt(topPos) - move;
      }

      if (down) {
        topPos = parseInt(topPos) + move;
      }

      if (left) {
        leftPos = parseInt(leftPos) - move;
      }

      if (right) {
        leftPos = parseInt(leftPos) + move;
      }

      $(this).parents('.items').find('.zoom-img').animate({
        'top': topPos,
        'left': leftPos
      });
    }

    if (is_ditto) {

      let Activeimg = $('.gallery-popup-main .viewer').find('img.active');
      let imgIndex = Activeimg.index();

      // Right
      if (right) {
        $('.gallery-popup-main .viewer').find('img').removeClass('active');
        let nextIndex = (imgIndex == '119') ? 0 : imgIndex + 1;
        $('.gallery-popup-main .viewer').find('img').eq(nextIndex).addClass('active');
      }

      // Left
      if (left) {
        $('.gallery-popup-main .viewer').find('img').removeClass('active');
        let prevIndex = (imgIndex == '0') ? 119 : imgIndex - 1;
        $('.gallery-popup-main .viewer').find('img').eq(prevIndex).addClass('active');
      }

    }

  }

  function panImg(e) {
    e.preventDefault();

    let zClass1 = $(this).hasClass('z1');
    let zClass2 = $(this).hasClass('z2');

    let zOff = (zClass2) ? 1 : 2;

    let mouseX = 0;
    let mouseY = 0;

    if (e.type == 'touchmove') {
      mouseX = Math.round((e.originalEvent.touches[0].clientX * -1) / zOff);
      mouseY = Math.round((e.originalEvent.touches[0].clientY * -1) / zOff);
    } else {
      mouseX = Math.round((e.offsetX * -1) / zOff);
      mouseY = Math.round((e.offsetY * -1) / zOff);
    }

    if (zClass1 || zClass2) {
      $(this).find('.zoom-img').css({
        'top': mouseY,
        'left': mouseX
      });
    }
  }

  function zoomImg(e) {
    console.log(e.type);
    let _this = $(this);
    let zClass1 = $(this).hasClass('z1');
    let zClass2 = $(this).hasClass('z2');

    let zOff = 2;
    let zoom = 1.5;

    if (zClass1) {
      zoom = 2;
      zOff = 1;

      $(this).removeClass('z1').addClass('z2');
    }

    if (!zClass1) {
      $(this).addClass('z1');
    }

    let mouseX = Math.round(e.offsetX / zOff);
    let mouseY = Math.round(e.offsetY / zOff);
    let zWidth = Math.round($(this).width() * zoom);

    mouseX = mouseX - (mouseX * 2);
    mouseY = mouseY - (mouseY * 2);

    if (!zClass2) {
      $(this).find('.zoom-img').animate({
        'opacity': 1,
        'top': mouseY,
        'left': mouseX,
        'width': zWidth
      });
      $(this).find('.img').animate({
        'opacity': 0
      });
    } else {
      $(this).removeClass('z2 z1');
      $(this).find('.zoom-img').animate({
        'top': 0,
        'left': 0,
        'width': '100%'
      }, 300);
      setTimeout(function () {
        _this.find('.zoom-img').animate({ 'opacity': 0 });
      }, 350);
      $(this).find('.img').animate({
        'opacity': 1
      });
    }
  }

  $('.switch-toggle').on('change', 'input[type="checkbox"]', function () {
    if ($(this).is(':checked')) {
      $('.popup-footer').find('.allow-btn').hide();
    } else {
      $('.popup-footer').find('.allow-btn').show();
    }
  });

  // 360
  // build scene
  if ($('.gallery-main').length) {
    const viewer = document.querySelector('.viewer');
    const mainGallery = document.querySelector('.gallery-main');
    const popupGallery = document.querySelector('.gallery-popup-main');
    const mainGalleryImages = [];
    const popupImages = [];

    $('.gallery-main .viewer').find('img').each(function () {
      mainGalleryImages.push(this);
    });

    $('.gallery-popup-main .viewer').find('img').each(function () {
      popupImages.push(this);
    });

    //	rotation handler
    const threshold = 5;
    const mainTotal = mainGalleryImages.length - 1;
    const popupTotal = popupImages.length - 1;
    let mainFrame = 0;
    let popupFrame = 0;

    const impetus = new Impetus({
      source: mainGallery,
      update(x) {
        console.log(x);
        mainGalleryImages[mainFrame].classList.remove('active');
        mainFrame = Math.floor(-x / threshold) % mainTotal;
        mainFrame = mainFrame <= 0 ? mainTotal + mainFrame : mainFrame;
        mainGalleryImages[mainFrame].classList.add('active');
      }
    });
    mainGalleryImages[mainFrame].classList.add('active');

    const impetus2 = new Impetus({
      source: popupGallery,
      update(x) {
        popupImages[popupFrame].classList.remove('active');
        popupFrame = Math.floor(-x / threshold) % popupTotal;
        popupFrame = popupFrame <= 0 ? popupTotal + popupFrame : popupFrame;
        popupImages[popupFrame].classList.add('active');
      }
    });
    popupImages[popupFrame].classList.add('active');

    $(document).on('keydown', move360);

    function move360(e) {
      let kc = e.which || e.keyCode;
      let Activeimg = $('.gallery-main .viewer').find('img.active');
      let imgIndex = Activeimg.index();

      // Right
      if (kc == '37') {
        $('.gallery-main .viewer').find('img').removeClass('active');
        let nextIndex = (imgIndex == '119') ? 0 : imgIndex + 1;
        $('.gallery-main .viewer').find('img').eq(nextIndex).addClass('active');
      }

      // Left
      if (kc == '39') {
        $('.gallery-main .viewer').find('img').removeClass('active');
        let prevIndex = (imgIndex == '0') ? 119 : imgIndex - 1;
        $('.gallery-main .viewer').find('img').eq(prevIndex).addClass('active');
      }
    }
  }
  
});


$(document).ready(function(){

$('input').blur(function(){
    if($(this).is('.first-name.error') && !$(this).val() == ''){
      $(this).parent().find('.first-name').removeClass('error').attr("aria-invalid", "false").find('.f-name-error').remove();
      $(this).parent().find('.f-name-error').remove();
    }
    
    if($(this).is('.last-name.error') && !$(this).val() == ''){
      $(this).parent().find('.last-name').removeClass('error').attr("aria-invalid", "false").find('.l-name-error').remove();
      $(this).parent().find('.l-name-error').remove();
    }
  });

  $( ".form-validate" ).submit(function( event ) {
    var isValid = true;
    if(!$('#first-name').val()){
      $(this).find('#first-name').addClass('error');
      if($('.f-name-error').length === 0){
        $(this).find('#first-name').attr("aria-describedby","firstNameRequiredError").attr("aria-invalid", "true");
        $(this).find('#first-name').parent().append('<span aria-hidden="false" role="alert" id="firstNameRequiredError" class="error-message f-name-error">First Name is required.</span>');
      }
    }else{
      $(this).find('#first-name').removeClass('error').find('.error-message').remove();
      $(this).find('#first-name').attr("aria-invalid", "false");
      $(this).find('.f-name-error').remove();
    }

    if(!$('#last-name').val()){
      $(this).find('#last-name').addClass('error');
      if($('.l-name-error').length === 0){
        $(this).find('#last-name').attr("aria-describedby","lastNameRequiredError").attr("aria-invalid", "true");
        $(this).find('#last-name').parent().append('<span aria-hidden="false" role="alert" id="lastNameRequiredError" class="error-message l-name-error">Last Name is required.</span>');
      }
    }else{
      $(this).find('#last-name').removeClass('error').find('.error-message').remove();
      $(this).find('#last-name').attr("aria-invalid", "false");
      $(this).find('.l-name-error').remove();
    }

    if($('#first-name').hasClass('error') || $('#last-name').hasClass('error')){
      event.preventDefault();
      $(this).find('.error').first().focus();
    }
    
  });

});
//Show sub options
$('.selection-style > .selection-style-wrapper > .selection-inner > .selection-item > input:radio').on('change', function() {
  $('.selection-style-wrapper').find('.sub-options').slideUp();
  if($(this).closest('.selection-style-wrapper').hasClass('has-sub-options')){
    $(this).closest('.selection-style-wrapper').find('.sub-options').slideDown(200);
  }else{
    $(this).closest('.selection-style-wrapper').find('.sub-options').slideUp(200);
  }
});

//Show detail box on click
$('.button-detail' ).click(function(e) {
  e.preventDefault();
  $(this).toggleClass('active');
  let expanded = 'false';
  if ($(this).hasClass('active')) { expanded = 'true'; }
  $(this).attr('aria-expanded', expanded);

  $(this).parent().parent().find('.detail-box').slideToggle();
});
//Show Edit PD Box
$( ".edit-pd" ).click(function(e) {
  e.preventDefault();
  $(this).parent().parent().hide();
  $('body').find('.pd-fields').show();
});
// Search Call
$(document).on('click', clickOutsideSugg);
function clickOutsideSugg(e) {

  let suggBox = $('.search-wrapper').find('.sugg-box');

  if ($(e.target).parents('.search-wrapper').length > 0) {
    // Clicked in box
    suggBox.show();
    $('.search-wrapper').find('.sugg-place').show();
    $('.search-wrapper').find('.sugg-typed').show();
  } else {
    // Clicked outside the box
    suggBox.hide();
    $('.search-wrapper').find('.sugg-place').hide();
    $('.search-wrapper').find('.sugg-typed').hide();
  }
}

$(document).on('keydown', navigateResults);
function navigateResults(e) {

  let kc = e.which || e.keyCode;
  let current = $('.search-wrapper').find('.sugg-box .focused');

  // Down
  if (kc == '40') {
    e.preventDefault();
    e.stopPropagation();

    let next = current.next("li");
    if (next.length) {
      current.removeClass("focused");
      next.addClass("focused");
      next.focus();
    }
  }

  // Up
  if (kc == '38') {
    e.preventDefault();
    e.stopPropagation();

    var prev = current.prev("li");
    if (prev.length) {
      current.removeClass("focused");
      prev.addClass("focused");
      prev.focus();
    }
  }

  // Enter
  if (kc == '13') {
    let selected = $('.search-wrapper').find('.sugg-box .focused .title').text();

    if ($('.search-field').is(':focus')) {
      $('.search-field').val(selected);
      $('.search-wrapper').find('.sugg-typed').html(selected);
      $('.search-wrapper').find('.sugg-place').html(selected);
      $('form.search').trigger('submit');
    }
  }
}

$('.search-wrapper').on('click', '.sugg-box li', search);
function search() {
  let selected = $(this).find('.title').text();

  $('.search-field').val(selected);
  $('.search-wrapper').find('.sugg-typed').html(selected);
  $('.search-wrapper').find('.sugg-place').html(selected);
  $('form.search').trigger('submit');
}

$('.search-field').on('keydown', getSearchResults);
function getSearchResults(e) {

  let _this = $(this);
  setTimeout(function () {
    let kc = e.which || e.keyCode;
    let searchTerm = _this.val();
    let suggHTML = '';
    let suggVal = 1;
    let suggItem = 1;

    if (kc == '40') {
      e.preventDefault();
      $('.search-wrapper').find('.sugg-box li:first-child').addClass('focused').focus();
      return;
    }

    if (searchTerm) {
      $('.search-wrapper').find('.sugg-box').remove();
      $('.search-wrapper').find('.sugg-place').remove();
      $('.search-wrapper').find('.sugg-typed').remove();
      $('.search-wrapper').append('<span class="sugg-typed">' + searchTerm + '</span>');

      $.ajax({
        url: 'https://-optical-qa.azurewebsites.net/Search/AutoCompleteAndSuggest',
        type: 'POST',
        data: { 'searchTerm': searchTerm },

        success: function (resp) {

          if (resp.results.length > 0) {
            suggHTML += '<ul class="sugg-box" tabindex="0">';
            $.each(resp.results, function (i, v) {

              let type = v.type;
              let re = new RegExp(searchTerm, "i");

              if (type == 'Suggestion') {
                if (suggVal == 1) {
                  if ($('.search-wrapper').find('.sugg-place').length == 0) {
                    $('.search-wrapper').prepend('<span class="sugg-place">' + v.renderValue + '</span>');
                  }

                  if (kc == 9) {
                    e.preventDefault();
                    $('.search-wrapper').find('.sugg-typed').html(v.renderValue);
                    _this.val(v.renderValue);
                  }
                }

                let renderVal = v.renderValue.replace(re, `<strong>${searchTerm}</strong>`);
                suggHTML += '<li tabindex="0">';
                suggHTML += '<span class="title">' + renderVal + '</span>';

                suggVal++;

              } else {

                let suggClass = (suggItem == 1) ? 'first' : '';

                let renderVal = v.name.replace(re, `<strong>${searchTerm}</strong>`);
                suggHTML += '<li class="suggestion-item ' + suggClass + '" tabindex="0">';
                suggHTML += '<img src="' + v.itemUrl + '" alt="' + v.name + '">';
                suggHTML += '<span class="title">' + renderVal + '</span>';

                suggItem++;

              }

              suggHTML += '</li>';

            });
            suggHTML += '</ul>';

            if ($('.search-wrapper').find('.sugg-box').length == 0) {
              $('.search-wrapper').append(suggHTML);
            }
          }

        }
      });
    }

  }, 200);

}


