//=================本地存储==========================
var storage = window.localStorage;
if(storage.level == undefined) storage.level = 1;
loadLevel();
loadUrl();
loadMirror();


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
			var color = levelObj.laser[i].color;	 //激光器颜色
			var x = levelObj.laser[i].x;			 //激光器x坐标
			var y = levelObj.laser[i].y;			 //激光器y坐标
			var box = $("td")[Number(y*8)+Number(x)];//对应所在格子的位置
			var url = urlObj.url.laser[color];		 //激光器图片地址
			var ddd = "url"+"("+"'"+url+"'"+")";
			$(box).css("background-image", ddd);	 //放置在指定位置
			$(box).attr("flag", "laser");			 //设置flag
			if(levelObj.laser[i].angle == 0) $(box).css("transform","rotate(90deg)");	//旋转
			else if(levelObj.laser[i].angle == 180) $(box).css("transform","rotate(-90deg)");
			else if(levelObj.laser[i].angle == 270) $(box).css("transform","rotate(180deg)");
		}
		//===========载入target============================
		for(var i = 0; i < levelObj.target.length; i++)
		{
			var color = levelObj.target[i].color;
			var x = levelObj.target[i].x;
			var y = levelObj.target[i].y;
			var box = $("td")[Number(y*8)+Number(x)];
			var url = urlObj.url.target[color+'1'];
			var ddd = "url"+"("+"'"+url+"'"+")";
			$(box).css("background-image", ddd);
			$(box).attr("flag", "5");			 //设置flag
		}
	});
}


function loadMirror(){
	$("toDelete").ready(function(){
		$("td").attr("ondrop", "drop(event)");
		$("td").attr("ondragover", "allowDrop(event)");
		for(var i = 0; i  < levelObj.mirror.length; i++)
		{
			var mid = levelObj.mirror[i].mtype;
			if(mid == '90') flag = 2;
			else if(mid == "45") flag = 3;
			else if(mid == "0") flag = 4;
			var myimage = '<img draggable="true" ondragstart="drag(event)" id="drag" width="100%"/>';
			$($("td")[1]).append(myimage);
			$("img").attr("src", "https://YutingWang.github.io/MyGame/pic/mirror1.png");
		}		
	});
}

function allowDrop(ev)
{
ev.preventDefault();
}

function drag(ev)
{
ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev)
{
ev.preventDefault();
var data=ev.dataTransfer.getData("Text");
if($(ev.target).css("background-image") == "none")
ev.target.appendChild(document.getElementById(data));
}