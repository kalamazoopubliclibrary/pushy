/*! Pushy - v1.1.0 - 2017-1-30
 * Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
 * https://github.com/christophery/pushy/
 * by Christopher Yee */

(function($) {
  var pushy = $(".pushy"), //menu css class
    body = $("body"),
    container = $("#container"), //container css class
    push = $(".push"), //css class to add pushy capability
    pushyLeft = "pushy-left", //css class for left menu position
    pushyOpenLeft = "pushy-open-left", //css class when menu is open (left position)
    pushyOpenRight = "pushy-open-right", //css class when menu is open (right position)
    siteOverlay = $(".site-overlay"), //site overlay
    menuBtn = $(".menu-btn, .pushy-link"), //css classes to toggle the menu
    menuCloseBtn = $(".pushy-close"), //css classes to toggle the menu
    menuLinkFocus = $(pushy.data("focus")), //focus on link when menu is open
    submenuClass = ".pushy-submenu",
    submenuOpenClass = "pushy-submenu-open",
    submenuClosedClass = "pushy-submenu-closed",
    submenu = $(submenuClass),
    focusEl = null,
    opened = false;

  function togglePushy(e) {
    if (opened) {
      closePushy(e);
    } else {
      openPushy(e);
    }
  }

  function closePushy(e) {
    opened = false;
    if (pushy.hasClass(pushyLeft)) {
      body.removeClass(pushyOpenLeft);
    } else {
      body.removeClass(pushyOpenRight);
    }

    pushy.one("transitionend", function() {
      pushy.css("display", "none");

      if (focusEl) {
        focusEl.focus();
      }
    });
  }

  function openPushy(e) {
    opened = true;
    focusEl = e.target;
    pushy.css("display", "block");

    if (pushy.hasClass(pushyLeft)) {
      body.addClass(pushyOpenLeft);
    } else {
      body.addClass(pushyOpenRight);
    }

    //focus on link in menu after css transition ends
    // TODO aria-hidden stuff
    if (menuLinkFocus) {
      pushy.one("transitionend", function() {
        menuLinkFocus.focus();
      });
    }
  }

  function toggleSubmenu() {
    //hide submenu by default
    submenu.addClass(submenuClosedClass);

    submenu.on("click", function(e) {
      var selected = $(this);

      if (selected.hasClass(submenuClosedClass)) {
        //hide same-level opened submenus
        selected
          .siblings(submenuClass)
          .addClass(submenuClosedClass)
          .removeClass(submenuOpenClass);
        //show submenu
        selected.removeClass(submenuClosedClass).addClass(submenuOpenClass);
      } else {
        //hide submenu
        selected.addClass(submenuClosedClass).removeClass(submenuOpenClass);
      }
      // prevent event to be triggered on parent
      e.stopPropagation();
    });
  }

  //toggle submenu
  toggleSubmenu();

  //toggle menu
  menuBtn.on("click", function(e) {
    togglePushy(e);
  });

  //close menu when clicking site overlay or close button
  menuCloseBtn.on("click", function() {
    closePushy();
  });
  siteOverlay.on("click", function() {
    closePushy();
  });

  //close menu w/ esc key
  $(document).keyup(function(e) {
    //check if esc key is pressed
    if (e.keyCode == 27) {
      if (opened) {
        closePushy();
      }
    }
  });
})(jQuery);
