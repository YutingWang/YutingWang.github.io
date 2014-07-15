
h = '<div class="time-item"><span id="day_show">0天</span><strong id="hour_show">0时</strong><strong id="minute_show">0分</strong><strong id="second_show">0秒</strong></div>';
var s = $('.hwStatus');

nextAll[2].innerHTML=h;
leftTime = 300;
$(function(){timer(leftTime);});

function timer(leftTime){
	window.setInterval(function(){
		var day = 0, hour = 0, minute = 0, second = 0;
		if(leftTime> 0)
		{
			day = Math.floor(leftTime/(60*60*24));
			hour = Math.floor(leftTime/ (60*60)) - (day*24);
        	minute = Math.floor(leftTime/60) - (day*24 *60) - (hour * 60);
        	second = Math.floor(leftTime)-(day*24*60*60) - (hour*60*60) - (minute* 60);    
		}
		if(minute <= 9) minute = '0' + minute;
		if(second <= 9) second = '0' + second;
		$('#day_show').html(day+"天");
    	$('#hour_show').html('<s id="h"></s>'+hour+'时');
    	$('#minute_show').html('<s></s>'+minute+'分');
    	$('#second_show').html('<s></s>'+second+'秒');
    	leftTime--;
	}, 1000);//每隔1000ms执行一次funcion
}