;
(function($) {
	$.fn.mousestorm = function(options) {
		//检查配置参数里面的图片是否存在，若不存在则不向下执行
		if(!options || !('images' in options) || !options.images[0]) {
			console.log('对不起，请指定粒子图片');
			return;
		};
		var num = 0; //关键帧名称
		var Wwidth = $(window).width(); //获取窗口宽度
		var Wheight = $(window).height(); //获取窗口高度
		var _this = $(this); //保存选中元素
		var defaults = {
			opacity: [0.2, 0.96], //粒子透明度范围0.2-0.96。粒子随机透明度范围
			time: [2000, 3000], //粒子运动的时间2000-3000毫秒
			rotate: [360, 720], //旋转度数,随机旋转
			scale: [0.3, 0.7], //粒子缩放范围 原图片的倍数0.3-0.7。粒子的随机大小范围
			diepresent: 0.2, //粒子生长到消失的范围，屏幕宽度取0.4的倍数。 数值越大粒子运动的越远，数值越小粒子运动的越近 建议0.4
			numpresent: 0.04, //粒子产生数量限制比例 数值越小 创建 的也越小，数值越大创建的也越多建议0.04,
			maxkey: 1000//样式的多样化，控制动画的多少。数值越大，效果会更好，建议大于360
		};
		var opts = $.extend({}, defaults, options); //将参数合并，并覆盖
		//创建style标签，加入文档
		$('head').append($('<style id="mouseStorm">.container img{position:absolute;left:0;top:0; transform:rotate(0deg); z-index: 999;}</style>'));

		//添加动画关键帧
		createkeyframes();
		//通过for循环进行创建样式条为animationCSS和keyframes
		function createkeyframes() {
			var targetPosKeyframe = '';
			for(var i = 0; i < opts.maxkey; i++) {
				var opacity = rnd(opts.opacity[0], opts.opacity[1]);
				var time = rnd(opts.time[0], opts.time[1]);
				var scale = rnd(opts.scale[0], opts.scale[1]);
				var diepresent = opts.diepresent;
				var rotate = rnd(opts.rotate[0], opts.rotate[1]);
				var imgopts = {
					css: {
						transform: "rotate(" + rnd(0, 360) + "deg) scale(" + scale + ") translateX(0) translateY(0)",
						opacity: opacity,
						// forwards为运动结束后保持最后一个状态
						animation: "strom" + i + " " + time + "ms linear forwards"
					}
				};
				var deg = parseInt(rnd(0, 360));
				var newx = Wwidth * diepresent * Math.sin(deg * Math.PI / 180); //目标点的横坐标
				var newy = Wwidth * diepresent * Math.cos(deg * Math.PI / 180); //目标点的纵坐标
				//目标点的关键帧及运动的类名
				//storm 为动画名称前缀
				//stay 为类名前缀
				targetPosKeyframe += "@keyframes strom" + i + "{ 0%{transform:" + imgopts.css.transform + "; opacity:" + opacity + ";scale(" + scale + ");} 100%{transform:rotate(" + rnd(0, 1080) + "deg) translateX(" + newx + "px) translateY(" + newy + "px) scale(" + rnd(opts.scale[0], opts.scale[1]) + "); opacity:0;} }" + ".stay" + i + "{transform:" + imgopts.css.transform + "; opacity:" + imgopts.css.opacity + ";animation:" + imgopts.css.animation + ";}";
			}
			//将样式添加进文档
			$('#mouseStorm').append(targetPosKeyframe);
		};
		//鼠标移动
		$(window).on('mousemove', function(e) {
			var x = e.pageX;
			var y = e.pageY;
			//判断是为了减少粒子产生的数量
			if(parseInt(rnd(0, (1 / opts.numpresent))) == 1) {
				createImg(x, y);
			};
		})
		function createImg(x, y) {
			var newtag = $('<img />'); //插入的元素
			var className = 'stay' + parseInt(rnd(0, opts.maxkey)); //类名拼凑
			var images = opts.images;
			//图片的所有参数集合
			var imgopts = {
				tag: newtag,
				src: images[parseInt(rnd(0, images.length))], //取出随机的图片
				css: {
					left: x,
					top: y
				}
			};
			newtag.attr({
				'src': imgopts.src,
				'class': className
			}); //将图片加入，并添加类名
			newtag.css(imgopts.css); //将其css指定到文档当中。
			_this.append(newtag); //将粒子加入文档
			//获取运动时间
			var time = newtag.css('animation-duration');
			time = time.substr(0, time.length - 1) * 1000;
			//回调函数，粒子运动完成之后再删除掉粒子。
			setTimeout(function() {
				$(newtag).remove();
			}, time)

		};
		//随机函数
		function rnd(min, max) {
			return Math.random() * (max - min) + min;
		};
	}
})(window.jQuery);