this.StreamUOpts = this.StreamUOpts || {
	// 保存データの種類
	// StreamTypeEnum
	// http://msdn.microsoft.com/ja-jp/library/cc389884.aspx
	adTypeBinary: 1, // バイナリ
	adTypeText: 2, // テキスト
	// 読み込み方法
	// StreamReadEnum
	// http://msdn.microsoft.com/ja-jp/library/cc389881.aspx
	adReadAll: -1, // 全行
	adReadLine: -2, // 一行ごと
	// 書き込み方法
	// StreamWriteEnum
	// http://msdn.microsoft.com/ja-jp/library/cc389886.aspx
	adWriteChar: 0, // 改行なし
	adWriteLine: 1, // 改行あり
	// ファイルの保存方法
	// SaveOptionsEnum
	// http://msdn.microsoft.com/ja-jp/library/cc389870.aspx
	adSaveCreateNotExist: 1, // ない場合は新規作成
	adSaveCreateOverWrite: 2, // ある場合は上書き
	// 改行コード指定
	// LineSeparatorsEnum
	// https://msdn.microsoft.com/ja-jp/library/cc389826.aspx
	adCR: 13,
	adCRLF: -1,
	adLF: 10
};
