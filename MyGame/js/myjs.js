//=================本地存储==========================
var storage = window.localStorage;
if(storage.level == undefined) storage.level = 1;
loadLevel();
loadUrl();

//=================载入关卡中元素位置===========levelObj================
function loadLevel(){
	$("toDelete").ready(function(){
		    $(".toDelete").load('https://YutingWang.github.io/MyGame/js/level'+storage.level+'.json',function(responseTxt,statusTxt,xhr){
		    	if(statusTxt=="success")
		      	{
		       		data = responseTxt;
		      		levelObj = eval('('+responseTxt+')');
		      	}
		      	else if(statusTxt=="error") alert("Error: "+xhr.status+": "+xhr.statusText);
		      	$(".toDelete").css("display", "none");	
		      	if(typeof(urlObj) != "undefined" && typeof(levelObj) != "undefined") place();
		  	});
	});
}

function loadUrl(){
	$("toDelete").ready(function(){
//=================载入关卡中icon图标地址======urlObj===================
		    $(".toDelete").load('https://YutingWang.github.io/MyGame/js/icon.json',function(responseTxt,statusTxt,xhr){
		    	if(statusTxt=="success")
		      	{
		       		data = responseTxt;
		      		urlObj = eval('('+responseTxt+')');
		      	}
		      	else if(statusTxt=="error") alert("Error: "+xhr.status+": "+xhr.statusText);
		      	$(".toDelete").css("display", "none");	
		      	if(typeof(urlObj) != "undefined" && typeof(levelObj) != "undefined") place();
		  	});
	});
}

function place(){
	$("toDelete").ready(function(){
		//===========载入激光器============================
		for(var i = 0; i < levelObj.laser.length; i++)
		{
			var color = levelObj.laser[i].color;
			var x = levelObj.laser[i].x;
			var y = levelObj.laser[i].y;
			var box = $("td")[Number(y*12)+Number(x)];
			var url = urlObj.url.laser[color];
			var ddd = "url"+"("+"'"+url+"'"+")";
			$(box).css("background-image", ddd);
			if(levelObj.laser[i].angle == 0) $(box).css("transform","rotate(90deg)");
			else if(levelObj.laser[i].angle == 180) $(box).css("transform","rotate(-90deg)");
			else if(levelObj.laser[i].angle == 270) $(box).css("transform","rotate(180deg)");
		}
		//===========载入target============================
		for(var i = 0; i < levelObj.target.length; i++)
		{
			var color = levelObj.target[i].color;
			var x = levelObj.target[i].x;
			var y = levelObj.target[i].y;
			var box = $("td")[Number(y*12)+Number(x)];
			var url = urlObj.url.target[color+'1'];
			var ddd = "url"+"("+"'"+url+"'"+")";
			$(box).css("background-image", ddd);
		}
	});
}