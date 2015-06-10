// Use Leaflet.js's L.Class as a reference
// http://leafletjs.com/
this.Class = function() {};
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