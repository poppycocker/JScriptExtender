// INIファイル
this.Ini = this.Ini || Class.extend({
	initialize: function() {

	},
	LoadFrom: function(filename) {
		var sr = new StreamReader(),
			data, line, pos, key, val;
		if (!sr.Open(filename)) {
			return null;
		}
		data = [];
		line = null;
		while ((line = sr.ReadLine()) !== null) {
			if (line.length === 0 || line.substr(0, 2) === '//') {
				continue; // 空白行,コメントは読み飛ばし
			}
			pos = line.indexOf('=');
			if (pos === -1) {
				continue;
			}
			key = line.substr(0, pos).trim();
			val = line.substr(pos + 1).trim();
			data[key] = val;
		}
		sr.Close();
		return data;
	}
});