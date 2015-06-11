this.StreamWriterU = this.StreamWriterU || Class.extend({
	initialize: function(filename, lineSeparator) {
		if (!filename) {
			throw new Error('StreamWriterU: filename is not defined.');
		}
		this.sw = new ActiveXObject("ADODB.Stream");
		this.sw.Type = StreamUOpts.adTypeText;
		this.sw.charset = "utf-8";
		this.sw.LineSeparator = lineSeparator || StreamUOpts.adCRLF;
		this.filename = filename;
		try {
			this.sw.Open();
			this.Save();
		} catch (e) {
			throw new Error('StreamWriterU: failed to open/create file.');
		}
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
		this.Save();
		this.sw.Close();
	},
	WriteLine: function(line) {
		this.sw.WriteText(line, StreamUOpts.adWriteLine);
	},
	Write: function(contents) {
		this.sw.WriteText(contents, StreamUOpts.adWriteChar);
	},
	Save: function() {
		this.sw.SaveToFile(this.filename, StreamUOpts.adSaveCreateOverWrite);
	}
});