this.StreamReader = this.StreamReader || Class.extend({
	initialize: function(filename) {
		this.sr = null;
		if (filename) {
			return this.Open(filename);
		}
	},
	Open: function(filename) {
		var fso = WScript.CreateObject('Scripting.FileSystemObject');
		this.sr = fso.OpenTextFile(filename, 1, false);
		return !!this.sr;
	},
	Close: function() {
		this.sr.Close();
	},
	ReadLine: function() {
		if (this.sr.AtEndOfStream) return null;
		return this.sr.ReadLine();
	},
	ReadAll: function() {
		if (this.sr.AtEndOfStream) return '';
		return this.sr.ReadAll();
	}
});