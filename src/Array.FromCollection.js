// (FileSystemObjectなどの)コレクションオブジェクトをArrayに変換
Array.FromCollection = Array.FromCollection || function(collection) {
	var ar = [];
	var e = new Enumerator(collection);
	for (; !e.atEnd(); e.moveNext()) {
		ar.push(e.item());
	}
	return ar;
};
