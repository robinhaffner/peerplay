//function popbubbleJSON: (val) {
//		//var getActiveLayer = $.mobile.activePage;
//		var questionContent = $(__id).find('.bubble_content').html();
//		var questionHTML = Mustache.to_html(questionContent, val);
//		$(__id).find('.bubble_content').show().html(questionHTML);
//        
//       // console.log("__id",__id,"val",val);
//		if ($(getActiveLayer).find(".ui-content").data("plot") == "question") {
//			player.play(0);
//			getBubbleView(val);
//
//		} else if ($(getActiveLayer).find(".ui-content").data("plot") == "result") {
//			var whichChart = getActiveLayer.find(".charts").attr('id');
//			$("#"+whichChart).empty();
//			// var page = "#q2r";
//			$.jqplot.config.enablePlugins = true;
//			var __plotQ2R =$.cookie('__plotResults');
//			var __colorArray =$.cookie('__colorArray');
//
//			//decode cookie
//			var __p1=__plotQ2R.replace(/([^,]+,[^,]+),/g,'$1;');
//			var __p2=__colorArray.replace(/([^,]+,[^,]+),/g,'$1;');
//
//			var bar1=[];
//			var __bar1 = new String(__p1);
//
//			function makePlotArray (s, name){
//			    for (i in s) {
//			        if(name == "bar1"){
//			            arr = s[i].split(',')
//			            bar1.push([parseInt(arr[0]),arr[1]]);
//			        }
//			    }
//			}
//			makePlotArray(__bar1.split(';'), "bar1");
//
//			var __colorArray = [];
//			var s = __p2.split(",");
//			for (i in s) {
//			            var arr = s[i].split(';');
//			             for (j in arr) {
//			                __colorArray.push(arr[j]);
//			          }
//			        }
//			// console.log(__colorArray, bar1);
//
//			plot5 = $.jqplot(whichChart, 
//			    [bar1],//, plot1],
//			    {
//			        animate: true,
//			        seriesColors:__colorArray,
//			        series:[
//			            {label:'Your picks'},
//			           // {label:'What your peers think'}
//			            {pointLabels:{
//			                show: false,
//			                formatString: '%s (?%%)' 
//			              }}
//			            ],
//			         seriesDefaults:{
//			            renderer:$.jqplot.BarRenderer,
//			            shadowAngle: 0,
//			            shadowAlpha: 0,
//			            rendererOptions: {
//			                varyBarColor: true,
//			                barDirection: 'horizontal',
//			                highlightMouseDown: true   ,
//			                barWidth: 18,
//			                barPadding: -5,
//			                barMargin: 0,
//			                shadowAngle: 0,
//			                shadowAlpha: 0
//			            },
//			        },
//			        grid: {
//			            drawGridLines: false,        // wether to draw lines across the grid or not.
//			            gridLineColor: '#fff',    // *Color of the grid lines.
//			            background: '#ffffff',      // CSS color spec for background color of grid.
//			            borderColor: '#fff',     // CSS color spec for border around grid.
//			            borderWidth: 0,           // pixel width of border around grid.
//			            shadow: false,               // draw a shadow for grid.
//			            shadowAngle: 0,            // angle of the shadow.  Clockwise from x axis.
//			            shadowOffset: 0,          // offset from the line of the shadow.
//			            shadowWidth: 0,             // width of the stroke for the shadow.
//			            shadowDepth: 0,             // Number of strokes to make when drawing shadow.
//			                                        // Each stroke offset by shadowOffset from the last.
//			            shadowAlpha: 0,           // Opacity of the shadow
//			            renderer: $.jqplot.CanvasGridRenderer,  // renderer to use to draw the grid.
//			            rendererOptions: {}         // options to pass to the renderer.  Note, the default
//			                                        // CanvasGridRenderer takes no additional options.
//			        },
//			         legend: {
//			            show: true,
//			            placement: 'outside',
//			            location: 's',     // compass direction, nw, n, ne, e, se, s, sw, w.
//			           // xoffset: 200,        // pixel offset of the legend box from the x (or x2) axis.
//			           // yoffset: 300 ,      // pixel offset of the legend box from the y (or y2) axis.
//			            renderer: $.jqplot.EnhancedLegendRenderer,
//			            rendererOptions: {
//			                numberRows: 1
//			            }
//			        },
//			        axes: {
//			            xaxis: {
//			               // renderer: $.jqplot.AxisLabelRenderer,
//			                show: false,    // wether or not to renderer the axis.  Determined automatically.
//			                min: 0, 
//			                max: 120,
//			                rendererOptions: {
//			                   drawBaseline: false
//			                },
//			                tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
//			                 pad: 1.05,
//			                tickOptions: { formatString: '%d%', showMark: false, showLabel: false },
//			                showTickMarks: false,
//			                showLabel: false,
//			                textColor: "#fff"
//			                
//			            },
//			            yaxis: {    
//			                renderer: $.jqplot.CategoryAxisRenderer,
//			                rendererOptions: {
//			                   drawBaseline: false
//			                },
//			                //tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
//			                // pad: 1.05,
//			               // tickOptions: { formatString: '$%d', showMark: false },
//			               // showTickMarks: false,
//			            }  
//			        }
//			    });
//
//
//		} else if ($(getActiveLayer).find(".ui-content").data("plot") == "scores") {
//			renderJSONContent.scoreJSON(val);
//		}
//		else { return false; }
//	}
//	function dragdropJSON(val) {
//        console.log("RENDER dragdrop", val);
//		var getActiveLayer = $.mobile.activePage;
//		var questionContent = $(__id).find('.question_content').html();
//		var questionHTML = Mustache.to_html(questionContent, val);
//		$(__id).find('.question_content').show().html(questionHTML);
//
//		if ($(getActiveLayer).find(".ui-content").data("plot") == "question") {
//			getListView();
//		} else if ($(getActiveLayer).find(".ui-content").data("plot") == "result") {
//			var whichChart = getActiveLayer.find(".charts").attr('id');
//			$("#"+whichChart).empty();
//			$.jqplot.config.enablePlugins = true;
//			var __plot1, __plot2;
//
//			//read q1 cookie
//			__plot1 = $.cookie('__plot1'); 
//			__plot2 = $.cookie('__plot2');
//			//console.log("message",____plot1,____plot2);
//
//			//decode cookie
//			var __p1=__plot1.replace(/([^,]+,[^,]+),/g,'$1;');
//			var __p2=__plot2.replace(/([^,]+,[^,]+),/g,'$1;');
//			//console.log("message",__p1,__p2);
//
//			var bar1=[], bar2=[];
//			var __bar1 = new String(__p1);
//			var __bar2 = new String(__p2);
//			//console.log("message",__p1,__p2,bar1,__bar1,bar2,__bar2);
//
//			function makePlotArray (s, name){
//			    for (i in s) {
//			        if(name == "bar1"){
//			            arr = s[i].split(',')
//			            bar1.push([parseFloat(arr[0]),arr[1]]);
//			        }
//			        if(name == "bar2"){
//			            arr = s[i].split(',')
//			            bar2.push([parseFloat(arr[0]),arr[1]]);
//			        }
//			    }
//			}
//			makePlotArray(__bar1.split(';'), "bar1");
//			makePlotArray(__bar2.split(';'), "bar2");
//
//			var colorArray=[];
//			colorArray = ['#f96802', '#dcd2ba'];
//			//colorArray = ['#dcd2ba', '#f96802'];
//
//			//The length of the plots determines the ticks and number of ticks
//			var numTicks = bar1.length;
//			var tickArray = new Array();
//			for (var i=0; i<numTicks+1; i++)
//			{
//			    tickArray.push(i);                      
//			}
//
//			          plot3 = $.jqplot(whichChart, 
//                [bar1, bar2],
//                {
//                    animate: true,
//                    captureRightClick: true,
//                    seriesColors:colorArray,
//                     grid: {
//                        drawGridLines: true,        // wether to draw lines across the grid or not.
//                        gridLineColor: '#cccccc',    // *Color of the grid lines.
//                        background: '#ffffff',      // CSS color spec for background color of grid.
//                        borderColor: '#999999',     // CSS color spec for border around grid.
//                        borderWidth: 0,           // pixel width of border around grid.
//                        shadow: false,               // draw a shadow for grid.
//                        shadowAngle: 0,            // angle of the shadow.  Clockwise from x axis.
//                        shadowOffset: 0,          // offset from the line of the shadow.
//                        shadowWidth: 0,             // width of the stroke for the shadow.
//                        shadowDepth: 0,             // Number of strokes to make when drawing shadow.
//                                                    // Each stroke offset by shadowOffset from the last.
//                        shadowAlpha: 0,           // Opacity of the shadow
//                        renderer: $.jqplot.CanvasGridRenderer,  // renderer to use to draw the grid.
//                        rendererOptions: {}         // options to pass to the renderer.  Note, the default
//                                                    // CanvasGridRenderer takes no additional options.
//                    },
//                    seriesDefaults:{
//                        renderer:$.jqplot.BarRenderer,
//                        shadowAngle: 0,
//                        shadowAlpha: 0,
//                        rendererOptions: {
//                            barDirection: 'horizontal',
//                            highlightMouseDown: true   ,
//                            barWidth: 18,
//                            barPadding: 0,
//                            barMargin: 0,
//                            shadowAngle: 0,
//                            shadowAlpha: 0
//                        },
//                        pointLabels: {show: false, formatString: '%d'},
//                    },
//                    series:[
//                        {label:'Your pick'},
//                        {label:'Average'}
//                        ],
//                    legend: {
//                        show: true,
//                        placement: 'outside',
//                        location: 's',     // compass direction, nw, n, ne, e, se, s, sw, w.
//                       // xoffset: 200,        // pixel offset of the legend box from the x (or x2) axis.
//                       // yoffset: 300 ,      // pixel offset of the legend box from the y (or y2) axis.
//                        renderer: $.jqplot.EnhancedLegendRenderer,
//                        rendererOptions: {
//                            numberRows: 1
//                        }
//                    },
//                    axes: {
//                        yaxis: {
//                            renderer: $.jqplot.CategoryAxisRenderer
//                        },
//                        
//                        xaxis: {
//                            renderer: $.jqplot.LinearAxisRenderer,
//                            tickInterval: 1,
//                            ticks: tickArray,//[1,2,3,4,5],
//                            drawMajorGridlines: true,
//                            drawMinorGridlines: false,
//                            drawMajorTickMarks: false,
//                            rendererOptions: {
//                                tickInset: 0,
//                                minorTicks: 0
//                            }
//                        }
//                    }
//                });
//		}
//        
//        function getBubbleView(d){
//	var answers = d.answers;
//	colorArray = [];
//	for( i in answers){
//		var str = answers[i].answer;
//		var ans = str.replace(/\s+/g, '<br>');
//		plotResults[i]=[answers[i].score,answers[i].answer];
//		//plotItems.push(ans);
//		plotXYPosition[i]=[answers[i].xAxis,answers[i].yAxis];
//		plotItems.push(answers[i].answer);
//		colorArray.push(defaultColor);
//	}
//
//	//use cookie to store data plots
//	$.removeCookie('__plotResults');
//	$.removeCookie('__plotItems');
//	$.removeCookie('__plotXYPosition');
//	$.removeCookie('__colorArray');
//
//	$.cookie("__plotResults", plotResults);
//	$.cookie("__plotItems", plotItems); 
//	$.cookie("__plotXYPosition", plotXYPosition); 
//	$.cookie("__colorArray", colorArray); 
//
//	createbubble();
//	popBubbleView();
//
//}

