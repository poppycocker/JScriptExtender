// (FileSystemObjectなどの)コレクションオブジェクトをArrayに変換
(function() {
	if (Array.FromCollection) {
		return;
	}
	Array.FromCollection = function(collection) {
		var ar = [];
		var e = new Enumerator(collection);
		for (; !e.atEnd(); e.moveNext()) {
			ar.push(e.item());
		}
		return ar;
	};
}).call(this);