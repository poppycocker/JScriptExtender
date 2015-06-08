// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
(function() {
	if (Array.prototype.reduce) {
		return;
	}
	Array.prototype.reduce = function reduce(accumulator) {
		if (this === null || this === undefined) throw new TypeError("Object is null or undefined");
		var i = 0,
			l = this.length >> 0,
			curr;
		if (typeof accumulator !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
			throw new TypeError("First argument is not callable");

		if (arguments.length < 2) {
			if (l === 0) throw new TypeError("Array length is 0 and no second argument");
			curr = this[0];
			i = 1; // start accumulating at the second element
		} else
			curr = arguments[1];

		while (i < l) {
			if (i in this) curr = accumulator.call(undefined, curr, this[i], i, this);
			++i;
		}

		return curr;
	};
}).call(this);