function createbubble(_page) {
	var whichBubble = _page;
	//$.mobile.activePage.find("#canvasBubble").empty();
	var page = "#bubblequestion";

	$.jqplot.config.enablePlugins = true;
	 var bubblePlot = [];
	 var arr = [];
	//define alternate plots for different answer counts
	var bubblePlot5 = [[45,25,50,""],[25,60,50,""],[55,80,50,""],[90,70,50,""],[80,30,50,""],[50,50,50,""]];
	var bubblePlot6 = [[45,25,50,""],[25,60,50,""],[55,80,50,""],[90,70,50,""],[80,30,50,""]];
	var bubblePlot7 = [[45,25,50,""],[25,60,50,""],[55,80,50,""],[90,70,50,""],[80,30,50,""]];
	//bubblePlot = bubblePlot+arr.length;
	arr = $.cookie('__plotItems').split(",");
	arrXY = $.cookie('__plotXYPosition').split(',');
    
    bubblePlot = [[45,25,50,arr[0]],[25,60,50,arr[1]],[55,80,50,arr[2]],[80,50,50,arr[3]]];

	var colorArray=[];
	colorArray = ['#8bcffa', '#8bcffa', '#8bcffa', '#8bcffa','#8bcffa'];
	plot2 = $.jqplot(whichBubble,[bubblePlot],{
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

function popBubbleView(argument) {
	var canvasArr, labelArr, clickBubble, userSelectedBubble = [];
	var whichBubble = $.mobile.activePage.find(".plot").attr('id');
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
