define(function (require) {

    "use strict";

    var Handlebars      = require('handlebars'),
        siteAdapter     = require('adapters/site'),
        resultHtml    = require('text!tpl/result.html'),
        resultTpl = Handlebars.compile(resultHtml);
    

        Handlebars.registerHelper('if_eq', function(a, b, opts) {
            if(a == b) // Or === depending on your needs
                return opts.fn(this);
            else
                if(opts == undefined){
                    var ret = "";

                    for(var i=0, j=a.length; i<j; i++) {
                        ret = ret + b.fn(a[i]);
                    }
                    return ret;
                }
                else {
                    return opts.inverse(this);
                }
        });

    return function () {

        this.initialize = function () {
            this.$el = $('.content-wrapper');
        };

        this.render = function (content) {
            this.$el.html(resultTpl(content));
            this.$el.data('template', '').data('template', 'resulttpl');
            this.renderBubbles();
            return this;
        };
   
        this.renderBubbles = function(){
                
                  // Colour variables
            var red = "#bf616a",
                blue = "#5B90BF",
                orange = "#d08770",
                yellow = "#ebcb8b",
                green = "#a3be8c",
                teal = "#96b5b4",
                pale_blue = "#8fa1b3",
                purple = "#b48ead",
                brown = "#ab7967";
        
        
            var data = [],
                barsCount = 50,
                labels = new Array(barsCount),
                updateDelayMax = 500,
                $id = function(id){
                    return document.getElementById(id);
                },
                random = function(max){ return Math.round(Math.random()*100)},
                helpers = Chart.helpers;
        
        
            Chart.defaults.global.responsive = true;
                
                var contexts = {
                    bubble0 : $id('carousel-bubble0').getContext('2d'),
                    bubble1 : $id('carousel-bubble1').getContext('2d'),
                    bubble2 : $id('carousel-bubble2').getContext('2d'),
                    bubble3 : $id('carousel-bubble3').getContext('2d'),
                    bubble4 : $id('carousel-bubble4').getContext('2d')
                    },
                    bubbleInstances = [];
               
        
                var data = {
                    segments : [
                        {
                            value : 25,
                            color : pale_blue,
                            highlight : pale_blue,
                            label : ""
                        }
        
                    ]
                }
        
        
                var config = {
                    animation: true,
                    animateScale: true,
                    responsive : true, percentageInnerCutout: 0, animateRotate : false, segmentStrokeWidth : 0, segmentShowStroke : false,
                    onAnimationComplete: function(){
                        this.options.animation = true;
                    }
                };
                
        
        
                bubbleInstances.push(new Chart(contexts.bubble0).Doughnut(data.segments, config));
                bubbleInstances.push(new Chart(contexts.bubble1).Doughnut(data.segments, config));
                bubbleInstances.push(new Chart(contexts.bubble2).Doughnut(data.segments, config));
                bubbleInstances.push(new Chart(contexts.bubble3).Doughnut(data.segments, config));
                bubbleInstances.push(new Chart(contexts.bubble4).Doughnut(data.segments, config));
        
        
                helpers.each(contexts, function(bubble){
                    console.log(bubble.canvas);
                    helpers.addEvent(bubble.canvas, 'click', function(evt){
                         console.log(evt);
                        ///do something here to "POP" the bubble
                        //1. record the selection - these are used to display the results
                        //2. animate and destroy the object
                    });
                    //add the text label for the bubble. It should come from the view div that was loaded from the json when the template was loaded
                });
        
        
            };
    
    
      



        this.initialize();

    };

});
