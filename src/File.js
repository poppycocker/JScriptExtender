// Fileクラス
this.File = this.File || Class.extend({
	ReadAllText: function(filename, unicode) {
		var text = '';
		var sr = !!unicode ? new StreamReaderU() : new StreamReader();
		if (sr.Open(filename)) {
			text = sr.ReadAll();
			sr.Close();
		}
		return text;
	},
	ReadAllAsArray: function(filename, unicode) {
		var result = [];
		var sr = !!unicode ? new StreamReaderU() : new StreamReader();
		if (sr.Open(filename)) {
			var line;
			while ((line = sr.ReadLine()) !== null) {
				result.push(line);
			}
			sr.Close();
		}
		return result;
	},
	WriteAllText: function(filename, contents, unicode) {
		var sw = !!unicode ? new StreamWriterU() : new StreamWriter();
		if (sw.OpenNew(filename)) {
			sw.Write(contents);
			sw.Close();
		}
	},
	Delete: function(filename) {
		var fso = WScript.CreateObject('Scripting.FileSystemObject');
		fso.DeleteFile(filename);
	}
});