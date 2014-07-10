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

setInterval("roll()", 2000);
function roll()
{
	$(".right").click();
}













