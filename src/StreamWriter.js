this.StreamWriter = this.StreamWriter || Class.extend( /** @lends StreamWriter# */ {
	/**
	 * @class Stream writer for a text file.
	 * @param {String} filename name of the text file to open/create.
	 * @augments Class
	 * @constructs
	 * @throws {Error} when the filename is falsy value or when failed to open file.
	 */
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
	/**
	 * Close current text stream.
	 */
	Close: function() {
		this.sw.Close();
	},
	/**
	 * Write 1 line to tail of the file.
	 * @param {String} text to write.
	 */
	WriteLine: function(line) {
		this.sw.WriteLine(line);
	},
	/**
	 * Write text to tail of the file.
	 * @param {String} text to write.
	 */
	Write: function(contents) {
		this.sw.Write(contents);
	}
});