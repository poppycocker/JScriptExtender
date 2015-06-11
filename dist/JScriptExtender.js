(function() {
"use strict";

// (FileSystemObjectなどの)コレクションオブジェクトをArrayに変換
Array.FromCollection = Array.FromCollection || function(collection) {
	var ar = [];
	var e = new Enumerator(collection);
	for (; !e.atEnd(); e.moveNext()) {
		ar.push(e.item());
	}
	return ar;
};

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
Array.prototype.filter = Array.prototype.filter || function(fun /*, thisp */ ) {
	"use strict";
	if (this == null) {
		throw new TypeError("Array.prototype.filter: this is null or not defined.");
	}

	var t = Object(this),
		len = t.length >>> 0;

	if (typeof fun != "function") {
		throw new TypeError("Array.prototype.filter: callback is not a function.");
	}

	var res = [],
		thisp = arguments[1];

	for (var i = 0; i < len; i++) {
		if (i in t) {
			var val = t[i]; // fun が this を変化させた場合に備えて
			if (fun.call(thisp, val, i, t)) res.push(val);
		}
	}

	return res;
};
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
Array.prototype.forEach = Array.prototype.forEach || function(callback, thisArg) {
	var T, k;
	if (this == null) {
		throw new TypeError("Array.prototype.forEach: this is null or not defined");
	}
	// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
	var O = Object(this);
	// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
	// 3. Let len be ToUint32(lenValue).
	var len = O.length >>> 0; // Hack to convert O.length to a UInt32
	// 4. If IsCallable(callback) is false, throw a TypeError exception.
	// See: http://es5.github.com/#x9.11
	if ({}.toString.call(callback) != "[object Function]") {
		throw new TypeError("Array.prototype.forEach: " + callback + " is not a function");
	}
	// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
	if (thisArg) {
		T = thisArg;
	}
	// 6. Let k be 0
	k = 0;
	// 7. Repeat, while k < len
	while (k < len) {
		var kValue;
		// a. Let Pk be ToString(k).
		//   This is implicit for LHS operands of the in operator
		// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
		//   This step can be combined with c
		// c. If kPresent is true, then
		if (k in O) {
			// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
			kValue = O[k];
			// ii. Call the Call internal method of callback with T as the this value and
			// argument list containing kValue, k, and O.
			callback.call(T, kValue, k, O);
		}
		// d. Increase k by 1.
		k++;
	}
	// 8. return undefined
};
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
Array.prototype.map = Array.prototype.map || function(callback, thisArg) {

	var T, A, k;

	if (this == null) {
		throw new TypeError("Array.prototype.map: this is null or not defined");
	}

	// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
	var O = Object(this);

	// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
	// 3. Let len be ToUint32(lenValue).
	var len = O.length >>> 0;

	// 4. If IsCallable(callback) is false, throw a TypeError exception.
	// See: http://es5.github.com/#x9.11
	if ({}.toString.call(callback) != "[object Function]") {
		throw new TypeError("Array.prototype.map: " + callback + " is not a function");
	}

	// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
	if (thisArg) {
		T = thisArg;
	}

	// 6. Let A be a new array created as if by the expression new Array(len) where Array is
	// the standard built-in constructor with that name and len is the value of len.
	A = new Array(len);

	// 7. Let k be 0
	k = 0;

	// 8. Repeat, while k < len
	while (k < len) {

		var kValue, mappedValue;

		// a. Let Pk be ToString(k).
		//   This is implicit for LHS operands of the in operator
		// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
		//   This step can be combined with c
		// c. If kPresent is true, then
		if (k in O) {

			// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
			kValue = O[k];

			// ii. Let mappedValue be the result of calling the Call internal method of callback
			// with T as the this value and argument list containing kValue, k, and O.
			mappedValue = callback.call(T, kValue, k, O);

			// iii. Call the DefineOwnProperty internal method of A with arguments
			// Pk, Property Descriptor {Value: mappedValue, Writable: true, Enumerable: true, Configurable: true},
			// and false.

			// In browsers that support Object.defineProperty, use the following:
			// Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

			// For best browser support, use the following:
			A[k] = mappedValue;
		}
		// d. Increase k by 1.
		k++;
	}
	// 9. return A
	return A;
};
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
Array.prototype.reduce = Array.prototype.reduce || function(accumulator) {
	if (this === null || this === undefined) {
		throw new TypeError("Array.prototype.reduce: Object is null or undefined");
	}
	var i = 0,
		l = this.length >> 0,
		curr;
	if (typeof accumulator !== "function") { // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
		throw new TypeError("Array.prototype.reduce: First argument is not callable");
	}

	if (arguments.length < 2) {
		if (l === 0) {
			throw new TypeError("Array.prototype.reduce: Array length is 0 and no second argument");
		}
		curr = this[0];
		i = 1; // start accumulating at the second element
	} else
		curr = arguments[1];

	while (i < l) {
		if (i in this) {
			curr = accumulator.call(undefined, curr, this[i], i, this);
		}
		++i;
	}

	return curr;
};
// 現在日時の取得
Date.prototype.getYMDhms = Date.prototype.getYMDhms || function() {
	function padZero(v /* 0-99 */ ) {
		return v > 9 ? v : '0' + v;
	}
	return '[Y]/[M]/[D] [h]:[m]:[s]'
		.replace('[Y]', this.getFullYear())
		.replace('[M]', padZero((this.getMonth() + 1)))
		.replace('[D]', padZero(this.getDate()))
		.replace('[h]', padZero(this.getHours()))
		.replace('[m]', padZero(this.getMinutes()))
		.replace('[s]', padZero(this.getSeconds()));
};
String.prototype.trim = String.prototype.trim || function() {
	return this.replace(/^\s+|\s+$/g, '');
};
// Use Leaflet.js's L.Class as a reference
// http://leafletjs.com/
this.Class = function() {};
this.Class.extend = function(props) {
	var NewClass, F, proto, i, parent;
	var extend = function(dst) { // (Object[, Object, ...]) ->
		var sources = Array.prototype.slice.call(arguments, 1),
			i, j, src;
		for (j = 0; j < sources.length; j++) {
			src = sources[j] || {};
			for (i in src) {
				if (src.hasOwnProperty(i)) {
					dst[i] = src[i];
				}
			}
		}
		return dst;
	};
	// extended class with the new prototype
	NewClass = function() {
		// call the constructor
		if (this.initialize) {
			this.initialize.apply(this, arguments);
		}
	};
	// instantiate class without calling constructor
	F = function() {};
	F.prototype = this.prototype;
	proto = new F();
	proto.constructor = NewClass;
	NewClass.prototype = proto;
	//inherit parent's statics
	for (i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype') {
			NewClass[i] = this[i];
		}
	}
	// mix static properties into the class
	if (props.statics) {
		extend(NewClass, props.statics);
		delete props.statics;
	}
	// mix given properties into the prototype
	extend(proto, props);
	parent = this;
	NewClass.__super__ = parent.prototype;
	return NewClass;
};
this.StreamReader = this.StreamReader || Class.extend({
	initialize: function(filename) {
		if (!filename) {
			throw new Error('StreamReader: filename is not defined.');
		}
		var fso = WScript.CreateObject('Scripting.FileSystemObject');
		try {
			this.sr = fso.OpenTextFile(filename, 1, false);
		} catch(e) {
			throw new Error('StreamReader: failed to open file.');
		}
	},
	Close: function() {
		this.sr.Close();
	},
	ReadLine: function() {
		if (this.sr.AtEndOfStream) return null;
		return this.sr.ReadLine();
	},
	ReadAll: function() {
		if (this.sr.AtEndOfStream) return '';
		return this.sr.ReadAll();
	}
});
this.StreamWriter = this.StreamWriter || Class.extend({
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
	Close: function() {
		this.sw.Close();
	},
	WriteLine: function(line) {
		this.sw.WriteLine(line);
	},
	Write: function(contents) {
		this.sw.Write(contents);
	}
});
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
this.StreamWriterU = this.StreamWriterU || Class.extend({
	initialize: function(filename, lineSeparator) {
		if (!filename) {
			throw new Error('StreamWriterU: filename is not defined.');
		}
		this.sw = new ActiveXObject("ADODB.Stream");
		this.sw.Type = StreamUOpts.adTypeText;
		this.sw.charset = "utf-8";
		this.sw.LineSeparator = lineSeparator || StreamUOpts.adCRLF;
		this.filename = filename;
		try {
			this.sw.Open();
			this.Save();
		} catch (e) {
			throw new Error('StreamWriterU: failed to open/create file.');
		}
	},
	Close: function() {
		// delete BOM
		this.sw.Position = 0;
		this.sw.Type = StreamUOpts.adTypeBinary;
		this.sw.Position = 3;
		var byteData = this.sw.Read();
		this.sw.Close();
		this.sw.Open();
		this.sw.Write(byteData);
		this.Save();
		this.sw.Close();
	},
	WriteLine: function(line) {
		this.sw.WriteText(line, StreamUOpts.adWriteLine);
	},
	Write: function(contents) {
		this.sw.WriteText(contents, StreamUOpts.adWriteChar);
	},
	Save: function() {
		this.sw.SaveToFile(this.filename, StreamUOpts.adSaveCreateOverWrite);
	}
});
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
}).call(this);