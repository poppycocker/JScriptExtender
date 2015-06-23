JScriptExtender
===========

Use Array#filter, map, reduce, String#trim, JSON.parse/stringify  
...and more lovely functions on legacy JScript!

## Overview

JScriptExtender is an extension library for Microsoft JScript.  
This library provides following functions to lagacy JScript(e.g. v5.8 on Windows7).  
* ES5 methods (from es5-shim https://github.com/es-shims/es5-shim)
* JSON support (from JSON3 https://github.com/bestiejs/json3)
* and some additional functions
  * Class pattern framework (using Leaflet.js's L.Class as a reference)
  * Parser for command line arguments
  * Helpers for reading/writing file stream
  * Ini file reader

## Usage
Include `dist/JScriptExtender.js` in your .wsh script.
```JavaScript
<job>
<!-- include at here -->
<script language="JavaScript" src="dist/JScriptExtender.js"></script>
<script language="JavaScript">

function test() {
  // Get arguments from command line
  // e.g. if you call script with args "arg0 arg1 /arg2:123"
  var args = Arguments.Get(); // => {'0': 'arg0', '1': 'arg1', 'arg2': '123'}

  // Array's cool methods
  var num = [1, 2, 3, 4, 5].filter(function(v){
    return (v % 2 === 0);
  }).map(function(v) {
    return v * v;
  }).reduce(function(prev, current, i , ar) {
    return prev + current;
  });
  WScript.Echo(num); // => 20

  // Generate JSON string
  var str = JSON.stringify({'Hello': 123});
  WScript.Echo(str); // => '{"Hello":123}'

  // Load ini file into object(hash)
  var iniReader = new Ini('hoge.ini');
  var iniObj = iniReader.Load();
}
WScript.Quit(test());

</script>
</job>
```

## API Document

See the url below.  
(Only for additional functions, except es5-shim and JSON3)  
http://poppycocker.github.io/JScriptExtender/doc/index.html
