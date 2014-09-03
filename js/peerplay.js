var __id, folderJSON;
tdata = {};
$.cookie("__plotItems", '');


var numOfQuestions = 0;
var selectedColor = "#f96802";
var defaultColor = "#dcd2ba";
var colorArray = []; 
var plotItems = []; 
var plotResults = [];
var plotXYPosition = [];

var deviceAgent = navigator.userAgent.toLowerCase();


var sounds = { 
	bell: {
		mp3: "css/peerplay-css/sounds/bell.mp3",
		ogg: "css/peerplay-css/sounds/bell.ogg"
	},
	applause: {
		mp3: "css/peerplay-css/sounds/applause.mp3",
		m4a: "css/peerplay-css/sounds/applause.m4a",
		wav: "css/peerplay-css/sounds/applause.wav",
		ogg: "css/peerplay-css/sounds/applause.ogg"
	},
	audiosprite: {
		mp3: "css/peerplay-css/sounds/sounds.mp3"
	}
	
};

var click = document.ontouchstart === undefined ? 'click' : 'touchstart';

var resizeContentContainer = function (){
	var thisContent = $("[role='main']");
	if (window.innerHeight > 321 ) {
		var gsize = window.innerHeight - ( $("[data-role='footer']").height() + $("[data-role='header']").height() );
		var gpadding = parseInt(thisContent.css("padding-top"), 10) + parseInt(thisContent.css("padding-bottom"), 10);
		var gmargin = parseInt(thisContent.css("margin-top"), 10) + parseInt(thisContent.css("margin-bottom"), 10);
		$("[role='main']").height( parseInt( gsize - gpadding - gmargin ) + 35)
	};
}

$("[role='main']").ready(function(){
	if ($("[role='main']").height() < window.innerHeight) {
		resizeContentContainer();
	};
	
});

$(window).resize(function() {
	if ($("[role='main']").height() < window.innerHeight) {
		resizeContentContainer();
	};
});

function Track(src, spriteLength, audioLead) {
  var track = this,
      audio = document.createElement('audio');
  audio.src = src;
  audio.autobuffer = true;
  audio.load();
  audio.muted = true; // makes no difference on iOS :(
  
  /* This is the magic. Since we can't preload, and loading requires a user's 
     input. So we bind a touch event to the body, and fingers crossed, the 
     user taps. This means we can call play() and immediate pause - which will
     start the download process - so it's effectively preloaded.
     
     This logic is pretty insane, but forces iOS devices to successfully 
     skip an unload audio to a specific point in time.
     first we play, when the play event fires we pause, allowing the asset
     to be downloaded, once the progress event fires, we should have enough
     to skip the currentTime head to a specific point. */
     
  var force = function () {
    audio.pause();
    audio.removeEventListener('play', force, false);
  };
  
  var progress = function () {
    audio.removeEventListener('progress', progress, false);
    if (track.updateCallback !== null) track.updateCallback();
  };
  
  audio.addEventListener('play', force, false);
  audio.addEventListener('progress', progress, false);
  
  var kickoff = function () {
    audio.play();
    document.documentElement.removeEventListener(click, kickoff, true);
  };
  
  document.documentElement.addEventListener(click, kickoff, true);
  
  this.updateCallback = null;
  this.audio = audio;
  this.playing = false;
  this.lastUsed = 0;
  this.spriteLength = spriteLength;
  this.audioLead = audioLead;
}
 
