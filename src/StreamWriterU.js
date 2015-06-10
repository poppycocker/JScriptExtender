this.StreamWriterU = this.StreamWriterU || Class.extend({
	initialize: function(filename) {
		this.sw = new ActiveXObject("ADODB.Stream");
		this.sw.Type = StreamUOpts.adTypeText;
		this.sw.charset = "utf-8";
		if (filename) {
			this.OpenNew(filename);
		}
	},
	OpenNew: function(filename) {
		this.filename = filename;
		this.sw.Open();
		return true;
	},
	Close: function() {
		// delete BOM
		this.sw.Position = 0;
		this.sw.Type = StreamUOpts.adTypeBinary;
		this.sw.Position = 3;
		var byteData = this.sw.Read();
		this.sw.Close();
		this.sw.Open();
		this.sw.Write(byteData);

		this.sw.SaveToFile(
			this.filename, StreamUOpts.adSaveCreateOverWrite
		);
		this.sw.Close();
	},
	WriteLine: function(line) {
		this.sw.WriteText(line, StreamUOpts.adWriteLine);
	},
	Write: function(contents) {
		this.sw.WriteText(contents, StreamUOpts.adWriteChar);
	}
});
