$(function() {
	'use strict';

	$("[data-run=playground]").each(function() {
		var code = this;
		$(code).attr("contenteditable", "true");
		$(code).attr("spellcheck", "false");
		var cont = $(code).parent();
		$(cont).addClass("play");
		var run = $('<button class="run">Run</button>');
		$(cont).append(run);
		var output = $('<pre class="output"></pre>');
		output.hide();
		$(output).insertAfter(cont);
		var transport = new HTTPTransport();
		function onRun() {
			$(output).text("");
			$(output).show();
			var program = $(code).text();
			program = program.replace('\xA0', ' '); // replace non-breaking spaces
			transport.Run(program, PlaygroundOutput(output.get(0)), null);
		}
		run.click(onRun);
	})
	$("[data-run=wasm]").each(function() {
		var pkg = $(this).data("pkg")
		var size = $(this).data("size");
		var width = "";
		var height = "";
		if (size !== undefined) {
			var spl = size.split("x");
			width = spl[0];
			if (spl.length == 2) {
				height = spl[1];
			}
		}
		var cont = $(this);
		var replace = true;
		// The markdown formatter puts the args on the inner <code>
		// element for {{/path/code.go}} tags.
		if ($(cont).prop("tagName") == "CODE") {
			// For code snippets the wasm program should display after
			// the snippet.
			replace = false;
			cont = $(cont).parent();
		}
		$(cont).addClass("play");
		var run = $('<button class="run">Run</button>');
		$(cont).append(run);
		var win = $('<div class="window"><iframe width="'+width+'" height="'+height+'" src="/files/wasm/'+pkg+'"></iframe></div>');
		function onRun() {
			if (replace) {
				$(cont).empty();
				$(cont).append(win);
			} else {
				var p = $('<p></p>');
				$(p).append(win);
				$(p).insertAfter(cont);
			}
		}
		run.click(onRun);
	})
})

