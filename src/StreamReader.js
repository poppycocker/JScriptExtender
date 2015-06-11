this.StreamReader = this.StreamReader || Class.extend({
	initialize: function(filename) {
		if (!filename) {
			throw new Error('StreamReader: filename is not defined.');
		}
		var fso = WScript.CreateObject('Scripting.FileSystemObject');
		try {
			this.sr = fso.OpenTextFile(filename, 1, false);
		} catch(e) {
			throw new Error('StreamReader: failed to open file.');
		}
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