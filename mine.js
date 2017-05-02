var $container = $('.container');
var $backdrop = $('.backdrop');
var $highlights = $('.highlights');
var $textarea = $('textarea');
var $toggle = $('button');
var $words = Object.keys(data);
var $letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
var $corrector = new SpellCorrector($letters,data);

$(".head").empty();

function applyHighlights(text) {
    text = text
        .replace(/\n$/g, '\n\n');
    
    var $textarr = text.trim().split(/[ ]/);
    
    $(".head").empty();
  
    $.each($textarr, function (i, val) {
    	var $val = val.replace(/[\.\,;\:]/, "");
    	var $seen = {};
    	if($val.startsWith("'")){
    	var $pattern = new RegExp("'" + $val.replace(/'/g,"") + "'", "g" );
    	}
    	else if($val.startsWith('"')){
    	var $pattern = new RegExp('"' + $val.replace(/"/g,"") + '"', "g" );
    	}
    	else
    	{
    	var $pattern = new RegExp("\\b" + $val + "\\b" , "g");
    	}

        if ($.inArray($val.toLowerCase().replace(/"/g,"").replace(/'/g,''), $words) == -1) {
            text = text.replace($pattern, '<mark>' + $val + '</mark>');

            if($val != " "){
							if($val.startsWith("'")){
								console.log($.trim($val));
								var $btn = "<button onClick=correct(token)>" + $val + "</button>";
								$btn = $btn.replace('token', '"'+ $val + '"');
								$button = $($btn);
            				}else{
            					var $button = $('<button onClick="correct(\''+ $.trim(val) +'\')">' + $val + '</button>');
            				}

				$(".head").append($button);

				$("button").each(function() {

            			var $txt = $(this).text();
            			if ($seen[$txt]){
            				$(this).remove();
            			} else {
            				$seen[$txt] = true;
            			}
            	});
				
        	}
        }
    });
    return text;
}

function handleInput() {
    var text = $textarea.val();
    var highlightedText = applyHighlights(text);
    $highlights.html(highlightedText);
}

function handleScroll() {
    var scrollTop = $textarea.scrollTop();
    $backdrop.scrollTop(scrollTop);
    var scrollLeft = $textarea.scrollLeft();
    $backdrop.scrollLeft(scrollLeft);
}

function bindEvents() {
    $textarea.on({
        'input': handleInput,
        'scroll': handleScroll
    });
}

function correct(str){
	var $corrected = $corrector.correct(str.replace(/'/g,''));
	$textarea.val($textarea.val().replace(str,$corrected));
	handleInput();
	$('#textarea').focus();
}

bindEvents();

handleInput();

    console.log($corrector.correct('speling'));
