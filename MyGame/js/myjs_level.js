N = 15;
//=====================绘制格子==========================
for(var i = 0; i < N; i++) $("table").prepend("<tr></tr>");
for(var i = 0; i < N; i++) $("tr").prepend("<td></td>");
for(var i = 0; i < $("td").length; i++) 
{
    $($("td")[i]).attr("id", Number(i)+1);  //给格子编号id，从0开始
    $($("td")[i]).attr("flag", 0);//给格子设置属性flag，0为空
} 

var c_t = document.getElementById("tool_canvas");
var cxt_t = c_t.getContext("2d");		
cxt_t.lineWidth = 1;
cxt_t.beginPath();
for(var a = 0.5;a < 310;a+= 50)
{				
	cxt_t.moveTo(a,0);
	cxt_t.lineTo(a,150);
}			
for(var a = 0.5;a < 110;a+=50)
{
cxt_t.moveTo(0,a);
cxt_t.lineTo(300,a);
}
cxt_t.stroke();

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
		      	if(typeof(urlObj) != "undefined" && typeof(levelObj) != "undefined") 
		      	{place();loadMirror();}
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
		      	if(typeof(urlObj) != "undefined" && typeof(levelObj) != "undefined")
		      	{place();loadMirror();}
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
			var box = $("td")[Number(y*N)+Number(x)];//对应所在格子的位置
			var url = urlObj.url.laser[color];		 //激光器图片地址
			var ddd = "url"+"("+"'"+url+"'"+")";			
			$(box).css("background-image", ddd);
			//设置格子属性
			$(box).attr("flag", "laser");			 
			$(box).attr("color", color);
			$(box).attr("position", levelObj.laser[i].angle);
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
			var box = $("td")[Number(y*N)+Number(x)];
			var url = urlObj.url.target[color+'1'];
			var ddd = "url"+"("+"'"+url+"'"+")";
			$(box).css("background-image", ddd);
			//设置格子属性
			$(box).attr("flag", "target");
			$(box).attr("color", color);
			$(box).attr("position", 0);//0为暗色，1为亮色
		}
	});
}


function loadMirror(){
	$("toDelete").ready(function(){
		$("td").attr("ondrop", "drop(event)");
		$("td").attr("ondragover", "allowDrop(event)");
		for(var i = 0; i < levelObj.mirror.length; i++)
			a += Number(levelObj.mirror[i].num);
		for(var i = 0; i < a; )
		{
			var mid = levelObj.mirror[i].mtype;
			if(mid == '90') flag = 2;
			else if(mid == "45") flag = 3;
			else if(mid == "0") flag = 4;
			for(var j = 0; j < levelObj.mirror[i].num; i++,j++)
			{
				var myimage = '<img draggable="true" ondragstart="drag(event)" id="'+i+'"width="100%"/>';
				$($("td")[i]).append(myimage);//TO EDIT
				c = $($($("td")[i]).children());
				c.attr("src", urlObj.url.mirror["reflex"+mid]);
				c.attr("position","0");//To EDIT
			}			
		}		
	});
	$("img").click(function(){
		t = $(this).attr("position");
		if(t == 0) $(this).css("transform","rotate(45deg)");
		if(t == 1) $(this).css("transform","rotate(135deg)");
		if(t == 2) $(this).css("transform","rotate(-135deg)");
		if(t == 3) $(this).css("transform","rotate(-45deg)");
		t = (Number(t)+1)%4;
		t = String(t);
		$(this).attr("position", t);
	});
}

//==============鼠标拖放====================================
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

