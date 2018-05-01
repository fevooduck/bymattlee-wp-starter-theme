/* ***** ----------------------------------------------- ***** **
** ***** Global JS
** ***** ----------------------------------------------- ***** */

/* global Main, Modernizr */
(function($){
	'use strict';

	Main.modules.global = function() {

		var $body = $('.js-body'),
			
			modernizrCheck = function() {

				var upgradeMessage = 'For am improved browsing experience, please upgrade your browser to the latest version. Click here to upgrade.',
					upgradeMessageMarkup = '<div class="c-upgrade_browser_message"><a href="http://outdatedbrowser.com/" class="c-upgrade_browser_message-link" target="_blank">' + upgradeMessage + '</a></div>';

				// Display message for user to upgrade if browser does not support flexbox
				if (Modernizr.flexbox === false ||
					Modernizr.svg === false) {
					$body.append(upgradeMessageMarkup);
				}

			},

			addNotDeviceClassToBody = function() {

				var utilities = Main.modules.utilities(),
					isDevice = utilities.isDevice();

				if (!isDevice) {
					$body.addClass('l-not_device');
				}

			};

		return {
			init: function() {
				modernizrCheck();
				addNotDeviceClassToBody();
			}
		};
		
	};

})(jQuery);