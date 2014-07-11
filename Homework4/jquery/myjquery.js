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


var b = $(".but");
var id = 0;
var pre = 0;
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
			}
		}
	);
}
//======================图片滚动播放=====================================================
setInterval("roll()", 4000);
function roll()
{
	$(".right").click();
}


//======================评论区=====================================================
var page = 1;
var allComments = 5;
var commentPerPage = 3;
loadComments(page);
function loadComments(page){
	for(i = Number(page-1)*Number(commentPerPage); i < commentPerPage; i++)	
		$($(".floor")[i]).css("display", "block");
}
$(".previous").click(function(){
	page = page+1;
	if(page*commentPerPage >= allComments) $(".next").attr("display", "none");
	else $(".next").attr("display", "block");
	loadComments(page);
});
$(".next").click(function(){
	page = page-1;
	if(page == 1) $(".previous").attr("display", "none");
	else $(".previous").attr("display", "block");
	loadComments(page);
})













