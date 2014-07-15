function BgHover(obj,flag){
	if(flag){
		//setInterval(show1,1000);
		document.getElementById("title_move").style.display="";
		document.getElementById("title_move").style.left="0%";
	}
	else{		
		document.getElementById("title_move").style.display="none";
		}
}
N = 15;
//=====================绘制格子==========================
for(var i = 0; i < N; i++) $("table.game_frame").prepend("<tr id='game'></tr>");
for(var i = 0; i < N; i++) $("tr#game").prepend("<td></td>");
/*for(var i = 0; i < $("td").length; i++) 
{
    $($("td")[i]).attr("id", Number(i)+1);  //给格子编号id，从0开始
    $($("td")[i]).attr("flag", 0);//给格子设置属性flag，0为空
} */

for(var i = 0; i < N; i++) $("table.game_tools").prepend("<tr id='tools'></tr>");
for(var i = 0; i < 2; i++) $("tr#tools").prepend("<td></td>");
for(var i = 0; i < $("td").length; i++) 
{
    $($("td")[i]).attr("id", Number(i)+1);  //给格子编号id，从0开始
    $($("td")[i]).attr("flag", 0);//给格子设置属性flag，0为空
} 

//=================本地存储==========================
var storage = window.localStorage;
if(storage.level == undefined) storage.level = 1;
loadLevel();
loadUrl();

//=================载入关卡中元素位置===========levelObj================
function loadLevel(){
	$("td").css("background-image","none");
	$("td").attr("flag","0");
	$($("td").children()).remove();
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
		      	{place();loadMirror();loadBlock();}
		      
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
		      	{place();loadMirror(); loadBlock();}		     		  								
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
			var box = $("td")[Number(y-1)*N+Number(x)-1];//对应所在格子的位置
			var url = urlObj.url.laser[color];		 //激光器图片地址
			var ddd = "url"+"("+"'"+url+"'"+")";			
			$(box).css("background-image", ddd);
			//设置格子属性
			$(box).attr("flag", "-1");			 
			$(box).attr("color", color);
			$(box).attr("position", levelObj.laser[i].angle);
			if(levelObj.laser[i].angle == 90) $(box).css("transform","rotate(-90deg)");	//旋转
			else if(levelObj.laser[i].angle == 180) $(box).css("transform","rotate(180deg)");
			else if(levelObj.laser[i].angle == 270) $(box).css("transform","rotate(-90deg)");
		}
		//===========载入target============================
		for(var i = 0; i < levelObj.target.length; i++)
		{
			var color = levelObj.target[i].color;
			var x = levelObj.target[i].x;
			var y = levelObj.target[i].y;
			var box = $("td")[(y-1)*N+Number(x)-1];
			var url = urlObj.url.target[color+'1'];
			var ddd = "url"+"("+"'"+url+"'"+")";
			$(box).css("background-image", ddd);
			//设置格子属性
			$(box).attr("flag", "5");
			$(box).attr("color", color);
			$(box).attr("position", 0);//0为暗色，1为亮色
		}
		var ct = document.getElementById("game_canvas");
			var cxt = ct.getContext("2d");
			grid_size = 36;
			cxt.clearRect(0,0,2000,2000);
			
			for(var i = 0;i < levelObj.laser.length;i++){
			draw_laser(cxt,Number(levelObj.laser[i].x), Number(levelObj.laser[i].y), Number(levelObj.laser[i].angle), levelObj.laser[i].color);
			}
	});
}


function loadMirror(){
	$("toDelete").ready(function(){
		$("td").attr("ondrop", "drop(event)");
		$("td").attr("ondragover", "allowDrop(event)");
		var k = 0;
		for(var i = 0; i < levelObj.mirror.length; i++)
		{
			var mid = levelObj.mirror[i].mtype;
			if(mid == '90') flag = "2";
			else if(mid == "45") flag = "3";
			else if(mid == "0") flag = "4";
			for(var j = 0; j < levelObj.mirror[i].num; j++)
			{
				var myimage = '<img draggable="true" ondragstart="drag(event)" id="dra'+i+j+'"width="90%"/>';
				$($("td")[225+Number(k)]).append(myimage);//TO EDIT
				c = $($($("td")[225+Number(k)]).children());
				c.attr("src", urlObj.url.mirror["reflex"+mid]);
				
				c.attr("flag",flag);
				if(flag == 3) 
				{
					c.attr("position","22.5");
					c.css("transform","rotate(-22.5deg)");
				}
				else c.attr("position","0");//To EDIT
				k++;
			}			
		}		
	});
	$("img").click(function(){
		t = $(this).attr("position");
		t = (Number(t)+45)%360;
		$(this).css("transform","rotate(-"+t+"deg)");
		t = String(t);
		$(this).attr("position", t);
			var ct = document.getElementById("game_canvas");
			var cxt = ct.getContext("2d");
			grid_size = 36;
			cxt.clearRect(0,0,2000,2000);
			
			for(var i = 0;i < levelObj.laser.length;i++){
			draw_laser(cxt,Number(levelObj.laser[i].x), Number(levelObj.laser[i].y), Number(levelObj.laser[i].angle), levelObj.laser[i].color);
			}
	});
}

function loadBlock(){
	$("toDelete").ready(function(){
		var url = urlObj.url.block.block;
		for(var i = 0; i < levelObj.block.x.length;i++)
		{
			var x = levelObj.block.x[i];
			var y = levelObj.block.y[i];
			var box = $("td")[(y-1)*N+Number(x)-1];
			var ddd = "url"+"("+"'"+url+"'"+")";
			$(box).css("background-image", ddd);
			//设置格子属性
			$(box).attr("flag", "1");
		}
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
$($(ev.target).parents()).attr("flag","0");
	var ct = document.getElementById("game_canvas");
			var cxt = ct.getContext("2d");
			grid_size = 36;
			cxt.clearRect(0,0,2000,2000);
			
			for(var i = 0;i < levelObj.laser.length;i++){
			draw_laser(cxt,Number(levelObj.laser[i].x), Number(levelObj.laser[i].y), Number(levelObj.laser[i].angle), levelObj.laser[i].color);
			}
}

function drop(ev)
{
	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");
	if($(ev.target).css("background-image") == "none" && $(ev.target).attr("flag") == 0)
	{
		ev.target.appendChild(document.getElementById(data));
		$(ev.target).attr("flag",$($(ev.target).children()).attr("flag"));
	}
	var ct = document.getElementById("game_canvas");
			var cxt = ct.getContext("2d");
			grid_size = 36;
			cxt.clearRect(0,0,2000,2000);
			
			for(var i = 0;i < levelObj.laser.length;i++){
			draw_laser(cxt,Number(levelObj.laser[i].x), Number(levelObj.laser[i].y), Number(levelObj.laser[i].angle), levelObj.laser[i].color);
			}
}

