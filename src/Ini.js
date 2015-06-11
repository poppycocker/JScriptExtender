// INIファイル
this.Ini = this.Ini || Class.extend({
	initialize: function(filename) {
		this.sr = new StreamReader(filename);
	},
	Load: function() {
		var data = {}, currentSection, lineCnt = 0, line, pair, key, val;

		function isBlankOrComment(line) {
			line = line.trim();
			return (line.length === 0 || line.substr(0, 2) === '//' || line.charAt(0) === '\'');
		}

		function isSectionDeclaration(line) {
			return !!line.trim().match(/^\[.+\]$/);
		}

		while ((line = this.sr.ReadLine()) !== null) {
			lineCnt++;
			if (isBlankOrComment(line)) {
				continue;
			}
			if (isSectionDeclaration(line)) {
				currentSection = data[line.trim().replace(/\[|\]/g, '')] = {};
			}
			pair = line.split('=').map(function(v) {
				return v.trim();
			});
			if (pair.length !== 2) {
				continue;
			}
			if (!currentSection) {
				throw new Error('Ini: declare section statement before key-value statements.');
			}
			key = pair[0];
			val = pair[1];
			if (val.match(/^(\-){0,1}\d+(\.\d+){0,1}$/g)) {
				val = +val;
			}
			if (currentSection[key]) {
				throw new Error('Ini: the key is already defined: ' + key + ' in line:' + lineCnt);
			}
			currentSection[key] = val;
		}
		this.sr.Close();
		return data;
	}
});