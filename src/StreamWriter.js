this.StreamWriter = this.StreamWriter || Class.extend({
	initialize: function(filename) {
		if (!filename) {
			throw new Error('StreamWriter: filename is not defined.');
		}
		var fso = WScript.CreateObject('Scripting.FileSystemObject');
		try {
			this.sw = fso.CreateTextFile(filename, true);
		} catch (e) {
			throw new Error('StreamWriter: failed to open/create file.');
		}
	},
	Close: function() {
		this.sw.Close();
	},
	WriteLine: function(line) {
		this.sw.WriteLine(line);
	},
	Write: function(contents) {
		this.sw.Write(contents);
	}
});