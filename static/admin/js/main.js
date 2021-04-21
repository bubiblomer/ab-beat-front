(function ($) {
	// === 01. Preloader
	function preloader() {
		if ($('.preloader').length) {
			$('.preloader').delay(100).fadeOut(500);
		}
	}

	// === 02. Main Menu
	function mainMenu() {
		var mobileMenu = $('.mobile-menu'),
			menuItems = $('.main-nav'),
			navbarToggler = $('.navbar-toggler'),
			closeIcon = $('.navbar-close'),
			closeSideBar = $('.mobile-menu-close');

		// Navbar toggler
		navbarToggler.on('click', function () {
			navbarToggler.toggleClass('active');
			mobileMenu.toggleClass('menu-on');
		});

		// Close icon
		closeIcon.on('click', function (e) {
			mobileMenu.removeClass('menu-on');
			navbarToggler.removeClass('active');
			e.preventDefault();
		});
		// Close icon
        closeSideBar.on('click', function (e) {
			mobileMenu.removeClass('menu-on');
			navbarToggler.removeClass('active');
			e.preventDefault();
		});



		// Adds toggle button to li items that have children
		menuItems.find('li a').each(function () {
			if ($(this).next().length > 0) {
				$(this)
					.parent('li')
					.append('<span class="dd-trigger"><i class="fal fa-angle-down"></i></span>');
			}
		});

		// expands the dropdown menu on each click
		menuItems.find('li .dd-trigger').on('click', function (e) {
			e.preventDefault();
			$(this)
				.toggleClass('open')
				.parent('li')
				.children('ul')
				.stop(true, true)
				.slideToggle(350);
		});

	}

	// === 03. Feedback Slider
	function feedBackSlider() {
		var authorSlider = $('.feedback-author-slider'),
			contentSlider = $('.feedback-content-slider');

		contentSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 500,
			arrows: true,
			dots: false,
			nextArrow: '<button class="slick-arrow next-arrow"><i class="fal fa-angle-right"></i></button>',
			prevArrow: '<button class="slick-arrow prev-arrow"><i class="fal fa-angle-left"></i></button>',
			asNavFor: authorSlider,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						arrows: false,
					}
				},
			]
		});

		authorSlider.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 500,
			arrows: false,
			dots: false,
			asNavFor: contentSlider,
			focusOnSelect: true,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
					}
				},
			]
		});
	}

	// === 04. Nice Select
	function niceSelect() {
		$('select').niceSelect();
	}

	// === 05. Sports Type Slider
	function sportsTypeSlider() {
		var slick_slider = $('.sports-type-slider-xs');
		var settings_slider = {
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 500,
			arrows: true,
			dots: false,
			nextArrow: '<button class="slick-arrow next-arrow"><i class="fal fa-angle-right"></i></button>',
			prevArrow: '<button class="slick-arrow prev-arrow"><i class="fal fa-angle-left"></i></button>',
		}

		slick_on_xs_device(slick_slider, settings_slider);
	}

	// === Slick On Samll Mobile
	function slick_on_xs_device(slider, settings) {
		$(window).on('load resize', function () {

			if ($(window).width() > 600) {
				if (slider.hasClass('slick-initialized')) {
					slider.slick('unslick');
				}
				return
			}

			if (!slider.hasClass('slick-initialized')) {
				return slider.slick(settings);
			}
		});
	};

	// === Get Random Number
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}



	// === 07 Hero Slider
	function heroSlider() {
        $(".hero-slider").not('.slick-initialized').slick();
		var heroslider = $('.hero-slider');
		var heroFirst = $('.single-hero-slide:first-child');

		heroslider.on('init', function (e, slick) {
			var firstAnimatingElements = heroFirst.find(
				'[data-animation]'
			);
			slideanimate(firstAnimatingElements);
		});

		heroslider.on('beforeChange', function (
			e,
			slick,
			currentSlide,
			nextSlide
		) {
			var animatingElements = $(
				'div.slick-slide[data-slick-index="' + nextSlide + '"]'
			).find('[data-animation]');
			slideanimate(animatingElements);
		});

		heroslider.slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 1000,
			speed: 500,
			arrows: false,
			fade: true,
			dots: true,
			swipe: true,
		});
	}

	// ====  Slider Animation
	function slideanimate(elements) {
		var animationEndEvents =
			'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var animationDelay = $this.data('delay');
			var animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': animationDelay,
				'-webkit-animation-delay': animationDelay,
			});
			$this
				.addClass(animationType)
				.one(animationEndEvents, function () {
					$this.removeClass(animationType);
				});
		});
	}


    // === 06. Wager Modal (Dummy Content)
    function wagerModal() {
        $('.table-wager-button').each(function () {
            var teamName = $(this).data('team-name'),
                confrontation = $(this).data('confrontation'),
                wager = $(this).data('wager-count'),
                score = $(this).data('score'),
                minimumAmount = $(this).data('minimum_amount'),
                currency = $(this).data('currency');

            $(this).on('click', function () {
                $('.modal-sport-wager').html(teamName);
                $('.modal-sport-wager-count').html(wager);
                $('.modal-sport-confrontation').html(confrontation);
                $('.modal-sport-live-count').html('[' + score + ']');
                $('.modal-sport-bets-right').html(minimumAmount +currency);
                $('.stepper-input').val(parseInt(minimumAmount));
                $('.stepper-input').attr('min', parseInt(minimumAmount));


                var finalRatio = parseFloat(minimumAmount*wager).toFixed(2);
                $('.modal-sport-win-right').html(finalRatio +currency);
            })
        })
    }

    $(document).on('keyup change click', '.stepper-input', function () {
        var amount = parseInt($(this).val());
        var ratio =  parseFloat($(".modal-sport-wager-count").text());

        var finalRation = parseFloat(amount*ratio).toFixed(2);

        var currency = $('.table-wager-button').data('currency');
        $('.wining-rate').text(finalRation +currency);

    });



    // === 01. Admin Panel Menu
    function adminPanelMenu() {
        var menuItems = $('.panel-menu li'),
            hamburgerBtn = $('.menu-hamburger'),
            adminArea = $('.admin-area'),
            panelClose = $('.panel-close');

        // hamburger toggler
        hamburgerBtn.on('click', function () {
            adminArea.toggleClass('toogle-panel');
        });

        panelClose.on('click', function () {
            adminArea.removeClass('toogle-panel');
        });

        // Adds toggle button to li items that have children
        menuItems.find('a').each(function () {
            if ($(this).next().length > 0) {
                $(this).parent('li').append('<span class="dd-trigger"><i class="fal fa-plus"></i></span>');
            }
        });

        // expands the dropdown menu on each click
        menuItems.find('.dd-trigger').on('click', function (e) {
            e.preventDefault();
            $(this).parent('li').children('ul').stop(true, true).slideToggle(350);
            $(this).find("i").toggleClass("fa-minus fa-plus");
            $(this).parent('li').toggleClass('submenu-open');
        });

    }

    /*---------------------
    === DOCUMENT READY  ===
    ----------------------*/
    $(document).ready(function () {
        mainMenu();
        // feedBackSlider();
        niceSelect('select');
        // sportsTypeSlider();
        // wagerModal();
        // heroSlider();
        adminPanelMenu();

    });

    $(document).on('click','.match__item .match__title', function(){
        var element = $(this).parent('.match__item');
        if(element.hasClass('open')){
            element.removeClass('open');
            element.children('.match__body').slideUp(500)
        }else {
            element.addClass('open');
            element.children('.match__body').slideDown(500)
        }
    });

    /*------------------
    === WINDOW LOAD  ===
    --------------------*/
    $(window).on('load', function () {
        preloader();
    });


})(jQuery);