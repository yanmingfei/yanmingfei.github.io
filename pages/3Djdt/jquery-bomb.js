;
(function($) {
	$.fn.bomb = function(options) {
		var imgs = [];
		var hrefs = []
		$(this).find('ul li').each(function(index, ele) {
			var newele = $(ele).find('img');
			var href = $(ele).find('a')
			imgs.push(newele.attr('src'));
			hrefs.push(href.attr('href'))
		});
		$(this).find('ul').hide();
		if(imgs.length == 0) {
			console.log('对不起，文档当中无图，希望重新指定');
			return;
		};
		//创建元素
		var box = $('<style id="bomb-style"></style><div class="bomb-box"><a class="bomb-href" href="#"></a><button>&lt;</button><button>&gt;</button></div>');
		$(this).append(box);
		var defaults = {
			col:6,
			row:4
		}
		var opts = $.extend({},defaults,options); 
		//获取宽度和高度
		var imgwidth = $(this).width();
		var imgheight = $(this).height();
		var gridrow = opts.row<2?2:opts.row;
		var gridcol = opts.col<2?2:opts.col;
		var str = '';
		var num = 0;
		var timer = null;
		var btn = false;
		var offset = [];
		var oaleft = $('.bomb-href').offset().left;
		var oatop = $('.bomb-href').offset().top;
		var ospanw = imgwidth / gridcol;
		var ospanh = imgheight / gridrow;
		$('#bomb-style').html($('#bomb-style').html() + '.bomb-box span{float:left;width:' + ospanw + 'px;height:' + ospanh + 'px}')

		for(var i = 0; i < gridcol * gridrow; i++) {
			str += '<span></span>'
		}
		$('.bomb-href').html(str);
		$('.bomb-href span').each(function(index, element) {
			var left = $(element).offset().left - oaleft;
			//获取元素相对于父级的坐标。
			var top = $(element).offset().top - oatop;
			offset.push({
				l: left,
				t: top
			})
		});
		go();
		//鼠标移上大区域，让其清除自动播放，移开区域再自动播放
		$('.bomb-box').hover(function(e) {
			clearInterval(timer);
		}, function() {
			go();
		});

		//单击左侧按钮
		$('.bomb-box button:eq(0)').click(function(e) {
			bong('left');
		});
		//单击右侧按钮
		$('.bomb-box button:eq(1)').click(function(e) {
			bong('right');
		});
		//封装自动播放
		function go() {
			clearInterval(timer);
			timer = setInterval(function() {
				bong('right')
			}, 3000)
		}

		$('.bomb-href').css({
			background: 'url(' + imgs[num] + ') no-repeat'
		}).attr('href',hrefs[num])
		//爆炸播放效果
		function bong(dir) {
			if(btn == false) {
				btn = true;
			} else {
				return;
			};

			$('.bomb-href').html('');
			for(var i = 0; i < gridcol * gridrow; i++) {
				var str = '<span></span>';
				$('.bomb-href').html($('.bomb-href').html() + str)
			};

			//进行span处理
			$('.bomb-href span').each(function(index, element) {
				//进行每个元素默认效果
				$(element).css({
					left: offset[index].l,
					top: offset[index].t,
					position: 'absolute',
					background: 'url(' + imgs[num] + ') no-repeat -' + offset[index].l + 'px -' + offset[index].t + 'px',
					transition: 'all 0.5s ease-out'
				});
				//进行计算目标位置
				//宽度和高度都是50
				var left = (offset[index].l + (ospanw/2) - (imgwidth / 2)) * rnd(2, 3) + (imgwidth / 2) - (ospanw/2);
				var top = (offset[index].t + (ospanh/2) - (imgheight / 2)) * rnd(2, 3) + (imgheight / 2) - (ospanh/2);
				//单次定时器里面要传参，参数是什么
				//以后可以更好的使用扩展
				setTimeout((function(ele, l, t) {
					//进行结束后的效果,爆炸
					return function() {
						$(element).css({
							opacity: 0,
							left: left,
							top: top,
							transform: 'rotateX(' + rnd(-180, 180) + 'deg) rotateY(' + rnd(-180, 180) + 'deg) rotateZ(' + rnd(-180, 180) + 'deg) scale(' + rnd(1.5, 3) + ',' + rnd(1.5, 3) + ')'
						})
					}
				})(element, left, top), rnd(0, 200))
			});
			if(dir == 'left') {
				num--;
			} else {
				num++;
			}
			//运用算法将num值进行修正
			num = (num + imgs.length) % imgs.length;
			$('.bomb-href').css({
				background: 'url(' + imgs[num] + ') no-repeat'
			}).attr('href',hrefs[num])
			//回调函数
			setTimeout(function() {
				btn = false;
			}, 700)
		}
		//随机函数
		function rnd(min, max) {
			return Math.random() * (max - min) + min
		}
	}
})(window.jQuery);