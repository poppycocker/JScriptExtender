this.Arguments = this.Arguments || {
	Get: function() {
		function convertToArray(collection) {
			var e = new Enumerator(collection),
				ar = [];
			for (; !e.atEnd(); e.moveNext()) {
				ar.push(e.item());
			}
			return ar;
		}
		var unnamed = convertToArray(WScript.Arguments.UnNamed);
		var named = convertToArray(WScript.Arguments.Named);
		var args = [],
			i;
		for (i = 0; i < unnamed.length; i++) {
			args[i] = unnamed[i];
		}
		for (i = 0; i < named.length; i++) {
			args[named[i]] = WScript.Arguments.Named.Item(named[i]);
		}
		return args;
	}
};