Track.prototype.play = function (position) {
  var track = this,
      audio = this.audio,
      lead = this.audioLead,
      length = this.spriteLength,
      time = lead + position * length,
      nextTime = time + length;
      
  clearInterval(track.timer);
  track.playing = true;
  track.lastUsed = +new Date;
  
  audio.muted = false;
  audio.pause();
  try {
    if (time == 0) time = 0.01; // yay hacks. Sometimes setting time to 0 doesn't play back
    //audio.currentTime = time;
    audio.play();
  } catch (e) {
    this.updateCallback = function () {
      track.updateCallback = null;
      audio.currentTime = time;
      audio.play();
    };
    audio.play();
  }
 
  track.timer = setInterval(function () {
    if (audio.currentTime >= nextTime) {
      audio.pause();
      audio.muted = true;
      clearInterval(track.timer);
      player.playing = false;
    }
  }, 10);
};
var player = (function (src, n, spriteLength, audioLead) {
  var tracks = [],
      total = n,
      i;
  
  while (n--) {
    tracks.push(new Track(src, spriteLength, audioLead));
  }
  
  return {
    tracks: tracks,
    play: function (position) {
      var i = total,
          track = null;
          
      while (i--) {
        if (tracks[i].playing === false) {
          track = tracks[i];
          break;
        } else if (track === null || tracks[i].lastUsed < track.lastUsed) {
          track = tracks[i];
        }
      }
      
      if (track) {
        track.play(position);
      } else {
        // console.log('could not find a track to play :(');
      }
    }
  };
})('../css/sounds/sounds.mp3', 1, 0.7941, 0);
// 0.7941
// myaudiosprite.mp3 is the complete audio sprite
// 1 = the number of tracks, increase this for the desktop
// 1 = the length of the individual audio clip
// 0.25 = the lead on the audio - hopefully zero, but in case any junk is added


var crossMarquee, scrollTime, delayBeforeScroll = 1000, marqueeSpeed = 2, pauseIt = 1;
var copySpeed = marqueeSpeed;
var pauseSpeed = (pauseIt == 0) ? copySpeed: 0;
var actualHeight = '', leftTime;

function scrollMarquee(){
	if (parseInt(crossMarquee.css('top')) > (actualHeight*(-1)+8) ){
		crossMarquee.animate({
			top: (parseInt(crossMarquee.css('top')) - copySpeed+"px")
		}, 0)
	}
	else { crossMarquee.css('top', parseInt(marqueeHeight)+8 ); }
}

function initializeMarquee(){
	crossMarquee = $('.ftr-marquee');
	crossMarquee.css('top', 0);
	marqueeHeight = $('.disclaimer').height();

	//actualHeight = crossMarquee.height();
	actualHeight = 1077;

	clearInterval(leftTime);
	clearTimeout(scrollTime);

	scrollTime = setTimeout('leftTime=setInterval("scrollMarquee()",50)', delayBeforeScroll);
}

$( document ).on( "pageinit", "[data-role='page'].app-page", function() {
	
	var page = "#" + $( this ).attr( "id" ),
	// Get the filename of the next page that we stored in the data-next attribute
	nextpage = $( this ).jqmData( "next" );
//console.log("nextpage",nextpage);
	// Check if we did set the data-next attribute
	if ( nextpage ) {
         
		// Navigate to next page on swipe left
		$( document ).on( "swipeleft", page, function() {
			$.mobile.changePage( nextpage + ".html", { transition: "none" }, true, true);
		});
		// Navigate to next page when the "next" button is clicked
		$( ".control .btn-next-page", page ).on( "click", function(event) {
			event.preventDefault();
			$.mobile.changePage( nextpage + ".html", { transition: "none" }, true, true );
		});
	}
	// Disable the "next" button if there is no next page
	else {
		$( ".control .btn-next-page", page ).addClass( "ui-disabled" );
	}

	//index
    if (page == "#main"){
        var cookies = $.cookie();
        for(var cookie in cookies) {
           $.removeCookie(cookie);
        }
        $('.info_banner span.question').empty();
		$('.info_banner span.score').empty();
		$('.info_banner span.rank').empty();
    }

	//footer
	$( "#ftr .disclaimer" ).hover(
	  function() {
	    copySpeed = pauseSpeed;
	  }, function() {
	    copySpeed = marqueeSpeed;
	  }
	);
	$( "[data-role='footer']#ftr .ftr-marquee" ).load( "isi.html", function(response, status, xhr) {
		if ( status == "success" ) {
			initializeMarquee();
		}
		if ( status == "error" ) {
			//console.log("$(this)",$(this));
			$(this).append('Err: '+ xhr.status + " " + xhr.statusText)
		}
	});
});

