var left = 0;
var top = 0;
var swich = true;
// var lastLeft = 400;
// var lastTop = 400;
var socket = io();
var randomNumLeft;
var randomNumTop;
var changeSrc = "image/ball3.gif";
var idArr = [];
$(function(){
	socket.on('ballColor',function(msg,id){
		console.log(id);
		idArr[id] = msg;
		console.log(idArr);
		changeSrc = msg;
	});


	socket.on('ballPosition',function(msg,id){
		console.log(id);
		randomNumLeft = Math.random() * 1411;
		randomNumTop = Math.random() * 667;
		var nowTimeId = new Date().getTime();
		var img = document.createElement('img');
		$(img).addClass('myImg demo'+nowTimeId).attr("src", 'image/ball'+idArr[id]+'.gif').css({
			'position':'absolute',
			'left':randomNumLeft,
			'top':randomNumTop
		});
		$('body').append(img);
		setTimeout(function(){
			$('.demo'+nowTimeId).attr('finished','true');
		},1000);
		// console.log(randomNumLeft);
		

		// $('.ball1').css({
		// 	'left':randomNumLeft,
		// 	'top':randomNumTop
		// });
		// $('.ball1').show();
	});

	setInterval(function(){
		$('.myImg[finished=true]').remove();
	},1000);


});