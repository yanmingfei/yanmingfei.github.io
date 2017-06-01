~(function($){
	$.fn.mouseparallax = function(options){
		var defaults = {
			far:$('[far]'),
			middle:$('[middle]'),
			near:$('[near]')
		}
		var opts = $.extend({},defaults,options);
		//设置运动距离
		var disjson = [];
		var optarr = [];
		var coefficient = [30,100]
		$.each(opts,function(i,e) {
			disjson.push({x:0,y:0,cof:1/rnd(coefficient[0],coefficient[1])});
			var obj = {};
			optarr.push({'ele':$(e),'name':i})
		});
		//进行移动
		$(this).on('mousemove',function(e){
			var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
            var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
            lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
            lFollowY = (10 * lMouseY) / 100;
            $.each(disjson,function(i,n) {
            	disjson[i].x+= (lFollowX-n.x)*n.cof;
            	disjson[i].y+= (lFollowY-n.y)*n.cof;
            });
            $.each(optarr,function(i,n) {
            	var x = disjson[i].x;
            	var y = disjson[i].y;
            	if(n.name=='near'){
            		x = -x;
            		y = -y;
            	}
            	var translate = 'translate(' + x + 'px, ' + y + 'px)'
            	$(n.ele).css({'transform':translate})
            });
		})
		function rnd(num1,num2){
			return Math.random()*(num2-num1)+num1;
		}
		
	}
})(jQuery);