$(document).on('pageshow', "[data-role='page'].app-page", function(event, ui) {



	// disable swipeleft on overflow images
	$( "div.custom_scrollbar" ).on( "swipeleft", swipeleftHandler );
	function swipeleftHandler( event ){
		event.stopPropagation(); event.preventDefault();
	}

}); //pageshow





function getListView(obj){
    var plot1= [], plot2=[];
    var whichListView = obj.attr('id');
    $('#'+whichListView).find("li").each(function(i, e){
        var s = $(e).html().replace(' ', '<br>');
        plot1.push([i+1, s]);
        plot2.push([parseFloat($(e).jqmData( "avg" )), s]);
    });

    plot1.reverse();
    plot2.reverse();

    //use cookie to store data plots
    $.removeCookie('__plot1');
    $.removeCookie('__plot2');

    $.cookie("__plot1", plot1); 
    $.cookie("__plot2", plot2); 
    $("#q1 .control .next").removeClass( "ui-disabled" );
    
    $('#'+whichListView)
        .sortable({
            'containment': 'parent',
            'opacity': 0.6,
            update: function(event, ui) {
                plot1= [], plot2=[];
                $('#'+whichListView).find("li").each(function(i, e){
                	var s = $(e).html().replace(' ', '<br>');
                	plot1.push([i+1, s]);
                	plot2.push([parseFloat($(e).jqmData( "avg" )), s]);
                });

                plot1.reverse();
                plot2.reverse();

	            //use cookie to store data plots
	            $.removeCookie('__plot1');
	            $.removeCookie('__plot2');

	            $.cookie("__plot1", plot1); 
	            $.cookie("__plot2", plot2); 

                $("#q1 .control .next").removeClass( "ui-disabled" );
            }
        })
        .disableSelection()
        .listview().listview('refresh');
};


function getBubbleView(d){
	var answers = d.answers;
	colorArray = [];
	for( i in answers){
		var str = answers[i].answer;
		var ans = str.replace(/\s+/g, '<br>');
		plotResults[i]=[answers[i].score,answers[i].answer];
		//plotItems.push(ans);
		plotXYPosition[i]=[answers[i].xAxis,answers[i].yAxis];
		plotItems.push(answers[i].answer);
		colorArray.push(defaultColor);
	}

	//use cookie to store data plots
	$.removeCookie('__plotResults');
	$.removeCookie('__plotItems');
	$.removeCookie('__plotXYPosition');
	$.removeCookie('__colorArray');

	$.cookie("__plotResults", plotResults);
	$.cookie("__plotItems", plotItems); 
	$.cookie("__plotXYPosition", plotXYPosition); 
	$.cookie("__colorArray", colorArray); 

	createbubble();
	popBubbleView();

}

