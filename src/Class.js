// Use Leaflet.js's L.Class as a reference
// http://leafletjs.com/

/** @namespace */
this.Class = function() {};
/**
 * Using Leaflet.js's L.Class as a reference. {@link http://leafletjs.com/}
 * @param {Object} props Generate an extended class from given props.
 * @returns {Function} The constructor of extended class.
 * @example
 *  var Extended = Class.extend({
 *    // 'initialize' works as a constructor.
 *    initialize: function(arg) {
 *      this.arg = arg;
 *    },
 *    // props in 'statics' are set as static(class) members.
 *    statics: {
 *      staticFunc: function() {
 *        return 'static method!';
 *      },
 *      staticProp: 'static prop!'
 *    },
 *    // this is a instance method.
 *    func: function() {
 *      return 'instance method! ' + arg;
 *    }
 * });
 *
 * // calling static(class) members.
 * Extended.staticFunc(); // => 'static method!'
 * Extended.staticProp;   // => 'static prop!'
 * // constructs with arguments (method 'initialize' will be called).
 * var ex = new Extended('foo bar');
 * // calling instance member
 *  ex.func();   // => 'instance method! foo bar'
 */
this.Class.extend = function(props) {
	var NewClass, F, proto, i, parent;
	var extend = function(dst) { // (Object[, Object, ...]) ->
		var sources = Array.prototype.slice.call(arguments, 1),
			i, j, src;
		for (j = 0; j < sources.length; j++) {
			src = sources[j] || {};
			for (i in src) {
				if (src.hasOwnProperty(i)) {
					dst[i] = src[i];
				}
			}
		}
		return dst;
	};
	// extended class with the new prototype
	NewClass = function() {
		// call the constructor
		if (this.initialize) {
			this.initialize.apply(this, arguments);
		}
	};
	// instantiate class without calling constructor
	F = function() {};
	F.prototype = this.prototype;
	proto = new F();
	proto.constructor = NewClass;
	NewClass.prototype = proto;
	//inherit parent's statics
	for (i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype') {
			NewClass[i] = this[i];
		}
	}
	// mix static properties into the class
	if (props.statics) {
		extend(NewClass, props.statics);
		delete props.statics;
	}
	// mix given properties into the prototype
	extend(proto, props);
	parent = this;
	NewClass.__super__ = parent.prototype;
	return NewClass;
};