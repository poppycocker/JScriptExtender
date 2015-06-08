(function() {
	if (this.StreamWriter) {
		return;
	}
	this.StreamWriter = Class.extend({
		initialize: function(filename) {
			this.sw = null;
			if (filename) {
				return this.OpenNew(filename);
			}
		},
		OpenNew: function(filename) {
			var fso = WScript.CreateObject('Scripting.FileSystemObject');
			this.sw = fso.CreateTextFile(filename, true);
			return !!this.sw;
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
}).call(this);