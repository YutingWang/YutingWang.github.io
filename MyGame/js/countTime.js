//==============================课堂->课程作业=========================
//ddl倒计时
h = '<div class="time-item"><span id="day_show">0天</span><strong id="hour_show">0时</strong><strong id="minute_show">0分</strong><strong id="second_show">0秒</strong></div>';
var s = $('.hwStatus');
for(var i = 0; i < s.length; i++)
{
	var todo = $('.hwStatus')[i];	
	if(todo.innerHTML == '尚未提交')
	{
		nextAll = $(todo).parent().nextAll();
		ddl = nextAll[2].innerHTML;//"2014-07-08 02:00:00"
		nextAll[2].innerHTML=h;
		leftTime = calculate(ddl);
		$(function(){timer(leftTime);});
	}
}

function calculate(ddl){
	var vtime = parseInt(0);
	var dtime = parseInt(0);
	d = new Date();	
	vDate = d.getDate();
	vHours = d.getHours();
	vMinute = d.getMinutes();
	vSecond = d.getSeconds();
	dDate   = Number(ddl[8]*10+ddl[9]);
	dHours  = Number(ddl[11]*10+ddl[12]);
	dMinute = Number(ddl[14]*10+ddl[15]);
	dSecond = Number(ddl[17]*10+ddl[18]);
	vtime = vDate*24*60*60 + vHours*60*60 + vMinute*60 + vSecond;
	dtime = dDate*24*60*60 + dHours*60*60 + dMinute*60 + dSecond;
	time = dtime - vtime;
	if(time > 0) return time; 
	else return -1;
}
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