function pathAnimation(ele){	
	if(!ele){
		console.log('对不起请填写参数');
		return;
	}
	if(ele.length==undefined){
		console.log('对不起请检查元素是否正确');
		return;
	}
	var speed = 250;
	[].slice.call ( ele ).forEach( function( el ) {
			var s = Snap('100%','100%'),
				type = el.getAttribute('data-path-type')?el.getAttribute('data-path-type'):'echelon',
				fillcolor = el.getAttribute('fill')?el.getAttribute('fill'):'#fff',
				width = el.querySelectorAll('img')[0].width,
				height = el.querySelectorAll('img')[0].height;
			s.attr({
				'preserveAspectRatio':"none",
				'viewBox':"0 0 180 320"
			});
			pathConfig ={
				echelon:{
					from : 'M 180,160 0,218 0,0 180,0 z',
					to : 'm 180,34.57627 -180,0 L 0,0 180,0 z',
					easing:mina.easeinout
				},
				circle:{
					from:'m 0,0 0,171.14385 c 24.580441,15.47138 55.897012,24.75772 90,24.75772 34.10299,0 65.41956,-9.28634 90,-24.75772 L 180,0 0,0 z',
					to:'m 0,0 0,47.7775 c 24.580441,3.12569 55.897012,-8.199417 90,-8.199417 34.10299,0 65.41956,11.325107 90,8.199417 L 180,0 z',
					easing:mina.backout
				},
				star:{
					from:'M 0 0 L 0 182 L 90 126.5 L 180 182 L 180 0 L 0 0 z ',
					to:'M 0,0 0,38 90,58 180.5,38 180,0 z',
					easing:mina.backout
				}
			};
			var from = pathConfig[type].from;
			var to = pathConfig[type].to;
			var easing = pathConfig[type].easing;
			
			s.path(from).attr({
				fill:fillcolor,
				strokeWidth:0
			})
			s.appendTo(el);
			var path = s.select('path');
			el.addEventListener('mouseenter',function(){	
				path.animate( { 'path' : to }, speed,easing );
			})
			el.addEventListener('mouseleave',function(){	
				path.animate( { 'path' : from }, speed, easing );
			})
	});
}