function createbubble(obj) {
    
     $(document).find('.bubble li').each( function(i, ele) {
      var arr = []; // build the array for bubbleplot [id, text]
            
     });
	
	 var bubblePlot = [];
	//define alternate plots for different answer counts
	var bubblePlot5 = [[45,25,50,""],[25,60,50,""],[55,80,50,""],[90,70,50,""],[80,30,50,""],[50,50,50,""]];
	var bubblePlot6 = [[45,25,50,""],[25,60,50,""],[55,80,50,""],[90,70,50,""],[80,30,50,""]];
	var bubblePlot7 = [[45,25,50,""],[25,60,50,""],[55,80,50,""],[90,70,50,""],[80,30,50,""]];
    
    bubblePlot = [[45,25,50,arr[0]],[25,60,50,arr[1]],[55,80,50,arr[2]],[80,50,50,arr[3]]];

	var colorArray=[];
	colorArray = ['#8bcffa', '#8bcffa', '#8bcffa', '#8bcffa','#8bcffa'];
	plot2 = $.jqplot(obj,[bubblePlot],{
	    animate: true,
	    seriesColors:colorArray,
	     grid: {
	        drawGridLines: false,        // wether to draw lines across the grid or not.
	        gridLineColor: '#ffffff',    // *Color of the grid lines.
	        background: '#ffffff',      // CSS color spec for background color of grid.
	        borderColor: '#ffffff',     // CSS color spec for border around grid.
	        borderWidth: 0,           // pixel width of border around grid.
	        shadow: false,               // draw a shadow for grid.
	        shadowAngle: 0,            // angle of the shadow.  Clockwise from x axis.
	        shadowOffset: 0,          // offset from the line of the shadow.
	        shadowWidth: 0,             // width of the stroke for the shadow.
	        shadowDepth: 0,             // Number of strokes to make when drawing shadow.
	                                    // Each stroke offset by shadowOffset from the last.
	        shadowAlpha: 0,           // Opacity of the shadow
	        //renderer: $.jqplot.CanvasGridRenderer,  // renderer to use to draw the grid.
	        rendererOptions: {}         // options to pass to the renderer.  Note, the default
	                                    // CanvasGridRenderer takes no additional options.
	    },
	    seriesDefaults:{
	        renderer: $.jqplot.BubbleRenderer,
	        rendererOptions: {
	            bubbleAlpha: 0.6,
	            highlightAlpha: 0.8,
	            highlightMouseDown: false, //diesable jqplotDataHighlight
	            highlightMouseOver: false, //diesable jqplotDataHighlight
	            autoscaleBubbles: false,
	            escapeHtml: false
	        },
	        shadow: true,
	        shadowAlpha: 0.05
	    },
	    
	     axesDefaults: {
	        show: false,    // wether or not to renderer the axis.  Determined automatically.
	        //renderer: $.jqplot.LinearAxisRenderer,  // renderer to use to draw the axis,
	      // renderer: $.jqplot.CategoryAxisRenderer,
	        renderer: $.jqplot.LinearAxisRenderer,
	        showTickMarks:false,
	        tickInterval: 10,
	        ticks: [10,20,30,40,50,60,70,80,100],
	        showTicks: false, 
	        drawMajorGridlines: false,
	        drawMinorGridlines: false,
	        drawMajorTickMarks: false,
	        rendererOptions: {
	            tickInset: 0,
	            minorTicks: 0
	        }
	                  
	   }
	});
}

function popBubbleView(obj) {
	var canvasArr, labelArr, clickBubble, userSelectedBubble = [];
	var whichBubble = obj.attr('id');
    var selected;
	$('#'+whichBubble).bind('jqplotDataClick',
		function (ev, seriesIndex, pointIndex, data) {
			canvasArr = $.makeArray( $(this).find(".jqplot-series-canvas .jqplot-bubble-point") );
			labelArr = $.makeArray( $(this).find(".jqplot-series-canvas .jqplot-bubble-label") );
			//search for click location and hide from canvas container
			for( t in labelArr){
				if($.inArray($(labelArr[t]).html().toString(), data) != -1) {
					var options = {};
                    selected = $(labelArr[t]).html().toString();
					$(labelArr[t]).hide()
					$(canvasArr[t]).effect( "puff", options, 300);
                    
                    //swapping the position of the selected bubble with the first result and color. We do this so that the selected color legend in the results page will reflect the items selected. jqplot uses the first item color in the array to dictate the legend color.
                    var tmp = plotResults[0];
                    var ctmp = colorArray[0];
                    plotResults[0] = plotResults[t];
                    colorArray[0] = selectedColor;
                    plotResults[t] = tmp;
                    colorArray[t] = ctmp;
                    
				}
			}
           
            $.removeCookie('__plotResults');
            $.cookie("__plotResults", plotResults); 
             $.removeCookie('__colorArray');
            $.cookie("__colorArray", colorArray); 
		})	
}

var setScore = {
	timerCounter: function (oldScore, newScore, sitedata) {
		var current = oldScore;
		if (oldScore != sitedata.score){
			var timer = setInterval(function () {
				current += increment;
				$('.info_banner span.score').empty().append(current)
				if (current == newScore) { clearInterval(timer); setScore.settingVal(sitedata); }
			}, 5);
		}
		if (increment) {
			//play sound applause
			player.play(5);
		};
	},	
	settingVal: function (d) {
		$.cookie('__score', d.score);
		$('.info_banner span.rank').empty().append(d.rank);
	}
}
