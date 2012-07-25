/**
 * jquery.fadeLabel.js
 * Author: Vuong Nguyen (vuongnguyen.com)
 * 
 * jQuery plugin to fade in/out label of text input/textarea on focus/blur/keyup events.
 * UX enhancement for labels acting as initial value via CSS position:absolute
 * Requirements: input/textarea must have an 'id' and label must have 'for' attribute
 */
(function ($) {
	var methods = {
		getLabel : function (item) {
			return $('label[for="' + item.attr('id') + '"]');
		},
		labelFadeOut : function (label, settings) {
			if (!label.hasClass(settings.fadedClass)) {
				label.stop(true, true).animate({'opacity': settings.fadeOut}, settings.fadeOutTime, function () {
					label.addClass(settings.fadedClass).trigger(settings.fadeInEvent);
				});
			}
		},
		labelFadeIn : function (item, label, settings) {
			if (!item.attr('value') && label.hasClass(settings.fadedClass)) {
				if (label.is(':hidden')) {
					label.css({'opacity': 0, 'display':block});
				}
				label.stop(true, true).animate({'opacity': settings.fadeIn}, settings.fadeInTime, function () {
					label.removeClass(settings.fadedClass).trigger(settings.fadeOutEvent);
				});
			}
		},
		labelShowHide : function (item, label) {
			item.attr('value') ? label.hide() : label.show();
		},
		init : function (options) {
			var settings = $.extend({
				fadeOut : 0.3,
				fadeOutEvent : 'flfadeout',
				fadeIn : 1.0,
				fadeInEvent : 'flfadein',
				fadeOutTime : 288,
				fadeInTime : 688,
				fadedClass : 'label_faded',
				initClass : 'fl-init',
				initEvent : 'flinit'
			}, options);
			return this.each(function () {
				var _self = $(this);
				if (!_self.hasClass(settings.initClass)) {
					var label = methods.getLabel(_self);
					if (label.length) {
						methods.labelShowHide(_self, label);
						_self.focus(function () {
							methods.labelShowHide(_self, label);
							methods.labelFadeOut(label, settings);
						}).blur(function () {
							methods.labelShowHide(_self, label);
							methods.labelFadeIn(_self, label, settings);
						}).keyup(function () {
							methods.labelShowHide(_self, label);
						}).addClass(settings.initClass)
						.data('fl.settings', settings)
						.trigger(settings.initEvent);
					}
				}
			});
		}
	};
	$.fn.fadeLabel = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			alert('Method ' + method + ' does not exist on jQuery.fadeLabel');
		} 
	};	
})(jQuery);