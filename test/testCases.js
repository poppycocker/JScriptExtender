// var objFso = WScript.CreateObject('Scripting.FileSystemObject');
// var objApl = WScript.CreateObject("Shell.Application");

(function() {

	this.Tests = {};
	this.Tests.run = function() {

		WScript.Echo((function() {
			var s;
			s = ""; // 文字列を連結します。
			s += ScriptEngine() + " Version ";
			s += ScriptEngineMajorVersion() + ".";
			s += ScriptEngineMinorVersion() + ".";
			s += ScriptEngineBuildVersion();
			return (s);
		})());
		var fso = WScript.CreateObject('Scripting.FileSystemObject');

		TR.describe('Class', function() {
			TR.it('check existence', function() {
				TR.assertNotUndefined(Class);
				TR.assertNotUndefined(Class.extend);
			});
			var ar = [1, 2, 3, 4, 5];
			var Cls1 = Class.extend({
				initialize: function(num) {
					this.num = num;
				},
				getNum: function() {
					return this.num;
				},
				statics: {
					constant: ar
				}
			});
			var Cls2 = Cls1.extend({
				initialize: function(num, txt) {
					this.num = num;
					this.txt = txt;
				},
				getTxt: function() {
					return this.txt;
				}
			});
			TR.it('check behaviors: construction', function() {
				TR.assertNotUndefined(Cls1.extend);
				TR.assertNotUndefined(Cls1.constant);
				TR.assertEqual(Cls1.constant, ar);
				var c1 = new Cls1(100);
				TR.assertNotUndefined(c1.initialize);
				TR.assertNotUndefined(c1.getNum);
				TR.assertEqual(c1.getNum(), 100);
			});
			TR.it('check behaviors: inheritance', function() {
				TR.assertNotUndefined(Cls2.constant);
				TR.assertEqual(Cls2.constant, ar);
				var c2 = new Cls2(100, 'abc');
				TR.assertNotUndefined(c2.initialize);
				TR.assertNotUndefined(c2.getNum);
				TR.assertNotUndefined(c2.getTxt);
				TR.assertEqual(c2.getNum(), 100);
				TR.assertEqual(c2.getTxt(), 'abc');
			});
		});

		TR.describe('Errors', function() {
			TR.it('check existence', function() {
				TR.assertNotUndefined(Error);
				TR.assertNotUndefined(TypeError);
				TR.assertNotUndefined(SyntaxError);
				TR.assertNotUndefined(URIError);
			});
			TR.it('check behaviors', function() {
				var msg = 'throw new Error';
				try {
					throw new Error(msg);
				} catch (e) {
					TR.assertEqual(e.message, msg);
				}
			});
		});

		TR.describe('StreamReader', function() {
			TR.it('check existence', function() {
				TR.assertNotUndefined(StreamReader);
			});
			TR.it('check behaviors: errors', function() {
				var sr;
				try {
					sr = new StreamReader();
				} catch (e) {
					TR.assertEqual(e.message, 'StreamReader: filename is not defined.');
				}
				try {
					sr = new StreamReader('notexists.txt');
				} catch (e) {
					TR.assertEqual(e.message, 'StreamReader: failed to open file.');
				}
			});
			TR.it('check behaviors: reading', function() {
				var sr = new StreamReader('testdata\\test.txt');
				var line = sr.ReadLine();
				TR.assertEqual(line, '123');
				sr.Close();
				sr = new StreamReader('testdata\\test.txt');
				var all = sr.ReadAll();
				TR.assertEqual(all, '123\r\nabc\r\n\r\ndef');
				sr.Close();
			});
		});

		TR.describe('StreamReaderU', function() {
			TR.it('check existence', function() {
				TR.assertNotUndefined(StreamReaderU);
			});
			TR.it('check behaviors: errors', function() {
				var sr;
				try {
					sr = new StreamReaderU();
				} catch (e) {
					TR.assertEqual(e.message, 'StreamReaderU: filename is not defined.');
				}
				try {
					sr = new StreamReaderU('notexists.txt');
				} catch (e) {
					TR.assertEqual(e.message, 'StreamReaderU: failed to open file.');
				}
			});
			TR.it('check behaviors: reading', function() {
				var sr = new StreamReaderU('testdata\\test_u_lf.txt', StreamUOpts.adLF);
				var line = sr.ReadLine();
				TR.assertEqual(line, '\u3042\u3044\u3046');
				sr.Close();
				sr = new StreamReaderU('testdata\\test_u_lf.txt', StreamUOpts.adLF);
				var all = sr.ReadAll();
				TR.assertEqual(all, '\u3042\u3044\u3046\nabc\n\n');
				sr.Close();
			});
		});

		TR.describe('StreamWriter', function() {
			TR.it('check existence', function() {
				TR.assertNotUndefined(StreamWriter);
			});
			TR.it('check behaviors: errors', function() {
				var sr;
				try {
					sr = new StreamWriter();
				} catch (e) {
					TR.assertEqual(e.message, 'StreamWriter: filename is not defined.');
				}
				try {
					sr = new StreamWriter('??.txt');
				} catch (e) {
					TR.assertEqual(e.message, 'StreamWriter: failed to open/create file.');
				}
			});
			TR.it('check behaviors: write lines', function() {
				var filename = 'testdata\\test_write.txt';
				var sw = new StreamWriter(filename);
				sw.WriteLine('abcde');
				sw.Close();
				var sr = new StreamReader(filename);
				TR.assertEqual(sr.ReadLine(), 'abcde');
				sr.Close();
				fso.DeleteFile(filename);
			});
			TR.it('check behaviors: write contents', function() {
				var filename = 'testdata\\test_write.txt';
				var sw = new StreamWriter(filename);
				sw.Write('abcde\r\n12345\r\n');
				sw.Close();
				var sr = new StreamReader(filename);
				TR.assertEqual(sr.ReadLine(), 'abcde');
				TR.assertEqual(sr.ReadLine(), '12345');
				TR.assertEqual(sr.ReadLine(), null);
				sr.Close();
				fso.DeleteFile(filename);
			});
		});

		TR.describe('StreamWriterU', function() {
			TR.it('check existence', function() {
				TR.assertNotUndefined(StreamWriterU);
			});
			TR.it('check behaviors: errors', function() {
				var sr;
				try {
					sr = new StreamWriterU();
				} catch (e) {
					TR.assertEqual(e.message, 'StreamWriterU: filename is not defined.');
				}
				try {
					sr = new StreamWriterU('??.txt');
				} catch (e) {
					TR.assertEqual(e.message, 'StreamWriterU: failed to open/create file.');
				}
			});
			TR.it('check behaviors: write lines', function() {
				var filename = 'testdata\\test_write_u.txt';
				var sw = new StreamWriterU(filename);
				sw.WriteLine('\u3042\u3044\u3046');
				sw.Close();
				var sr = new StreamReaderU(filename, StreamUOpts.adCRLF);
				TR.assertEqual(sr.ReadLine(), '\u3042\u3044\u3046');
				sr.Close();
				fso.DeleteFile(filename);
			});
			TR.it('check behaviors: write contents', function() {
				var filename = 'testdata\\test_write.txt';
				var sw = new StreamWriterU(filename);
				sw.Write('\u3042\u3044\u3046\n12345\n');
				sw.Close();
				var sr = new StreamReaderU(filename, StreamUOpts.adLF);
				TR.assertEqual(sr.ReadLine(), '\u3042\u3044\u3046');
				TR.assertEqual(sr.ReadLine(), '12345');
				TR.assertEqual(sr.ReadLine(), null);
				sr.Close();
				fso.DeleteFile(filename);
			});
		});

		TR.describe('Ini', function() {
			TR.it('check existence', function() {
				TR.assertNotUndefined(Ini);
			});
			TR.it('check behaviors: valid ini', function() {
				var ini = new Ini('testdata\\valid.ini');
				var props = ini.Load();
				TR.assertNotUndefined(props.section1);
				TR.assertNotUndefined(props.section2);
				TR.assertNotUndefined(props.section3);
				TR.assertEqual(props.section1.aaa, 123);
				TR.assertEqual(props.section1.bbb, -1.23);
				TR.assertEqual(props.section1.ccc, 'abc');
				TR.assertUndefined(props.section1.ddd);
				TR.assertUndefined(props.section1.eee);
				TR.assertEqual(props.section3.fff, '456_');
			});
			TR.it('check behaviors: invalid ini 1', function() {
				var ini = new Ini('testdata\\invalid01.ini');
				var props;
				try {
					props = ini.Load();
				} catch (e) {
					TR.assertEqual(e.message, 'Ini: declare section statement before key-value statements.');
				}
				TR.assertUndefined(props);
			});
			TR.it('check behaviors: invalid ini 2', function() {
				var ini = new Ini('testdata\\invalid02.ini');
				var props;
				try {
					props = ini.Load();
				} catch (e) {
					TR.assertEqual(e.message, 'Ini: the key is already defined: aaa in line:3');
				}
				TR.assertUndefined(props);
			});
		});
	};


}).call(this);