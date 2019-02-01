/*!
 * [Project Name]
 * ABS-CBN Corporation 2017
 */

var ABSCBN = (function() {
	'use strict';

	function init() {
		// Your code here
		$('.main-carousel').slick({
            slide: 'article',
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            arrows: true
        });
	}

	return {
		init: init
	};
}());

jQuery(document).ready(function($) { ABSCBN.init(); });
