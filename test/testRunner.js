(function() {
	var last = function() {
		return this[this.length - 1];
	};
	var states = [];
	states.last = last;

	var TestState = (function() {
		var C = function(description) {
			this.description = description || '(No Name)';
			this.cases = [];
			this.cases.last = last;
		};
		C.prototype = {
			it: function(description) {
				this.cases.push({
					description: description || '(No Name)',
					results: []
				});
			},
			addResult: function(func, result, actual, expected) {
				var c = this.cases.last();
				if (!c) {
					WScript.Echo('[ERROR] call "it" before assertion.');
					return;
				}
				c.results.push({
					func: func,
					result: result,
					actual: actual,
					expected: expected
				});
			},
			summary: function() {
				var c, r, i, j, idx;
				WScript.Echo('');
				WScript.Echo('# ' + this.description);
				for (i = 0; i < this.cases.length; i++) {
					c = this.cases[i];
					WScript.Echo('  * ' + c.description);
					for (j = 0; j < c.results.length; j++) {
						r = c.results[j];
						idx = '[[idx]/[cnt]]: '.replace('[idx]', j + 1).replace('[cnt]', c.results.length);
						if (r.result) {
							WScript.Echo('    [idx]OK.'.replace('[idx]', idx));
						} else {
							WScript.Echo('    [idx]FAILED on [func]'.replace('[idx]', idx).replace('[func]', r.func));
							WScript.Echo('      actual  : ' + r.actual);
							WScript.Echo('      expected: ' + r.expected);
						}
					}
				}
			}
		};
		return C;
	})();

	function convertToComparable(v) {
		if (typeof v === 'function') {
			return v;
		}
		return JSON.stringify(v);
	}

	function checkState(state) {
		if (!state) {
			WScript.Echo('[ERROR] call "describe" and "it" before assertion.');
		}
		return !!state;
	}

	this.TR = {
		describe: function(description, f) {
			states.push(new TestState(description));
			f();
			states.last().summary();
			states.pop();
		},
		it: function(description, f) {
			var state = states.last();
			if (!state) {
				WScript.Echo('[ERROR] call "describe" before "it".');
				return;
			}
			state.it(description);
			f();
		},
		assertEqual: function(actual, expected) {
			var a = convertToComparable(actual),
				e = convertToComparable(expected),
				state = states.last();
			if (checkState(state)) {
				state.addResult('AssertEqual', a === e, a, e);
			}
		},
		assertNotEqual: function(actual, expected) {
			var a = convertToComparable(actual),
				e = convertToComparable(expected),
				state = states.last();
			if (checkState(state)) {
				state.addResult('AssertNotEqual', a !== e, a, e);
			}
		},
		assertUndefined: function(actual) {
			var state = states.last();
			if (checkState(state)) {
				state.addResult('AssertUndefined', actual === undefined, actual, 'undefined');
			}
		},
		assertNotUndefined: function(actual) {
			var state = states.last();
			if (checkState(state)) {
				state.addResult('AssertNotUndefined', actual !== undefined, actual, 'undefined');
			}
		},
		succeed: function() {
			var state = states.last();
			if (checkState(state)) {
				state.addResult('', true, 0, 0);
			}
		}
	};

}).call(this);