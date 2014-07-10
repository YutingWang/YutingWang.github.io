$(".news").ready(function(){
	for(var i = 0; i < 5; i++) 
	{
		a= $($($(".pic")[i]).children());
		a.attr("src", dataObj.images[i].url);
		$("h3")[i].innerText = dataObj.images[i].title;
	}
});



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
			var pic = $("li.pic");	
			var sho = $("li.show");
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














