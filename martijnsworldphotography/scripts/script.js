(function ($) {
  "use strict";

  // Swiper Slider
  var initSlider = function () {
    $('.swiper-carousel').each(function () {
      var swiper = new Swiper(".swiper-carousel", {
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-carousel .swiper-right',
          prevEl: '.swiper-carousel .swiper-left',
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          300: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });
    });

    $('.swiper-slideshow').each(function () {
      var swiper = new Swiper(".swiper-slideshow", {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 700,
        loop: true,
        navigation: {
          nextEl: '.swiper-slideshow .swiper-right',
          prevEl: '.swiper-slideshow .swiper-left',
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    });
  }

  // init Isotope
  var initIsotope = function () {

    $('.grid').each(function () {

      // $('.grid').imagesLoaded( function() {
      // images have loaded
      var $buttonGroup = $('.button-group');
      var $checked = $buttonGroup.find('.is-checked');
      var filterValue = $checked.attr('data-filter');

      var $grid = $('.grid').isotope({
        itemSelector: '.portfolio-item',
        // layoutMode: 'fitRows',
        filter: filterValue
      });

      // Refresh AOS after Isotope is arranged
      $grid.on('arrangeComplete', function () {
        AOS.refresh();
      });

      // bind filter button click
      $('.button-group').on('click', 'a', function (e) {
        e.preventDefault();
        filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
      });

      // change is-checked class on buttons
      $('.button-group').each(function (i, buttonGroup) {
        $buttonGroup.on('click', 'a', function () {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $(this).addClass('is-checked');
        });
      });
      // });

    });
  }

  var initScrollNav = function () {
    var scroll = $(window).scrollTop();
    console

    if (scroll >= 200) {
      $('.bg-color').addClass("bg-secondary");
    } else {
      $('.bg-color').removeClass("bg-secondary");
    }
  }

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  // ------------------------------------------------------------------------------ //
  // Overlay Menu Navigation
  // ------------------------------------------------------------------------------ //
  var overlayMenu = function () {

    if (!$('.nav-overlay').length) {
      return false;
    }

    var body = undefined;
    var menu = undefined;
    var menuItems = undefined;
    var init = function init() {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-btn');
      menuItems = document.querySelectorAll('.nav__list-item');
      applyListeners();
    };
    var applyListeners = function applyListeners() {
      menu.addEventListener('click', function () {
        return toggleClass(body, 'nav-active');
      });
    };
    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass); else element.classList.add(stringClass);
    };
    init();
  }
  $(document).ready(function () {
    initSlider();
    initScrollNav();
    overlayMenu();
    initChocolat();

    AOS.init({
      duration: 1200,
      once: true
    })

    $('#btn-menu').click(function (e) {
      e.preventDefault();
      $('.sidebar-menu').toggleClass('open');
    })

  }); // End of a document

  $(window).load(function () {
    initIsotope();
  });

  $(window).scroll(function () {
    initScrollNav();
  });

})(jQuery);


  // ------------------------------------------------------------------------------ //
  // Email Contact Form
  // ------------------------------------------------------------------------------ //

  $(document).ready(function() {
    // Validation functions
    function validateEmail(email) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    function showError($field, message) {
      $field.next('.error-message').text(message).show();
    }

    function hideError($field) {
      $field.next('.error-message').hide();
    }

    // Real-time validation
    $('#name').on('blur', function() {
      var $this = $(this);
      if ($this.val().trim() === '') {
        showError($this, 'Name is required.');
      } else {
        hideError($this);
      }
    });

    $('#email').on('blur input', function() {
      var $this = $(this);
      var email = $this.val().trim();
      if (email === '') {
        showError($this, 'Email is required.');
      } else if (!validateEmail(email)) {
        showError($this, 'Please enter a valid email address.');
      } else {
        hideError($this);
      }
    });

    $('#message').on('blur', function() {
      var $this = $(this);
      if ($this.val().trim() === '') {
        showError($this, 'Message is required.');
      } else {
        hideError($this);
      }
    });

    $('#contactForm').on('submit', function(e) {
      e.preventDefault();
      var $form = $(this);
      var $btn = $('#submitBtn');
      var $message = $('#formMessage');

      // Clear previous message
      $message.hide().removeClass('alert alert-success alert-danger');

      // Validate all fields
      var isValid = true;
      var $name = $('#name');
      var $email = $('#email');
      var $msg = $('#message');

      if ($name.val().trim() === '') {
        showError($name, 'Name is required.');
        isValid = false;
      }
      if ($email.val().trim() === '') {
        showError($email, 'Email is required.');
        isValid = false;
      } else if (!validateEmail($email.val().trim())) {
        showError($email, 'Please enter a valid email address.');
        isValid = false;
      }
      if ($msg.val().trim() === '') {
        showError($msg, 'Message is required.');
        isValid = false;
      }

      if (!isValid) {
        $message.addClass('alert alert-danger').text('Please correct the errors above.').show();
        return;
      }

      // Disable button
      $btn.prop('disabled', true).text('Sending...');

      // Serialize form data
      var formData = $form.serialize();

      // AJAX GET
      $.ajax({
        url: 'https://api.martijndevelops.nl/api/send-email',
        type: 'GET',
        data: formData,
        dataType: 'json',
        success: function(data) {
          if (data.success) {
            $message.addClass('alert alert-success').text('Thank you for your message! I\'ll get back to you soon.').show();
            $form[0].reset();
            // Hide error messages
            $('.error-message').hide();
          } else {
            $message.addClass('alert alert-danger').text(data.error || 'An error occurred.').show();
          }
        },
        error: function() {
          $message.addClass('alert alert-danger').text('An error occurred. Please try again.').show();
        },
        complete: function() {
          $btn.prop('disabled', false).text('Send Mail');
        }
      });
    });
  }); 