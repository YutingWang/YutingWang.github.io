$(".right").click(function(){
	id = (Number(id)+1)%5;
	b[id].click();
	}
);
$(".left").click(function(){
	id = (Number(id)-1+5)%5;
	b[id].click();
}
);

var storage = window.localstorage;
if(!storage.getItem("currentpic")) storage.setItem("currentpic",0);)
var b = $(".but");
var id = localstorage.currentpic;
var pre = localstorage.currentpic;
f = $(".pic")[pre];
$(f).css("display", "block");
f = $(".show")[pre];
$(f).css("display", "block");

for(var i = 0; i < b.length; i++){
	$(b[i]).click(function(){
		id = $(this).attr("id");
		if(pre != id){
			var img = $(b[pre]).children();
			var pic = $("li.pic");	
			var sho = $("li.show");
			$(img).attr("src","https://YutingWang.github.io/Homework4/pic/button1.png");
			img = $(b[id]).children();
			$(img).attr("src","https://YutingWang.github.io/Homework4/pic/button1.png");
			$(pic[pre]).fadeTo(0.5, 70);
			$(pic[id]).fadeIn(800);
			$(sho[id]).fadeIn(10);
			$(pic[pre]).fadeOut(10);
			$(sho[pre]).fadeOut(10);
			pre = id;
			localstorage.currentpic = id;
			}
		}
	);
}
//======================图片滚动播放======================================================
setInterval("roll()", 6000);
function roll()
{
	$(".right").click();
}


//======================评论区=====================================================


var page = 1;
var allPage = 3;
var commentPerPage = 3;
loadComments(page);


$("#previous").click(function(){
	page = page-1;
	alert(page);
	loadComments(page);
});

$("#next").click(function(){
	page = page+1;
	alert(page);
	loadComments(page);
});

function loadComments(page){
	$(".toDelete").ready(function(){
		    $(".toDelete").load('https://YutingWang.github.io/Homework4/jquery/comment'+page+'.json',function(responseTxt,statusTxt,xhr){
		    	if(statusTxt=="success")
		      	{
		       		data = responseTxt;
		      		commentsObj = eval('('+responseTxt+')');
		      	}
		      	else if(statusTxt=="error") alert("Error: "+xhr.status+": "+xhr.statusText);
		      	$(".toDelete").css("display", "none");		
				for(var i = 0; i < commentsObj.comments.length; i++)
				{
					$($(".photo").children()[i]).attr("src", commentsObj.comments[i].url);
					$(".name")[i].innerText =  commentsObj.comments[i].userName;
					$(".words")[i].innerText =  commentsObj.comments[i].words;
					$($(".floor")[i]).css("display", "block");
				}
      	
		  	});
		});
	if(page == 1) $("#previous").css("display", "none");
	else $("#previous").css("display", "block");
	if(page == allPage) $("#next").css("display", "none");
	else $("#next").css("display", "block");
}