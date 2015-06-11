this.StreamReaderU = this.StreamReaderU || Class.extend({
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
	Close: function() {
		this.sr.Close();
	},
	ReadLine: function() {
		if (this.sr.EOS) return null;
		return this.sr.ReadText(StreamUOpts.adReadLine);
	},
	ReadAll: function() {
		if (this.sr.EOS) return null;
		return this.sr.ReadText(StreamUOpts.adReadAll);
	}
});