(function ($) {
    'use strict';

    // === 01. Admin Panel Menu
    function adminPanelMenu() {
        var menuItems = $('.panel-menu li'),
            hamburgerBtn = $('.menu-hamburger'),
            adminArea = $('.admin-area'),
            panelClose = $('.panel-close'),
        closeSideBar = $('.mobile-menu-close');

        // hamburger toggler
        hamburgerBtn.on('click', function () {
            adminArea.toggleClass('toogle-panel');
        });

        panelClose.on('click', function () {
            adminArea.removeClass('toogle-panel');
        });

        closeSideBar.on('click', function () {
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
        adminPanelMenu();

    });


})(jQuery);