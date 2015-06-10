// var objFso = WScript.CreateObject('Scripting.FileSystemObject');
// var objApl = WScript.CreateObject("Shell.Application");

(function() {

	this.Tests = {};
	this.Tests.run = function() {

		TR.describe('Array.prototype.forEach', function() {
			TR.it('check function existence', function() {
				var ar = [1, 2, 3];
				TR.assertNotEqual(ar.forEach, undefined);
				// TR.assertEqual(ar.forEach, undefined);
			});
			TR.it('check function behavior', function() {
				var src = [1, 2, 3], dst = [];
				src.forEach(function(v) {
					dst.push(v);
				});
				TR.assertEqual(src, dst);
			});
		});
	};

}).call(this);