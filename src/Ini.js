// INIファイル
this.Ini = this.Ini || Class.extend({
	initialize: function(filename) {
		this.sr = new StreamReader(filename);
	},
	Load: function() {
		var data = [], line, pos, key, val;
		while ((line = this.sr.ReadLine()) !== null) {
			if (line.length === 0 || line.substr(0, 2) === '//' || line.charAt(0) === '\'') {
				continue; // 空白行,コメントは読み飛ばし
			}
			pos = line.indexOf('=');
			if (pos === -1) {
				continue;
			}
			key = line.substr(0, pos).trim();
			val = line.substr(pos + 1).trim();
			if (val.match(/^(\-){0,1}\d+(\.\d+){0,1}$/g)) {
				val = +val;
			}
			data[key] = val;
		}
		this.sr.Close();
		return data;
	}
});