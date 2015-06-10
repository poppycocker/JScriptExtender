// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
Array.prototype.filter = Array.prototype.filter || function(fun /*, thisp */ ) {
	"use strict";
	if (this == null) throw new TypeError();

	var t = Object(this),
		len = t.length >>> 0;

	if (typeof fun != "function") throw new TypeError();

	var res = [],
	thisp = arguments[1];

	for (var i = 0; i < len; i++) {
		if (i in t) {
			var val = t[i]; // fun が this を変化させた場合に備えて
			if (fun.call(thisp, val, i, t)) res.push(val);
		}
	}

	return res;
};
