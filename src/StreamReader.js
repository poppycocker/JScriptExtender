this.StreamReader = this.StreamReader || Class.extend( /** @lends StreamReader# */ {
	/**
	 * @class Stream reader for a text file.
	 * @param {String} filename name of the text file to open.
	 * @augments Class
	 * @constructs
	 * @throws {Error} when the filename is falsy value or when failed to open file.
	 */
	initialize: function(filename) {
		if (!filename) {
			throw new Error('StreamReader: filename is not defined.');
		}
		var fso = WScript.CreateObject('Scripting.FileSystemObject');
		try {
			this.sr = fso.OpenTextFile(filename, 1, false);
		} catch (e) {
			throw new Error('StreamReader: failed to open file.');
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
		if (this.sr.AtEndOfStream) return null;
		return this.sr.ReadLine();
	},
	/**
	 * Read all lines from text file.
	 * @returns {String} all text of a file.
	 */
	ReadAll: function() {
		if (this.sr.AtEndOfStream) return '';
		return this.sr.ReadAll();
	}
});