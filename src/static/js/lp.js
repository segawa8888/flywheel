$(function () {
	/*------------------------------

ページ固有スクリプト

------------------------------*/
	/*

Function

------------------------------ */

if(!$("#mainContents").hasClass("top")) {
	$("[data-module=FadeInMV]").removeAttr('data-module');
}
	var modules = {};

	// HeaderLinkHover
	var Header = function (el, options) {
			this.el = el;
			this.options = options;
			this.init();
	};

	Header.prototype = {
			init: function () {
					this.bind();
			},
			bind: function () {
					var _t = this;
					window.addEventListener("DOMContentLoaded", function() {
						_t.handler();
					})
					window.addEventListener("scroll", function() {
						_t.handler();
					})
			},
			handler: function () {
				var _t = this;
				if(window.scrollY > 100) {
					_t.el.classList.add("bg-white");
				} else {
					_t.el.classList.remove("bg-white");
				}
		},
	};

	modules.Header = Header;

	// HeaderLinkHover
	var FadeIn = function (el, options) {
			this.el = el;
			this.delay = el.dataset.delay ? el.dataset.delay: 0;
			this.speed = el.dataset.speed ?el.dataset.speed: 0.8;
			this.timing = el.dataset.timing ? Number(el.dataset.timing): 2/3;
			this.webgl = el.dataset.webgl ? true: false;
			this.animeStarted = false;
			this.init();
	};

	FadeIn.prototype = {
		init: function () {
				this.bind();
		},
		bind: function () {
			var _t = this;
			window.addEventListener('scroll', function () {
				_t.checkElmInWindow();
			});
			window.addEventListener('load', function () {
				
				_t.checkElmInWindow();
			});
			
		},
		checkElmInWindow() {
			var _t = this;
			var scroll = window.scrollY;
			var windowHeight = window.innerHeight;
			var targetPos = _t.el.getBoundingClientRect().top + scroll;
			if (scroll > targetPos - windowHeight * _t.timing & !_t.animeStarted) {
				_t.handler();
				_t.animeStarted = true;
			}
		},
		handler: function () {
			var _t = this;
			
			
			setTimeout(function() {
				_t.el.classList.add("fadeIn");
				_t.el.style.transition = `all ${_t.speed}s`;
			}, _t.delay * 1000);

			if(_t.webgl) {
				setTimeout(function() {
					artwork.addTitleParticles(_t.el.parentNode);
					_t.el.parentNode.style.overflow = "inherit";
				}, 1500);
			}
		},
	};

	modules.FadeIn = FadeIn;

		// HeaderLinkHover
		var FadeInMV = function (el, options) {
	};

	FadeInMV.prototype = {
		init: function () {
				this.bind();
		},
		bind: function () {
		}
	};

	modules.FadeInMV = FadeInMV;

	var FadeInKadai = function (el, options) {
	};

	FadeInKadai.prototype = {
		init: function () {
				this.bind();
		},
		bind: function () {
		}
	};

	modules.FadeInKadai = FadeInKadai;
	/*

Instance

------------------------------ */

	Array.prototype.forEach.call(
			document.querySelectorAll("[data-module]"),
			function (element) {
					var keys = element.getAttribute("data-module").split(/\s+/);
					var opts = element.getAttribute("data-options") || null;

					keys.forEach(function (key) {
							var options = opts
									? keys.length > 1
											? JSON.parse(opts)[key]
											: JSON.parse(opts)
									: {};
							if (key !== void 0) return new modules[key](element, options);
					});
			}
	);


});