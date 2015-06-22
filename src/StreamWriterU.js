this.StreamWriterU = this.StreamWriterU || Class.extend( /** @lends StreamWriterU# */ {
	/**
	 * @class Stream writer for a utf-8 text file.
	 * @param {String} filename name of the text file to open/create.
	 * @param {Number} specifier of line separator. See {@link StreamUOpts}
	 * @augments Class
	 * @constructs
	 * @throws {Error} when the filename is falsy value or when failed to open file.
	 */
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
	/**
	 * Close current text stream.
	 */
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
	/**
	 * Write 1 line to tail of the stream.
	 * @param {String} text to write.
	 */
	WriteLine: function(line) {
		this.sw.WriteText(line, StreamUOpts.adWriteLine);
	},
	/**
	 * Write text to tail of the stream.
	 * @param {String} text to write.
	 */
	Write: function(contents) {
		this.sw.WriteText(contents, StreamUOpts.adWriteChar);
	},
	/**
	 * Save current stream to the file.
	 */
	Save: function() {
		this.sw.SaveToFile(this.filename, StreamUOpts.adSaveCreateOverWrite);
	}
});