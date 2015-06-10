this.StreamReaderU = this.StreamReaderU || Class.extend({
	initialize: function(filename) {
		this.sr = new ActiveXObject("ADODB.Stream");
		this.sr.Type = StreamUOpts.adTypeText;
		this.sr.charset = "utf-8";
		if (filename) {
			this.OpenNew(filename);
		}
	},
	Open: function(filename) {
		this.sr.Open();
		this.sr.LoadFromFile(filename);
		return true;
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