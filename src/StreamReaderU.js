this.StreamReaderU = this.StreamReaderU || Class.extend( /** @lends StreamReaderU# */ {
	/**
	 * @class Stream reader for a utf-8 text file.
	 * @param {String} filename name of the text file to open.
	 * @param {Number} specifier of line separator. See {@link StreamUOpts}
	 * @augments Class
	 * @constructs
	 * @throws {Error} when the filename is falsy value or when failed to open file.
	 */
	initialize: function(filename, lineSeparator) {
		if (!filename) {
			throw new Error('StreamReaderU: filename is not defined.');
		}
		this.sr = new ActiveXObject("ADODB.Stream");
		this.sr.Type = StreamUOpts.adTypeText;
		this.sr.charset = "utf-8";
		this.sr.LineSeparator = lineSeparator || StreamUOpts.adCRLF;
		try {
			this.sr.Open();
			this.sr.LoadFromFile(filename);
		} catch (e) {
			throw new Error('StreamReaderU: failed to open file.');
		}
	},
	/**
	 * Close current text stream.
	 */
	Close: function() {
		this.sr.Close();
	},
	/**
	 * Read 1 line from text file and forward cursor.
	 * @returns {String} text of a line.
	 */
	ReadLine: function() {
		if (this.sr.EOS) return null;
		return this.sr.ReadText(StreamUOpts.adReadLine);
	},
	/**
	 * Read all lines from text file.
	 * @returns {String} all text of a file.
	 */
	ReadAll: function() {
		if (this.sr.EOS) return null;
		return this.sr.ReadText(StreamUOpts.adReadAll);
	}
});