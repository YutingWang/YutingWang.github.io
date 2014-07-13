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
		  	});
	});
}
//=================载入关卡中icon图标地址======urlObj===================
function loadUrl(){
	$("toDelete").ready(function(){
		    $(".toDelete").load('https://YutingWang.github.io/MyGame/js/icon.json',function(responseTxt,statusTxt,xhr){
		    	if(statusTxt=="success")
		      	{
		       		data = responseTxt;
		      		urlObj = eval('('+responseTxt+')');
		      	}
		      	else if(statusTxt=="error") alert("Error: "+xhr.status+": "+xhr.statusText);
		      	$(".toDelete").css("display", "none");	
		  	});
	});
}