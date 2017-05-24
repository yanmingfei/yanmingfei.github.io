window.onload = function() {
	var onav = document.getElementById("nav")
	var obutton = onav.getElementsByTagName('button')[0];
	//给button元素绑定事件
	obutton.onclick = function() {
		//判断如果元素身上有类名就将其删除掉并且把内容改为+号。否则就添加类名并且将内容改为-号
		if(onav.className) {
			onav.className = ''
			this.innerHTML = '+'
		} else {
			onav.className = 'active';
			this.innerHTML = '-'
		}
	};
	//如果单击事件源不是button元素，则删除类名,并且把内容为+号
	//遇到这种情况，事件源为document，在事件当中进行判断，当前元素的指向。排除button元素其余元素就不是button元素。
	document.onclick = function(e) {
		//如果当前元素的指向是button元素，则不执行任何操作，即return。否则删除类名,并且把内容为+号
		if(e.target.nodeName.toLowerCase() == 'button') {
			return;
		}else{
			onav.className = ''
			obutton.innerHTML = '+'
		}
	};
};