//=================本地存储==========================
var storage = window.localStorage;
if(storage.level == undefined) storage.level = 1;


//=================载入关卡中元素位置===========================
$(document).ready(function(){
		    $(".toDelete").load('js/leve'+storage.level+'.json',function(responseTxt,statusTxt,xhr){
		    	if(statusTxt=="success")
		      	{
		       		data = responseTxt;
		      		levelObj = eval('('+responseTxt+')');
		      	}
		      	else if(statusTxt=="error") alert("Error: "+xhr.status+": "+xhr.statusText);
		      	$(".toDelete").css("display", "none");	
		  	});
		});